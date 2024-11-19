import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PrinterModule } from './modules/printer/printer.module';
// import { UserModule } from './modules/user/user.module';
import { ReportModule } from './modules/report/report.module';
import { SystemConfigurationModule } from './modules/system/system.module';
import { FileModule } from './modules/file/file.module';
import { PrintingHistoryModule } from './modules/history/history.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [DatabaseModule, PrinterModule, UserModule, ReportModule, SystemConfigurationModule, FileModule, PrintingHistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
