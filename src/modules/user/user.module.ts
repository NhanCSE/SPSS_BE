import { DatabaseModule } from "src/database/database.module";
import { Module } from "@nestjs/common";
import { LoggerModule } from "src/common/logger/logger.module";
import { ResponseModule } from "../response/response.module";
// import { UserController } from './controllers/user.controller';
// import { UserService } from './services/user.service';
import { UserProviders } from './user.provider';
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    ResponseModule
  ],
  controllers: [UserController],
  providers: [UserService, ...UserProviders],
})
export class UserModule { }



