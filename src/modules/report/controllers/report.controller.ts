import { BadRequestException, Body, Controller, HttpStatus, InternalServerErrorException, Post, Get, Req, Res } from "@nestjs/common";
import { Response } from "src/modules/response/response.entity";
import { ReportService } from "../services/report.service";
import { CreateReportDto } from "../dtos/create-report.dtos";
import { ViewReportDto } from "../dtos/view-report.dtos";
import { LoggerService } from "src/common/logger/logger.service";


@Controller('report')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly logger: LoggerService,
    private readonly response: Response
  ) { }

  @Post('create')
  async create(
    @Req() req,
    @Body() dto: CreateReportDto,
    @Res() res
  ) {
    try {
      const createdReport = await this.reportService.create(dto);
      this.response.initResponse(true, "Report created successfully", createdReport);
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

      this.response.initResponse(false, "An error occurred. Please try again", null);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
    }
  }

  @Get('view')
  async view(
    @Req() req,
    @Body() dto: ViewReportDto,
    @Res() res
  ) {
    try {
      const report = await this.reportService.view(dto);
      this.response.initResponse(true, "Report retrieved successfully", report);
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

      this.response.initResponse(false, error.message, null);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
    }
  }
}