import { Injectable, Inject } from '@nestjs/common';
import { FILE_REPOSITORY } from "src/common/contants";
import { SetFileDto } from '../dto/setFile.dto';
import { File } from '../entities/file.entity';


@Injectable()
export class FileService {
    constructor(
        @Inject(FILE_REPOSITORY) private readonly fileRepository: typeof File,
    ) { };

    async setFile(fileData: SetFileDto): Promise<File> {
        const newFile = await this.fileRepository.create(fileData);
        return newFile;
    }

    async getFile(fileId: string): Promise<any> {
        const file = await this.fileRepository.findOne({
            where: { fileId },
        });

        if (!file) {
            throw new Error('File not found');
        }
        return file;
    }
}
