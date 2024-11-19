import { Module } from '@nestjs/common';
import { FileService } from './services/file.service';
import { PrintFileController } from './controllers/file.controller';
import { LoggerModule } from "src/common/logger/logger.module";
import { ResponseModule } from "../response/response.module";
import { DatabaseModule } from "src/database/database.module";
import { FileProviders } from './file.provider';
import { PrintingHistoryService } from '../history/services/printingHistory.service';

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    ResponseModule
  ],
  controllers: [PrintFileController],
  providers: [...FileProviders, FileService, PrintingHistoryService],
})
export class FileModule { }
