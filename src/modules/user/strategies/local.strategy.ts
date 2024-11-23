import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserRole } from 'src/common/contants';
import { UserService } from '../services/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
      private readonly authService: AuthService,
      private readonly userService: UserService 
    ) {
        super({
          usernameField: 'username',
          passwordField: 'password',
        });
      }

    async validate(username: string, password: string): Promise<any>{
        const user = await this.authService.validateUser(username, password);
        if (!user) {
         throw new UnauthorizedException('Invalid user credentials');
        }
       
        if(user.role == UserRole.ADMIN) {
          await this.userService.updateLastLoginForAdmin(user.ssoId);
          return await this.userService.findOneAdminById(user.ssoId);
        } else if (user.role == UserRole.STUDENT) {
          return await this.userService.findOneStudentById(user.ssoId);
        }
        
        return await this.userService.findOneUserById(user.ssoId);
    }
}