import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PrinterModule } from './modules/printer/printer.module';
import { SystemConfigurationModule } from './modules/system_configuration/system_configuration.module';

@Module({
  imports: [DatabaseModule, PrinterModule, SystemConfigurationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
