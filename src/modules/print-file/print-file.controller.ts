import { Controller, Post, Body, Get, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrintFileService } from './print-file.service';
import { FileInfo } from './entities/fileInfo.entity';
import { PrintingConfigure } from './entities/printingconfigure.entity';

@Controller('print')
export class PrintFileController {
    constructor(
        private readonly printFileService: PrintFileService,
    ) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        try {
            if (!file) {
                throw new Error('No file uploaded.');
            }
            const uploadedFile = await this.printFileService.setUploadedFile(file);
            return {
                message: 'File uploaded successfully.',
                data: uploadedFile,
            };
        } catch (error) {

            return {
                message: 'Failed to upload file.',
                error: error.message,
            };
        }
    }

    @Get('file/:fileID')
    async getFileInfo(@Param('fileID') fileID: string) {
        try {
            const file = await this.printFileService.getInfo(fileID);
            return {
                message: 'File found successfully.',
                data: file,
            };
        } catch (error) {
            return {
                message: 'Failed to retrieve file.',
                error: error.message,
            };
        }
    }

    @Post('configure')
    async setPrintingConfigure(@Body() printConfig: PrintingConfigure) {
        try {
            await this.printFileService.setConfigure(printConfig);
            return {
                message: 'Printing configuration saved successfully.',
            };
        } catch (error) {
            return {
                message: 'Failed to save printing configuration.',
                error: error.message,
            };
        }
    }

    @Get('configure/:fileID')
    async getPrintingConfigure(@Param('fileID') fileID: string) {
        try {
            const printConfig = await this.printFileService.getConfigure(fileID);
            return {
                message: 'Printing configuration retrieved successfully.',
                data: printConfig,
            };
        } catch (error) {
            return {
                message: 'Failed to retrieve printing configuration.',
                error: error.message,
            };
        }
    }
}