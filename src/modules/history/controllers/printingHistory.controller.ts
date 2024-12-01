import { Controller, Post, Body, Get, Param, Res, HttpStatus } from '@nestjs/common';
// import { PrintingHistoryService } from './printing-history.service';
import { PrintingHistory } from '../entities/printingHistory.entity';
import { PrintingHistoryService } from '../services/printingHistory.service';
import { CreatePrinterDto } from 'src/modules/printer/dtos/create-printer.dtos';
import { CreatePrintingHistoryDto } from '../dto/printingHistory.dto';
import { Response } from 'src/modules/response/response.entity';
import { LoggerService } from 'src/common/logger/logger.service';
// import { CreatePrintingHistoryDto } from './dto/printing-history.dto'; // DTO for handling POST requests

@Controller('history/print')
export class PrintingHistoryController {
    constructor(
        private readonly printingHistoryService: PrintingHistoryService,
        private readonly response: Response,
        private readonly logger: LoggerService
    ) { }

    @Post()
    async createPrintingHistory(@Body() createPrintingHistoryDto: CreatePrintingHistoryDto, @Res() res): Promise<any> {
        try {
            
            const printingHistory = await this.printingHistoryService.createPrintingHistory(createPrintingHistoryDto);
            this.response.initResponse(true, 'Create Printing History successfully', printingHistory);
            return res.status(HttpStatus.CONFLICT).json(this.response);
            
        } catch (error) {
            this.logger.error(error.message, error.stack);
            this.response.initResponse(false, 'Get Printing History failed', null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Get(':printingId')
    async getPrintingHistory(@Param('printingId') printingId: string, @Res() res): Promise<any> {
        try {
            const printingHistory = await this.printingHistoryService.getPrintingHistory(printingId);
            if (!printingHistory) {
                this.response.initResponse(false, 'Not found history', null);
                return res.status(HttpStatus.NOT_FOUND).json(this.response);
            }
            this.response.initResponse(true, 'Get Printing History successfully', printingHistory);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            this.response.initResponse(false, 'Get Printing History failed', null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }


    @Get('/student/:studentId')
    async getPrintingStudentHistory(@Param('studentId') studentId: number, @Res() res): Promise<any> {
        try {
            const printingHistory = await this.printingHistoryService.getAllByStudentId(studentId);
            this.response.initResponse(true, 'Get Printing History successfully', printingHistory);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: error.message,
            });
        }
    }

    @Get('')
    async getAllPrintingHistory(@Res() res): Promise<any> {
        try {
            const printingHistory = await this.printingHistoryService.getAllPrintingHistory();
            if (!printingHistory) {
                this.response.initResponse(false, 'Not found history', null);
                return res.status(HttpStatus.NOT_FOUND).json(this.response);
            }
            this.response.initResponse(true, 'Get Printing History successfully', printingHistory);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            this.response.initResponse(false, 'Get Printing History failed', null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }

    @Get('/printer/:printerId')
    async getPrinterHistory(@Param('printerId') printerId: number, @Res() res): Promise<any> {
        try {
            const printingHistory = await this.printingHistoryService.getAllByPrinterId(printerId);
            if (!printingHistory) {
                this.response.initResponse(false, 'Not found history', null);
                return res.status(HttpStatus.NOT_FOUND).json(this.response);
            }
            this.response.initResponse(true, 'Get Printing History successfully', printingHistory);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            this.response.initResponse(false, 'Get Printing History failed', null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }
}
