import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PrinterModule } from './modules/printer/printer.module';
import { UserModule } from './modules/user/user.module';
import { ReportModule } from './modules/report/report.module';
import { SystemConfigurationModule } from './modules/system/system.module';

@Module({
  imports: [DatabaseModule, PrinterModule, UserModule, ReportModule, SystemConfigurationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
