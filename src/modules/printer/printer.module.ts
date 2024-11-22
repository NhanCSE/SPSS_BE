import { DatabaseModule } from "src/database/database.module";
import { PrinterService } from "./services/printer.service";
import { Module } from "@nestjs/common";
import { PrinterController } from "./controllers/printer.controller";
import { printerProviders } from "./printer.provider";
import { LoggerModule } from "src/common/logger/logger.module";
import { ResponseModule } from "../response/response.module";


@Module({
    imports: [
        DatabaseModule,
        LoggerModule,
        ResponseModule
    ],
    controllers: [PrinterController],
    providers: [...printerProviders, PrinterService],
    exports: [PrinterService]
})
export class PrinterModule {}