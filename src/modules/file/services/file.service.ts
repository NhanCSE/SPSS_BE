import { Injectable, Inject } from '@nestjs/common';
import { FILE_REPOSITORY } from "src/common/contants";
import { SetFileDto } from '../dto/setFile.dto';
import { File } from '../entities/file.entity';
// import { File } from './entities/file.entity';
// import { SetFileDto } from './dto/setFile.dto';
// import { PrintingConfigure } from './entities/printingconfigure.entity';

@Injectable()
export class FileService {
    constructor(
        @Inject(FILE_REPOSITORY) private readonly fileRepository: typeof File,
        // @Inject(PRINTINGCONFIGURE_REPOSITORY) private readonly printingConfigureRepository: typeof PrintingConfigure
    ) { };

    async setFile(fileData: SetFileDto): Promise<File> {
        try {
            const newFile = await this.fileRepository.create(fileData);
            return newFile;
        } catch (error) {
            throw new Error(`Failed to save file info: ${error.message}`);
        }
    }

    async getFile(file_id: string): Promise<any> {
        const file = await this.fileRepository.findOne({
            where: { file_id },
        });

        if (!file) {
            throw new Error('File not found');
        }
        return file;
    }
}
