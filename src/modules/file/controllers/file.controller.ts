import { Controller, Post, Body, Get, Param, UseInterceptors, UploadedFile, Res, HttpStatus, ParseIntPipe, BadRequestException, UseGuards, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import * as pdfParse from 'pdf-parse';
import { Document, Packer, Paragraph } from 'docx';
import * as XLSX from 'xlsx';
import { FileService } from '../services/file.service';
import { Response } from 'src/modules/response/response.entity';
import { LoggerService } from 'src/common/logger/logger.service';
import { UploadFileDto } from '../dto/upload-file.dto';
import { SystemConfigurationService } from 'src/modules/system/services/system.service';
import { FileType } from 'src/common/contants';
import { JwtAuthGuard } from 'src/common/guards/authenticate.guard';

@Controller('file')
export class FileController {
    constructor(
        private readonly fileService: FileService,
        private readonly systemConfigurationService: SystemConfigurationService,
        private readonly response: Response,
        private readonly logger: LoggerService,
    ) { }

    @Post('/upload') 
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('file', { dest: './src/modules/file/storage/temp' }))
    async uploadFile(@Req() req, 
                    @UploadedFile() file: Express.Multer.File, 
                    @Res() res) {
        try {
            
            if(!file) {
                throw new BadRequestException("Empty File!");
            }

            const studentId = req.user.id;
            console.log(file.path)
            const allowedFilesList: FileType[] = (await this.systemConfigurationService.searchNewest()).allowedFiles;
            const { mimetype } = file;

            const isFileTypeValid = Object.values(FileType).includes(mimetype as FileType);
            if(!isFileTypeValid || !allowedFilesList.includes(mimetype as FileType)) {
                throw new BadRequestException("Inapropriate File type!");
            }

            let pageCount = 0;

            if (mimetype === 'application/pdf') {
                // Handle PDF files
                const fileBuffer = fs.readFileSync(file.path);
                const pdfData = await pdfParse(fileBuffer);
                pageCount = pdfData.numpages;
            } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                // Handle DOCX files
                const docBuffer = fs.readFileSync(file.path);
                pageCount = Math.ceil(docBuffer.toString().length / 1000);
            } else if ( mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                // Handle Excel files
                const workbook = XLSX.readFile(file.path);
                pageCount = workbook.SheetNames.length; 
            } else {
                throw new BadRequestException("Inapropriate File type!");
            }
            

            

            const fileData = {
                filename: file.originalname,
                type: file.mimetype as FileType,
                timeUploaded: new Date(),
                size: file.size,
                pageCount,
                studentId: studentId,
            };
            const newFile = await this.fileService.setFile(fileData);

            const storageDir = './src/modules/file/storage/processed';
            if (!fs.existsSync(storageDir)) {
                fs.mkdirSync(storageDir, { recursive: true });
            }
            const filePath = path.join(storageDir, `${file.originalname}`);
            fs.renameSync(file.path, filePath);

            this.response.initResponse(true, 'Upload File successfully', newFile);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            this.logger.error(error.message, error.stack);

            if(error instanceof BadRequestException) {
                this.response.initResponse(false, error.message, null);
                return res.status(HttpStatus.BAD_REQUEST).json(this.response);
            }

            this.response.initResponse(false, 'Internal Server Error', null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);

        }
    }

    @Get(':fileID')
    async getFile(@Param('fileID', ParseIntPipe) fileID: number, @Res() res): Promise<any> {
        try {
            const file = await this.fileService.findOneById(fileID);
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