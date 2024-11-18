import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { PrintFileController } from './file.controller';
import { LoggerModule } from "src/common/logger/logger.module";
import { ResponseModule } from "../response/response.module";
import { DatabaseModule } from "src/database/database.module";
import { FileProviders } from './file.provider';

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    ResponseModule
  ],
  controllers: [PrintFileController],
  providers: [...FileProviders, FileService],
})
export class FileModule { }
