import { Injectable } from "@nestjs/common";
import { isEmail } from "class-validator";
import { UserService } from "./user.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}


    async validateUser(username: string, pass: string) {      
        const user = await this.userService.findOneUserByUsername(username);
        
        if (!user) {
            return null;
        }
        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            
            return null;
        }

        const { password, ...result } = user['dataValues'];
        
        return result;
    }

    public async login(user) {
        const accessTokenPayload = {
            id: user.ssoId,
            role: user.role
        }

        const accessToken = await this.generateAccessToken(accessTokenPayload);
        
        delete user.password;
        return { user, accessToken };
    }

    public async generateAccessToken(payload) {
        const token = await this.jwtService.signAsync(payload);
        return token;
    }


    private async comparePassword(enteredPassword: string, dbPassword: string) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }

    public async hashPassword(password: string) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    async decodeAccessToken(token: string) {
        return await this.jwtService.verifyAsync(token);
    }
}