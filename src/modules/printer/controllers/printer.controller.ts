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
  Param,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'src/modules/response/response.entity';
import { PrinterService } from '../services/printer.service';
import { CreatePrinterDto } from '../dtos/create-printer.dtos';
import { UpdatePrinterDto } from '../dtos/update-printer.dtos';
import { UpdatePaperAfterPrintingDto } from '../dtos/update-paper-after-printing.dtos';
import { LoggerService } from 'src/common/logger/logger.service';
import { SearchAvailableDto } from '../dtos/search-available.dtos';
import { SearchPayload } from 'src/common/interfaces/search_payload.interface';
import { PrintFileDto } from '../dtos/print-file.dtos';
import { JwtAuthGuard } from 'src/common/guards/authenticate.guard';

@Controller('printer')
export class PrinterController {
  constructor(
    private readonly printerService: PrinterService,
    private readonly logger: LoggerService,
    private readonly response: Response,
  ) {}


  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Req() req, @Body() dto: CreatePrinterDto, @Res() res) {
    try {
      const createdPrinter = await this.printerService.create(dto);
      this.response.initResponse(true, 'Tạo máy in thành công', createdPrinter);
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
  
  @UseGuards(JwtAuthGuard)
  @Post('search')
  async search(@Body() searchPayload: SearchPayload, @Res() res) {
    try {
      const printers = await this.printerService.search(searchPayload);
      this.response.initResponse(true, 'Tìm kiếm thành công', printers);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      console.log(error.message);
      this.response.initResponse(
        false,
        'Đã xảy ra lỗi. Vui lòng thử lại',
        null,
      );
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('search/available')
  async searchAvailable(@Req() req, @Body() criteria: SearchAvailableDto, @Res() res) {
    try {
      const printers = await this.printerService.searchAvailable(criteria);
      this.response.initResponse(true, 'Tìm kiếm thành công', printers);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.response.initResponse(
        false,
        'Đã xảy ra lỗi. Vui lòng thử lại',
        null,
      );
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/print/:printerId')
  async printFile(@Req() req, @Param('printerId') printerId: number, @Body() payload: PrintFileDto, @Res() res) {
    try {

      const studentId = req.user.id;

      const printers = await this.printerService.printFile(printerId, studentId, payload);
      this.response.initResponse(true, 'Tìm kiếm thành công', printers);
      return res.status(HttpStatus.OK).json(this.response);

    } catch (error) {
      this.logger.error(error.message, error.stack);
      this.response.initResponse(
        false,
        'Đã xảy ra lỗi. Vui lòng thử lại',
        null,
      );
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/print/check/:printerId')
  async printFileCheck(@Req() req, @Param('printerId') printerId: number, @Body() payload: PrintFileDto, @Res() res) {
    try {

      const studentId = req.user.id;
      


      const printers = await this.printerService.printFileCheck(printerId, studentId, payload);
      this.response.initResponse(true, 'Tìm kiếm thành công', printers);
      return res.status(HttpStatus.OK).json(this.response);
      
    } catch (error) {
      this.response.initResponse(
        false,
        'Đã xảy ra lỗi. Vui lòng thử lại',
        null,
      );
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('count')
  async count(@Query() query, @Res() res) {
    try {
      const searchCriteria = query;
      const numberOfPrinters = await this.printerService.count(searchCriteria);
      if (numberOfPrinters == -1) {
        this.response.initResponse(false, 'Đếm thất bại', null);
        return res.status(HttpStatus.NOT_FOUND).json(this.response);
      }
      this.response.initResponse(true, 'Đếm thành công', numberOfPrinters);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.response.initResponse(
        false,
        'Đã xảy ra lỗi. Vui lòng thử lại',
        null,
      );
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
    }
  }


  @UseGuards(JwtAuthGuard)
  @Get('count/all')
  async countAll(@Query() query, @Res() res) {
    try {
      
      const numberOfPrinters = await this.printerService.countAll();
      this.response.initResponse(true, 'Đếm thành công', numberOfPrinters);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.response.initResponse(
        false,
        'Đã xảy ra lỗi. Vui lòng thử lại',
        null,
      );
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
    }
  }

  
  @UseGuards(JwtAuthGuard)
  @Put('update')
  async update(@Body() updatePrinterDto: UpdatePrinterDto, @Res() res) {
    try {
      if (!updatePrinterDto.id) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Thiếu id. Cần chỉ rõ máy in cần cập nhật thông tin',
        });
      }

      // Kiểm tra xem id trong body có tồn tại trong cơ sở dữ liệu không
      const updatedPrinter = await this.printerService.update(
        updatePrinterDto.id,
        updatePrinterDto,
      );

      if (!updatedPrinter) {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Không tìm thấy máy in',
        });
      }

      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Cập nhật thành công',
        //data: updatedPrinter,
      });
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update-paper-after-printing')
  async updatePaperAfterPrinting(
    @Body() updatePaper: UpdatePaperAfterPrintingDto,
    @Res() res,
  ) {
    try {
      if (!updatePaper.id) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Thiếu id. Cần chỉ rõ máy in cần cập nhật thông tin',
        });
      }

      // Kiểm tra xem id trong body có tồn tại trong cơ sở dữ liệu không
      const updatedPrinter = await this.printerService.updatePaper(
        updatePaper.id,
        updatePaper,
      );

      if (!updatedPrinter) {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Không tìm thấy máy in',
        });
      }

      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Cập nhật thành công',
        //data: updatedPrinter,
      });
    } catch (error) {
      this.logger.error(error.message, error.stack);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  async delete(@Query() query, @Res() res) {
    try {
      // Lấy các query parameters từ request (ví dụ: ?brand=HP&model=HP100)
      const deleteCriteria = query;

      // Tìm kiếm máy in theo các tham số
      const result = await this.printerService.delete(deleteCriteria);

      if (result == 1) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: 'Thiếu id. Cần chỉ rõ máy in cần xóa',
        });
      } else if (result == 2) {
        return res.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Không tìm thấy máy in thỏa yêu cầu xóa',
        });
      }
      this.response.initResponse(true, 'Xóa máy in thành công', null);
      return res.status(HttpStatus.OK).json(this.response);
    } catch (error) {
      this.response.initResponse(
        false,
        'Đã xảy ra lỗi. Vui lòng thử lại',
        null,
      );
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
    }
  }
}
