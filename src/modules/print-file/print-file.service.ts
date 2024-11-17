import { Injectable, Inject } from '@nestjs/common';
import { FILEINFO_REPOSITORY, PRINTINGCONFIGURE_REPOSITORY } from "src/common/contants";
import { FileInfo } from './entities/fileInfo.entity';
import { PrintingConfigure } from './entities/printingconfigure.entity';

@Injectable()
export class PrintFileService {
    constructor(
        @Inject(FILEINFO_REPOSITORY) private readonly fileInfoRepository: typeof FileInfo,
        @Inject(PRINTINGCONFIGURE_REPOSITORY) private readonly printingConfigureRepository: typeof PrintingConfigure
    ) { };

    async setUploadedFile(file: Express.Multer.File): Promise<FileInfo> {
        const newFile = await this.fileInfoRepository.create({
            name: file.originalname,
            type: file.mimetype,
            size: file.size,
            fileData: file.buffer,
        });
        return newFile;
    }

    async getInfo(fileID: string) {
        const file = await this.fileInfoRepository.findOne({
            where: { fileID },
        });

        if (!file) {
            throw new Error('File not found');
        }

        return {
            timeUploaded: file.timeUploaded,
            name: file.name,
            size: file.size,
        };
    }

    async setConfigure(printConfig: PrintingConfigure): Promise<void> {
        try {
            console.log(printConfig.fileID)
            const fileExists = await this.fileInfoRepository.findOne({
                where: { fileID: printConfig.fileID },
            });

            if (!fileExists) {
                throw new Error('The fileID does not exist in the file_info table.');
            }

            // If the file exists, create the printing configuration
            await this.printingConfigureRepository.create({
                fileID: printConfig.fileID,
                paperType: printConfig.paperType,
                paperSize: printConfig.paperSize,
                paperStyle: printConfig.paperStyle,
                numOfCopy: printConfig.numOfCopy,
                numOfPage: printConfig.numOfPage,
            });
        } catch (error) {
            throw new Error('Failed to save printing configuration: ' + error.message);
        }
    }

    async getConfigure(fileID: string): Promise<PrintingConfigure> {
        try {
            const printConfig = await this.printingConfigureRepository.findOne({
                where: { fileID },
                attributes: ['paperType', 'paperSize', 'paperStyle', 'numOfCopy', 'numOfPage'],
            });

            if (!printConfig) {
                throw new Error('Printing configuration not found for the provided fileID.');
            }

            return printConfig;
        } catch (error) {
            throw new Error('Failed to retrieve printing configuration: ' + error.message);
        }
    }

}
