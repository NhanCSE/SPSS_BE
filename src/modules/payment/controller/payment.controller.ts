import { BadRequestException, Body, Controller, Get, HttpStatus, InternalServerErrorException, Param, Post, Req, Res } from "@nestjs/common";
import { Response } from "src/modules/response/response.entity";
import { LoggerService } from "src/common/logger/logger.service";
import { PaymentService } from "../services/payment.service";
import { CreatePaymentDto } from "../dto/payment.dto";
import { ViewPaymentDto } from "../dto/payment.dto";


@Controller('payment')
export class PaymentController {
    constructor(
        private readonly paymentService: PaymentService,
        private readonly logger: LoggerService,
        private readonly response: Response
    ) { }


    @Get('view/:student_ID?')
    async viewPrintingHistory(
        @Req() req,
        @Param('student_ID') student_id: number,
        @Res() res,
    ) {
        try {
            const viewPrintingHistory = await this.paymentService.getPaymentHistories(student_id);
            this.response.initResponse(true, "Payment History showed!", viewPrintingHistory);
            return res.status(HttpStatus.OK).json(this.response);
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