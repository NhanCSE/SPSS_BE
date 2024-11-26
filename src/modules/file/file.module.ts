import { forwardRef, Module } from '@nestjs/common';
import { LoggerModule } from 'src/common/logger/logger.module';
import { DatabaseModule } from 'src/database/database.module';
import { ResponseModule } from '../response/response.module';
import { FileController } from './controllers/file.controller';
import { FileProviders } from './file.provider';
import { FileService } from './services/file.service';
import { PrintingHistoryService } from '../history/services/printingHistory.service';
import { historyProvider } from '../history/history.provider';
import { printerProviders } from '../printer/printer.provider';
import { PrinterService } from '../printer/services/printer.service';
import { SystemProvider } from '../system/system.provider';
import { SystemConfigurationService } from '../system/services/system.service';
import { UserModule } from '../user/user.module';
import { AuthService } from '../user/services/auth.service';

@Module({
    imports: [
        DatabaseModule,
        LoggerModule,
        ResponseModule,
        UserModule
    ],
    controllers: [FileController],
    providers: [...FileProviders, FileService, ...SystemProvider, SystemConfigurationService],
    exports: [FileService]
})
export class FileModule {}
