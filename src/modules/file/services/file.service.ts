import { Injectable, Inject } from '@nestjs/common';
import { FILE_REPOSITORY } from "src/common/contants";
import { File } from '../entities/file.entity';
import { SetFileDto } from '../dto/setFile.dto';
import { Printer } from '../../printer/entities/printer.entity';
// import { PrintingConfigure } from './entities/printingconfigure.entity';

@Injectable()
export class FileService {
    constructor(
        @Inject(FILE_REPOSITORY) private readonly fileRepository: typeof File,
        // @Inject(PRINTINGCONFIGURE_REPOSITORY) private readonly printingConfigureRepository: typeof PrintingConfigure
    ) { };

    async checkPrinterAvailability(printer_id: string, page_print: number, copies: number, page_size: string) {
        const printer = await Printer.findByPk(printer_id);
        if (!printer) {
            return { isValid: false, message: 'Printer not found' };
        }

        if (!printer.status) {
            return { isValid: false, message: 'Printer is currently unavailable' };
        }

        const paperRequired = page_print * copies;

        switch (page_size) {
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
        return { isValid: true, message: 'Printer is available' };
    }

    async setFile(fileData: SetFileDto): Promise<File> {
            const newFile = await this.fileRepository.create(fileData);
            return newFile;
    }

    async getFile(file_id: string): Promise<any> {
        const file = await this.fileRepository.findOne({
            where: { file_id },
        });
        return file;
    }
}
