import { Injectable } from '@nestjs/common';
import { PrintingHistory } from '../entities/printingHistory.entity';
import { File } from 'src/modules/file/entities/file.entity';
import { CreatePrintingHistoryDto } from '../dto/printingHistory.dto';
// import { CreatePrintingHistoryDto } from './dto/printing-history.dto';

@Injectable()
export class PrintingHistoryService {
  async createPrintingHistory(createPrintingHistoryDto: CreatePrintingHistoryDto): Promise<any> {
      const file = await File.findByPk(createPrintingHistoryDto.file_id);

      if (!file) {
        console.log('File not found');
        return;
      }

      const printingHistoryData = {
        ...createPrintingHistoryDto,
        filenames: file.filenames,
      };
      const newPrintingHistory = await PrintingHistory.create(printingHistoryData);
      return newPrintingHistory;
  }

  // Retrieve a printing history entry by printing_id
  async getPrintingHistory(printing_id: string): Promise<any> {
      const printingHistory = await PrintingHistory.findOne({ where: { printing_id } });
      if (!printingHistory) {
        throw new Error(`Printing history with ID ${printing_id} not found.`);
      }
      return printingHistory;
  }
}
