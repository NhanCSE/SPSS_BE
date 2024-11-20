import { DatabaseModule } from "src/database/database.module";
import { Module } from "@nestjs/common";
import {  ReportController } from "./controllers/report.controller";
import { LoggerModule } from "src/common/logger/logger.module";
import { ResponseModule } from "../response/response.module";
import { reportProviders } from "./report.provider";
import { ReportService } from "./services/report.service";
import { ScheduleModule } from "@nestjs/schedule";


@Module({
    imports: [
        DatabaseModule,
        LoggerModule,
        ResponseModule,
        ScheduleModule.forRoot()
    ],
    controllers: [ReportController],
    providers: [...reportProviders,ReportService],
})
export class ReportModule {}