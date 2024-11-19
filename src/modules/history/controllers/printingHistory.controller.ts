import { Controller, Post, Body, Get, Param, Res, HttpStatus, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { PrintingHistoryService } from '../services/printingHistory.service';
import { PrintingHistory } from '../entities/printingHistory.entity';
import { CreatePrintingHistoryDto } from '../dto/printingHistory.dto';
import { Response } from 'src/modules/response/response.entity';
import { LoggerService } from 'src/common/logger/logger.service';

@Controller('print')
export class PrintingHistoryController {
    constructor(
        private readonly printingHistoryService: PrintingHistoryService,
        private readonly response: Response,
        private readonly logger: LoggerService
    ) { }

    @Post()
    async createPrintingHistory(
        @Body() createPrintingHistoryDto: CreatePrintingHistoryDto,
    ): Promise<any> {
        try {
            const printingHistory = await this.printingHistoryService.createPrintingHistory(createPrintingHistoryDto);
            return {
                message: 'Printing history created successfully',
                data: printingHistory,
            };
        } catch (error) {
            return {
                message: `Failed to create printing history: ${error.message}`,
                data: null,
            };
        }
    }

    @Get(':printing_id')
    async getPrintingHistory(
        @Param('printing_id') printing_id: string,
        @Res() res
    ): Promise<any> {
        try {
            const printingHistory = await this.printingHistoryService.getPrintingHistory(printing_id);
            this.response.initResponse(true, 'Tìm lịch sử in thành công.', printingHistory);
            return res.status(HttpStatus.CREATED).json(this.response);
        } catch (error) {
            this.logger.error(error.message, error.stack);
            if (error instanceof InternalServerErrorException) {
                this.response.initResponse(false, error.message, null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }

            if (error instanceof BadRequestException) {
                this.response.initResponse(false, error.message, null);
                return res.status(HttpStatus.BAD_REQUEST).json(this.response);
            }

            this.response.initResponse(false, "Đã xảy ra lỗi. Vui lòng thử lại", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }
}
