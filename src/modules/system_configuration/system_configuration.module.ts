import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SystemConfigurationService } from './system_configuration.service';
import { SystemConfigurationController } from './system_configuration.controller';
import { SystemConfigurationProviders } from './system_configuration.provider';
import { LoggerModule } from 'src/common/logger/logger.module';
import { ResponseModule } from '../response/response.module';

@Module({
    imports: [DatabaseModule, LoggerModule, ResponseModule],
    controllers: [SystemConfigurationController],
    providers: [...SystemConfigurationProviders, SystemConfigurationService],
  })
export class SystemConfigurationModule {}
