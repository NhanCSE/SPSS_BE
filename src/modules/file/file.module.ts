import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/common/logger/logger.module';
import { DatabaseModule } from 'src/database/database.module';
import { ResponseModule } from '../response/response.module';
import { FileController } from './controllers/file.controller';
import { FileProviders } from './file.provider';
import { FileService } from './services/file.service';
import { PrintingHistoryService } from '../history/services/printingHistory.service';

@Module({
    imports: [
        DatabaseModule,
        LoggerModule,
        ResponseModule
    ],
    controllers: [FileController],
    providers: [...FileProviders, FileService, PrintingHistoryService],
    exports: [FileService]
})
export class FileModule {}
