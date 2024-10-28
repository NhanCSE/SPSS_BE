import { BadRequestException, Body, Controller, HttpStatus, InternalServerErrorException, Post, Req, Res } from "@nestjs/common";
import { Response } from "src/modules/response/response.entity";
import { PrinterService } from "../services/printer.service";
import { CreatePrinterDto } from "../dtos/create-printer.dtos";
import { LoggerService } from "src/common/logger/logger.service";


@Controller('printer')
export class PrinterController {
    constructor(
        private readonly printerService: PrinterService,
        private readonly logger: LoggerService,
        private readonly response: Response
    ) {}


    @Post('create')
    async create(
        @Req() req,
        @Body() dto: CreatePrinterDto,
        @Res() res
    ) {
        try { 
            const createdPrinter = await this.printerService.create(dto);
            this.response.initResponse(true, "Tạo đơn hàng thành công", createdPrinter);
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