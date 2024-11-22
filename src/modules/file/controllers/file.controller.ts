import { Controller, Post, Body, Get, Param, UseInterceptors, UploadedFile, Res, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { FileService } from '../services/file.service';
import { PrintingHistoryService } from 'src/modules/history/services/printingHistory.service';
import { CreatePrintingHistoryDto } from 'src/modules/history/dto/printingHistory.dto';
import { Printer } from 'src/modules/printer/entities/printer.entity';
import { Response } from 'src/modules/response/response.entity';
import { LoggerService } from 'src/common/logger/logger.service';

@Controller('file')
export class FileController {
    constructor(
        private readonly printFileService: FileService,
        private readonly printingHistoryService: PrintingHistoryService,
        private readonly response: Response,
        private readonly logger: LoggerService,
    ) { }

    @Post() // curl.exe -X POST -H "Content-Type: multipart/form-data" -F "studentId=567495c7-da94-4da1-9b82-f7ec3587339a" -F "printer_id=6f4dee97-386c-4caf-aeff-b8fd50e6e18b" -F "copies=3" -F "fileId=977932ce-d1a3-4b31-976e-cb5388184243" -F "page_print=5" -F "date=2024-11-19T10:00:00Z" -F "paper_size=A4" -F "file=@C:\Users\hocho\Desktop\tuần 39 - cđ2 - lsđ.docx" http://localhost:3000/v1/file
    @UseInterceptors(FileInterceptor('file', { dest: '../storage' }))
    async uploadFile(@Body() fileData: CreatePrintingHistoryDto, @UploadedFile() file: Express.Multer.File, @Res() res): Promise<any> {
        try {
            const printer = await Printer.findByPk(fileData.printer_id);
            if (!printer) {
                this.response.initResponse(false, 'Printer not found', false);
                return res.status(HttpStatus.NOT_FOUND).json(this.response);
            }

            if (!printer.status) {
                this.response.initResponse(false, 'Printer is currently unavailable', false);
                return res.status(HttpStatus.NOT_FOUND).json(this.response);
            }

            const paperRequired = fileData.page_print * fileData.copies;

            switch (fileData.paper_size) {
                case 'A4':
                    if (printer.A4PaperCount < paperRequired) {
                        this.response.initResponse(false, 'Not enough A4 paper available in the printer', false);
                        return res.status(HttpStatus.CONFLICT).json(this.response);
                    }
                    printer.A4PaperCount -= paperRequired;
                    break;
                case 'A3':
                    if (printer.A3PaperCount < paperRequired) {
                        this.response.initResponse(false, 'Not enough A3 paper available in the printer', false);
                        return res.status(HttpStatus.CONFLICT).json(this.response);
                    }
                    printer.A3PaperCount -= paperRequired;
                    break;
                case 'A5':
                    if (printer.A5PaperCount < paperRequired) {
                        this.response.initResponse(false, 'Not enough A5 paper available in the printer', false);
                        return res.status(HttpStatus.CONFLICT).json(this.response);
                    }
                    printer.A5PaperCount -= paperRequired;
                    break;
                default:
                    this.response.initResponse(false, 'Invalid type of paper', false);
                    return res.status(HttpStatus.CONFLICT).json(this.response);
            }

            await printer.save();

            const storageDir = 'storage';
            if (!fs.existsSync(storageDir)) {
                fs.mkdirSync(storageDir, { recursive: true });
            }
            const filePath = path.join('../storage', file.originalname);
            fs.renameSync(file.path, filePath);

            const file_data = {
                filename: file.originalname,
                type: file.mimetype,
                timeUploaded: new Date(),
                size: file.size,
                studentId: fileData.studentId,
            };
            const newFile = await this.printFileService.setFile(file_data);

            const printingHistoryData = {
                ...fileData,
                filename: newFile.filename,
            };

            const newPrintingHistory = await this.printingHistoryService.createPrintingHistory(printingHistoryData);
            this.response.initResponse(true, 'Upload File successfully', true);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }

    @Get(':fileID')
    async getFile(@Param('fileID') fileID: string, @Res() res): Promise<any> {
        try {
            const file = await this.printFileService.getFile(fileID);
            this.response.initResponse(true, 'Get File successfully', file);
            return res.status(HttpStatus.CONFLICT).json(this.response);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }
}