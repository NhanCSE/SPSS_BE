import { Module } from '@nestjs/common';
import { PrintFileService } from './print-file.service';
import { PrintFileController } from './print-file.controller';
import { LoggerModule } from "src/common/logger/logger.module";
import { ResponseModule } from "../response/response.module";
import { DatabaseModule } from "src/database/database.module";
import { printFileProviders } from './print-file.provider';

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    ResponseModule
  ],
  controllers: [PrintFileController],
  providers: [...printFileProviders, PrintFileService],
})
export class PrintFileModule { }
