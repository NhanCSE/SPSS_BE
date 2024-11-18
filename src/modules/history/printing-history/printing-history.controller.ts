import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PrintingHistoryService } from './printing-history.service';
import { PrintingHistory } from '../entities/printingHistory.entity';
import { CreatePrintingHistoryDto } from './dto/printing-history.dto'; // DTO for handling POST requests

@Controller('print')
export class PrintingHistoryController {
    constructor(private readonly printingHistoryService: PrintingHistoryService) { }

    @Post()
    async createPrintingHistory(@Body() createPrintingHistoryDto: CreatePrintingHistoryDto): Promise<any> {
        try {
            console.log("wefwefwef")
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
    async getPrintingHistory(@Param('printing_id') printing_id: string): Promise<any> {
        try {
            const printingHistory = await this.printingHistoryService.getPrintingHistory(printing_id);
            if (!printingHistory) {
                return {
                    message: 'Printing history not found',
                    data: null,
                };
            }
            return {
                message: 'Printing history retrieved successfully',
                data: printingHistory,
            };
        } catch (error) {
            return {
                message: `Failed to retrieve printing history: ${error.message}`,
                data: null,
            };
        }
    }
}
