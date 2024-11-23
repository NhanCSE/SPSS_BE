import { Body, ConflictException, Controller, HttpStatus, Inject, Post, Req, Res, UseGuards } from "@nestjs/common";
import { SEQUELIZE } from "src/common/contants";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import { Response } from "src/modules/response/response.entity";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDto } from "../dtos/createUser.dto";


@Controller('auth')
export class AuthController {
    constructor(
        private readonly response : Response,
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req, @Res() res) {
        try {
            console.log("User: ", req.user);
            const result =  await this.authService.login(req.user);
            if (!result.accessToken) {
                this.response.initResponse(false, "An error occurs. Please try again", null);
                return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
            }

            res.cookie('sid', result.accessToken, {
                httpOnly: false,
                secure: true,
                maxAge: 2 * 60 * 60 * 1000,
                sameSite: 'none',
            });


            this.response.initResponse(true, "Login successfully", result);
            return res.status(HttpStatus.OK).json(this.response);
        } catch (error) {
            console.log(error);
            this.response.initResponse(false, "An error occurs. Please try again", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }


    @Post('signup')
    async signUp(@Body() newAccount: CreateUserDto, @Res() res) {
        try {
            const createdUser = await this.userService.create(newAccount);
            const result = await this.authService.login(createdUser);

            this.response.initResponse(true, "Sign up successfully", result);
            return res.status(HttpStatus.CREATED).json(this.response);
        } catch (error) {

            if (error instanceof ConflictException) {
                this.response.initResponse(false, error.message, null);
                return res.status(HttpStatus.CONFLICT).json(this.response);
            }
            console.log(error);
            this.response.initResponse(false, "Internal server error", null);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(this.response);
        }
    }
}