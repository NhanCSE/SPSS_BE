import { Module } from '@nestjs/common';
import { PrintingHistoryModule } from './printing-history/printing-history.module';

@Module({
  imports: [PrintingHistoryModule]
})
export class HistoryModule {}
