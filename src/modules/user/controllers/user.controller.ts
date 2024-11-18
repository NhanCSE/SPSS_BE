import { BadRequestException, Body, Controller, HttpStatus, InternalServerErrorException, Param, Post, Req, Res } from "@nestjs/common";
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
      const createdPrinter = await this.userService.create(dto);
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