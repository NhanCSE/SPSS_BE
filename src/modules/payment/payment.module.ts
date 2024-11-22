import { DatabaseModule } from "src/database/database.module";
import { Module } from "@nestjs/common";
import { LoggerModule } from "src/common/logger/logger.module";
import { ResponseModule } from "../response/response.module";
import { PaymentController } from "./controller/payment.controller";
import { PaymentProviders } from "./payment.provider";
import { PaymentService } from "./services/payment.service";


@Module({
    imports: [
        DatabaseModule,
        LoggerModule,
        ResponseModule
      ],
      controllers: [PaymentController],
      providers: [PaymentService, ...PaymentProviders]
})
export class PaymentModule {}