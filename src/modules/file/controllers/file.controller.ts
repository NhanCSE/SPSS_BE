import { Controller, Post, Body, Get, Param, UseInterceptors, UploadedFile, Res, HttpStatus, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../services/file.service';
import { File } from '../entities/file.entity';
import { SetFileDto } from '../dto/setFile.dto';
import * as fs from 'fs';
import * as path from 'path';
import { CreatePrintingHistoryDto } from '../../history/dto/printingHistory.dto';
import { PrintingHistoryService } from '../../history/services/printingHistory.service';
import { Response } from '../../response/response.entity';
import { LoggerService } from 'src/common/logger/logger.service';
// import { PrintingConfigure } from './entities/printingconfigure.entity';

@Controller('file')
export class PrintFileController {
    constructor(
        private readonly printFileService: FileService,
        private readonly printingHistoryService: PrintingHistoryService,
        private readonly response: Response,
        private readonly logger: LoggerService,
    ) { }

    @Post() // curl.exe -X POST -H "Content-Type: multipart/form-data" -F "student_id=1234" -F "printer_id=6f4dee97-386c-4caf-aeff-b8fd50e6e18b" -F "page_size=A4" -F "page_print=50" -F "copies=3" -F "file=@C:\Users\hocho\Desktop\Lab_5_Wireshark_ICMP_v8.0.pdf" http://localhost:3000/v1/file
    @UseInterceptors(FileInterceptor('file', { dest: '../storage' }))
    async printFile(
        @Body() fileData: CreatePrintingHistoryDto,
        @UploadedFile() file: Express.Multer.File,
        @Res() res
    ): Promise<any> {
        try {
            const printerCheckResult = await this.printFileService.checkPrinterAvailability(
                fileData.printer_id,
                fileData.page_print,
                fileData.copies,
                fileData.page_size
            );

            if (!printerCheckResult.isValid) {
                this.response.initResponse(false, printerCheckResult.message, null);
                return res.status(HttpStatus.BAD_REQUEST).json(this.response);
            }

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
                file_id: newFile.file_id,
                filenames: newFile.filenames,
                date: new Date(),
            };

            console.log(printingHistoryData);

            const newPrintingHistory = await this.printingHistoryService.createPrintingHistory(printingHistoryData);

            this.response.initResponse(true, 'In thành công.', newFile);
            return res.status(HttpStatus.CREATED).json(this.response);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            if (error instanceof InternalServerErrorException) {
                this.response.initResponse(false, error.message, null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }

            if (error instanceof BadRequestException) {
                this.response.initResponse(false, error.message, null);
                return res.status(HttpStatus.BAD_REQUEST).json(this.response);
            }

            this.response.initResponse(false, "Đã xảy ra lỗi. Vui lòng thử lại", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Get(':fileID')
    async getFile(
        @Param('fileID') fileID: string,
        @Res() res
    ): Promise<any> {
        try {
            const file = await this.printFileService.getFile(fileID);
            this.response.initResponse(true, 'Retrieve file successfully.', file);
            return res.status(HttpStatus.CREATED).json(this.response);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            if (error instanceof InternalServerErrorException) {
                this.response.initResponse(false, error.message, null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }

            if (error instanceof BadRequestException) {
                this.response.initResponse(false, error.message, null);
                return res.status(HttpStatus.BAD_REQUEST).json(this.response);
            }

            this.response.initResponse(false, "Đã xảy ra lỗi. Vui lòng thử lại", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }
}