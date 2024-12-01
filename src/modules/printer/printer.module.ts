import { DatabaseModule } from "src/database/database.module";
import { PrinterService } from "./services/printer.service";
import { Module } from "@nestjs/common";
import { PrinterController } from "./controllers/printer.controller";
import { printerProviders } from "./printer.provider";
import { LoggerModule } from "src/common/logger/logger.module";
import { ResponseModule } from "../response/response.module";
import { UserProviders } from "../user/user.provider";
import { UserService } from "../user/services/user.service";
import { FileProviders } from "../file/file.provider";
import { FileService } from "../file/services/file.service";
import { PrintingHistoryService } from "../history/services/printingHistory.service";
import { historyProvider } from "../history/history.provider";
import { UserModule } from "../user/user.module";


@Module({
    imports: [
        DatabaseModule,
        LoggerModule,
        ResponseModule,
        UserModule
    ],
    controllers: [PrinterController],
    providers: [...printerProviders, PrinterService, ...UserProviders, UserService, ...FileProviders, FileService, ...historyProvider, PrintingHistoryService],
    exports: [PrinterService]
})
export class PrinterModule {}