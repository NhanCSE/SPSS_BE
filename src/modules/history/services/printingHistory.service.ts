import { Inject, Injectable } from '@nestjs/common';
import { PrintingHistory } from '../entities/printingHistory.entity';
import { CreatePrintingHistoryDto } from '../dto/printingHistory.dto';
import { PRINTING_HISTORY_REPOSITORY } from 'src/common/contants';
import { FileService } from 'src/modules/file/services/file.service';
import axios, { AxiosResponse } from 'axios'
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

  async getAllByPrinterId(printerId: number) {
    return this.printingHistory.findAll({
      where: {
        printerId
      }
    });
  }


  customHeader(token: string | null) {
    if (token) {
      return {
        withCredentials: true,
        validateStatus: (status: any) => status >= 200 && status <= 500,
        headers: {
          Authorization: `Bearer ${token}`
        },
      };
    }
  
    return {
      withCredentials: true,
      validateStatus: (status: any) => status >= 200 && status <= 500,
    };
  };
  
  processResponse (response: AxiosResponse) {
    return {
      success: response.data.success,
      message: response.data.message,
      data: response.data.data,
      status: response.status,
    };
  };
  
  processError(error: any) {
    return {
      success: error?.response?.data,
      request: error?.request,
      status: error.response ? error.response.status : null,
    };
  };


  async getPrinterHistory(printerId: number, token: string) {
    try {

      const response: AxiosResponse = await axios.get(`https://3939-2402-9d80-c02-d6e6-ec68-4f62-3e24-658.ngrok-free.app/v1/history/print/printer/${printerId}`, this.customHeader(token))

      return this.processResponse(response);
    }
    catch (error) {
      this.processError(error)

    }
  }

}
