import { Controller, Post, Body, Get, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { File } from './entities/file.entity';
import { SetFileDto } from './dto/setFile.dto';
import * as fs from 'fs';
import * as path from 'path';
// import { PrintingConfigure } from './entities/printingconfigure.entity';

@Controller('file')
export class PrintFileController {
    constructor(
        private readonly printFileService: FileService,
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('file', { dest: '../storage' }))
    async uploadFile(@Body() fileData: SetFileDto, @UploadedFile() file: Express.Multer.File): Promise<any> {
        try {
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