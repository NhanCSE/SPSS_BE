// import { SystemConfiguration } from './system_configuration.entity';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
  Delete,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { Response } from 'src/modules/response/response.entity';
// import { SystemConfigurationService } from './system_configuration.service';
// import { CreateSystemConfigDto } from './dtos/system_configuration.dtos';
// import { UpdateSystemConfigDto } from './dtos/system_configuration.dtos';
import { LoggerService } from 'src/common/logger/logger.service';
import { SystemConfigurationService } from '../services/system.service';
import { CreateSystemConfigDto } from '../dtos/system_configuration.dtos';

@Controller('systemConfiguration')
export class SystemConfigurationController {
  constructor(
    private readonly systemConfigurationService: SystemConfigurationService,
    private readonly logger: LoggerService,
    private readonly response: Response,
  ) { }

  @Post('/create')
  async createSystemConfiguration(@Body() dto: CreateSystemConfigDto, @Res() res) {
    try {
      const createdPrinter = await this.systemConfigurationService.create(dto);
      this.response.initResponse(true, 'Tạo cấu hình thành công', createdPrinter);
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

      this.response.initResponse(
        false,
        'Đã xảy ra lỗi. Vui lòng thử lại',
        null,
      );
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
    }
  }
  @Get('/searchAll')
  async getAll(@Res() res) {
    try {
      const result = await this.systemConfigurationService.searchAll();
      if (!result) {
        this.response.initResponse(false, 'Không tìm thấy cấu hình nào', null);
        return res.status(HttpStatus.NOT_FOUND).json(this.response);
      }
      this.response.initResponse(true, 'Lấy tất cả cấu hình thành công', result);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      this.response.initResponse(false, 'Đã xảy ra lỗi. Vui lòng thử lại', null);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
    }
  }
  @Get('/searchNewest')
  async getNewest(@Res() res) {
    try {
      const result = await this.systemConfigurationService.searchNewest();
      if (!result) {
        this.response.initResponse(false, 'Không tìm thấy cấu hình nào', null);
        return res.status(HttpStatus.NOT_FOUND).json(this.response);
      }
      this.response.initResponse(true, 'Lấy cấu hình mới nhất thành công', result);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.logger.error(error.message, error.stack);
      this.response.initResponse(false, 'Đã xảy ra lỗi. Vui lòng thử lại', null);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
    }
  }
}