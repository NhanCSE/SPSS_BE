import { BadRequestException, Body, Controller, Get, HttpStatus, InternalServerErrorException, Param, Post, Req, Res } from "@nestjs/common";
import axios from "axios";
import * as dotenv from 'dotenv';
import { PaymentService } from "./payment.service";
import { CreatePayemntDto } from "./payment.dto";
import { Response } from "src/modules/response/response.entity";
import { LoggerService } from "src/common/logger/logger.service";

const crypto = require('crypto');
// import from 'crypto'
dotenv.config();

@Controller('payment')
export class PaymentController {

  constructor(
    private readonly logger: LoggerService,
    private readonly response: Response,

    private readonly paymentService: PaymentService
  ) { }

  @Post('/create')
  async createPayment(@Req() req, @Body() dto: CreatePayemntDto, @Res() res) {
    try {
      const createdPayment = await this.paymentService.createPayment(dto);
      this.response.initResponse(true, "Tạo đơn hàng thành công", createdPayment);
      return res.status(HttpStatus.CREATED).json(createdPayment);
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

  @Post("/callback")
  async callback(@Req() req, @Body() data, @Res() res) {
    try {
      const result = await this.paymentService.paySuccessful(data.orderId)
      return res.status(HttpStatus.OK).json(result);
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

  @Get('/search')
  async searchAll(@Req() req, @Res() res) {
    try {
      const result = await this.paymentService.searchAllPayment();
      this.response.initResponse(true, "Lấy thông tin thành công", result);
      return res.status(HttpStatus.CREATED).json(result);
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


  @Get('/search/student/:studentId')
  async searchByStudentId(@Req() req, @Param('studentId') studentId: number, @Res() res) {
    try {
      const result = await this.paymentService.searchByStudentId(studentId);
      this.response.initResponse(true, "Lấy thông tin thành công", result);
      return res.status(HttpStatus.CREATED).json(result);
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
