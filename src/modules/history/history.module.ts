import { DatabaseModule } from "src/database/database.module";
import { Module } from "@nestjs/common";
import { LoggerModule } from "src/common/logger/logger.module";
import { ResponseModule } from "../response/response.module";
import { PrintingHistoryController } from "./controller/printingHistory.controller";
import { PrintingHistoryService } from "./services/printingHistory.service";
import { HistoryProviders } from "./history.provider";


@Module({
    imports: [
        DatabaseModule,
        LoggerModule,
        ResponseModule
      ],
      controllers: [PrintingHistoryController],
      providers: [PrintingHistoryService, ...HistoryProviders]
})
export class HistoryModule {}