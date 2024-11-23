import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UserService } from '../services/user.service';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from 'src/common/contants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(SEQUELIZE) private readonly sequelize: Sequelize,
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_ACCESS_KEY,
        });
    }

    async validate(payload: any) {
        const user = await this.userService.findOneUserById(payload.id);
        if (!user) {
            throw new UnauthorizedException('Please login to continue');
        }
        return user.dataValues ? user.dataValues : user;
    }
}