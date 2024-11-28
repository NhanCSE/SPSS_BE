import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { PaymentProviders } from './payment.provider';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerModule } from 'src/common/logger/logger.module';
import { ResponseModule } from '../response/response.module';

@Module({
  imports: [
    DatabaseModule,
    LoggerModule,
    ResponseModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService, ...PaymentProviders]
})
export class PaymentModule { }
