import { Controller, Post, Body, Get, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { File } from './entities/file.entity';
import { SetFileDto } from './dto/setFile.dto';
import * as fs from 'fs';
import * as path from 'path';
import { CreatePrintingHistoryDto } from '../history/printing-history/dto/printing-history.dto';
import { PrintingHistoryService } from '../history/printing-history/printing-history.service';
import { Printer } from '../printer/entities/printer.entity';
// import { PrintingConfigure } from './entities/printingconfigure.entity';

@Controller('file')
export class PrintFileController {
    constructor(
        private readonly printFileService: FileService,
        private readonly printingHistoryService: PrintingHistoryService,
    ) { }

    @Post() // curl.exe -X POST -H "Content-Type: multipart/form-data" -F "student_id=567495c7-da94-4da1-9b82-f7ec3587339a" -F "printer_id=6f4dee97-386c-4caf-aeff-b8fd50e6e18b" -F "copies=3" -F "file_id=977932ce-d1a3-4b31-976e-cb5388184243" -F "page_print=5" -F "date=2024-11-19T10:00:00Z" -F "paper_size=A4" -F "file=@C:\Users\hocho\Desktop\tuần 39 - cđ2 - lsđ.docx" http://localhost:3000/v1/file
    @UseInterceptors(FileInterceptor('file', { dest: '../storage' }))
    async uploadFile(@Body() fileData: CreatePrintingHistoryDto, @UploadedFile() file: Express.Multer.File,): Promise<any> {
        try {
            const printer = await Printer.findByPk(fileData.printer_id);
            if (!printer) {
                return { isValid: false, message: 'Printer not found' };
            }

            if (!printer.status) {
                return { isValid: false, message: 'Printer is currently unavailable' };
            }

            const paperRequired = fileData.page_print * fileData.copies;

            switch (fileData.paper_size) {
                case 'A4':
                    if (printer.A4PaperCount < paperRequired) {
                        return { isValid: false, message: 'Not enough A4 paper available in the printer' };
                    }
                    printer.A4PaperCount -= paperRequired;
                    break;
                case 'A3':
                    if (printer.A3PaperCount < paperRequired) {
                        return { isValid: false, message: 'Not enough A3 paper available in the printer' };
                    }
                    printer.A3PaperCount -= paperRequired;
                    break;
                case 'A5':
                    if (printer.A5PaperCount < paperRequired) {
                        return { isValid: false, message: 'Not enough A5 paper available in the printer' };
                    }
                    printer.A5PaperCount -= paperRequired;
                    break;
                default:
                    return { isValid: false, message: 'Invalid paper size specified' };
            }

            await printer.save();

            const storageDir = 'storage';
            if (!fs.existsSync(storageDir)) {
                fs.mkdirSync(storageDir, { recursive: true });
            }
            const filePath = path.join('../storage', file.originalname);
            fs.renameSync(file.path, filePath);

            const file_data = {
                filenames: file.originalname,
                type: file.mimetype,
                time_uploaded: new Date(),
                size: file.size,
                student_id: fileData.student_id,
            };
            const newFile = await this.printFileService.setFile(file_data);

            const printingHistoryData = {
                ...fileData,
                filenames: newFile.filenames,
            };

            const newPrintingHistory = await this.printingHistoryService.createPrintingHistory(printingHistoryData);
            return { data: newFile, message: 'Upload file sucessfully.' };
        } catch (error) {
            return { message: `Failed to upload file: ${error.message}` };
        }
    }

    @Get(':fileID')
    async getFile(@Param('fileID') fileID: string): Promise<any> {
        try {
            const file = await this.printFileService.getFile(fileID);
            console.log(file);
            return { data: file, message: 'Retrieve file sucessfully.' };
        } catch (error) {
            return { message: `Failed to retrieve file: ${error.message}` };
        }
    }
}