import { Injectable } from '@nestjs/common';
import { PrintingHistory } from '../entities/printingHistory.entity';
import { File } from 'src/modules/file/entities/file.entity';
import { CreatePrintingHistoryDto } from '../dto/printingHistory.dto';
import { ViewPrintingHistoryDto } from '../dto/printingHistory.dto';
// import { CreatePrintingHistoryDto } from './dto/printing-history.dto';

@Injectable()
export class PrintingHistoryService {

  async createPrintingHistory(createPrintingHistoryDto: CreatePrintingHistoryDto): Promise<any> {
    try {
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
    } catch (error) {
      throw new Error(`Failed to create printing history: ${error.message}`);
    }
  }

  // Retrieve all printing history of a student by student_id
  async getStudentPrintingHistory(student_id: number): Promise<any> {
    try {
      const printingHistories = await PrintingHistory.findAll({ where: { student_id: student_id } });
      if (!printingHistories) {
        throw new Error(`Printing history of user's ID ${student_id} not found.`);
      }
      return printingHistories;
    } catch (error) {
      throw new Error(`Failed to retrieve printing history: ${error.message}`);
    }
  }

}