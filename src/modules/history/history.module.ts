
import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/common/logger/logger.module';
import { DatabaseModule } from 'src/database/database.module';
import { ResponseModule } from 'src/modules/response/response.module';
import { PrintingHistoryController } from './controllers/printingHistory.controller';
import { PrintingHistoryService } from './services/printingHistory.service';
import { historyProvider } from './history.provider';
import { FileService } from '../file/services/file.service';
import { FileProviders } from '../file/file.provider';



@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    ResponseModule
  ],
  controllers: [PrintingHistoryController],
  providers: [...historyProvider, PrintingHistoryService, ...FileProviders, FileService],
  exports: [PrintingHistoryService]
})
export class PrintingHistoryModule { }
