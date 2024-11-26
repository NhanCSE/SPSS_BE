import { DatabaseModule } from "src/database/database.module";
import { Module } from "@nestjs/common";
import { LoggerModule } from "src/common/logger/logger.module";
import { ResponseModule } from "../response/response.module";
// import { UserController } from './controllers/user.controller';
// import { UserService } from './services/user.service';
import { UserProviders } from './user.provider';
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    ResponseModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_KEY,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
    })
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, ...UserProviders, AuthService, LocalStrategy, JwtStrategy],
  exports: [UserService, AuthService]
})
export class UserModule { }



