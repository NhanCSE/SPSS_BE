import { Inject, Injectable } from '@nestjs/common';
import { PrintingHistory } from '../entities/printingHistory.entity';
import { CreatePrintingHistoryDto } from '../dto/printingHistory.dto';
import { PRINTING_HISTORY_REPOSITORY } from 'src/common/contants';
import { FileService } from 'src/modules/file/services/file.service';
// import { CreatePrintingHistoryDto } from './dto/printing-history.dto';

@Injectable()
export class PrintingHistoryService {

  constructor(
    private readonly fileService: FileService,
    @Inject(PRINTING_HISTORY_REPOSITORY) private readonly printingHistory: typeof PrintingHistory
  ) {}

  async createPrintingHistory(createPrintingHistoryDto: CreatePrintingHistoryDto): Promise<any> {
    const file = await this.fileService.findOneById(createPrintingHistoryDto.fileId);

    if (!file) {
      console.log('File not found');
      return;
    }

    const printingHistoryData = {
      ...createPrintingHistoryDto,
      filename: file.filename,
    };
    const newPrintingHistory = await this.printingHistory.create(printingHistoryData);
    return newPrintingHistory;
  }

  // Retrieve a printing history entry by printingId
  async getPrintingHistory(printingId: string) {
    const printingHistory = await this.printingHistory.findOne({ where: { printingId } });
    if (!printingHistory) {
      throw new Error(`Printing history with ID ${printingId} not found.`);
    }
    return printingHistory;
  }

  async getAllPrintingHistory() {
    return await this.printingHistory.findAll(); 
  }

  async getAllByStudentId(studentId: number) {
    return this.printingHistory.findAll({
      where: {
        studentId
      }
    });
  }

}
