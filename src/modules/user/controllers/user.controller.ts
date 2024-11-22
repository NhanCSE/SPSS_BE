import { BadRequestException, Body, Controller, Get, HttpStatus, InternalServerErrorException, Param, Post, Req, Res } from "@nestjs/common";
import { Response } from "src/modules/response/response.entity";
import { LoggerService } from "src/common/logger/logger.service";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dtos/createUser.dto";

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: LoggerService,
    private readonly response: Response
  ) { }


  @Post('create')
  async create(
    @Req() req,
    @Body() dto: CreateUserDto,
    @Res() res,
  ) {
    try {
      const createdUser = await this.userService.create(dto);
      this.response.initResponse(true, "Tạo người dùng thành công", createdUser);
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

  @Get('paper/search/:studentId')
  async getBalance(
    @Req() req,
    @Param('studentId') studentId: number,
    @Res() res,
  ) {
    try {
      const paper = await this.userService.getBalance(studentId);
      this.response.initResponse(true, "Lấy số lượng giấy thành công", paper);
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

  @Get('search/:studentId')
  async getUser(
    @Req() req,
    @Param('studentId') studentId: number,
    @Res() res,
  ) {
    try {
      const userInfo = await this.userService.getUser(studentId);
      this.response.initResponse(true, "Lấy thông tin người dùng thành công", userInfo);
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