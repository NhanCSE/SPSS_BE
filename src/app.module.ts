import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PrinterModule } from './modules/printer/printer.module';
import { UserModule } from './modules/user/user.module';
import { FileModule } from './modules/file/file.module';
import { HistoryModule } from './modules/history/history.module';

@Module({
  imports: [DatabaseModule, PrinterModule, UserModule, FileModule, HistoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
