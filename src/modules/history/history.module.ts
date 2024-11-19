
import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/common/logger/logger.module';
import { DatabaseModule } from 'src/database/database.module';
import { ResponseModule } from 'src/modules/response/response.module';
import { PrintingHistoryController } from './controllers/printingHistory.controller';
import { PrintingHistoryService } from './services/printingHistory.service';



@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    ResponseModule
  ],
  controllers: [PrintingHistoryController],
  providers: [PrintingHistoryService],
})
export class PrintingHistoryModule { }
