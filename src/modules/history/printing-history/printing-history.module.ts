import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/common/logger/logger.module';
import { DatabaseModule } from 'src/database/database.module';
import { ResponseModule } from 'src/modules/response/response.module';
import { PrintingHistoryController } from './printing-history.controller';
import { PrintingHistoryService } from './printing-history.service';


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
  