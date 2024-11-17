import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PrinterModule } from './modules/printer/printer.module';
import { PrintFileModule } from './modules/print-file/print-file.module';

@Module({
  imports: [DatabaseModule, PrinterModule, PrintFileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
