// import { SystemConfiguration } from './system_configuration.entity';
import { Inject, Injectable } from '@nestjs/common';
import {
  SYSTEM_CONFIGURATION_REPOSITORY,
  SEQUELIZE,
} from 'src/common/contants';
// import { CreateSystemConfigDto } from './dtos/system_configuration.dtos';
// import { UpdateSystemConfigDto } from './dtos/system_configuration.dtos';
import { Sequelize, QueryTypes, where } from 'sequelize';
import { SystemConfiguration } from '../entities/configuration.entity';
import { CreateSystemConfigDto } from '../dtos/system_configuration.dtos';

@Injectable()
export class SystemConfigurationService {
  constructor(
    @Inject(SEQUELIZE) private readonly sequelize: typeof Sequelize,
    @Inject(SYSTEM_CONFIGURATION_REPOSITORY)
    private readonly systemConfigurationRepository: typeof SystemConfiguration,
  ) { }
  async create(createSystemConfigDto: CreateSystemConfigDto) {
    const systemConfig = await this.systemConfigurationRepository.create(
      createSystemConfigDto,
    );
    return systemConfig;
  }
  async searchAll() {
    const systemConfigs = await this.systemConfigurationRepository.findAll({
      order: [['updatedAt', 'DESC']],
    });
    return systemConfigs;
  }
  async searchNewest() {
    const systemConfig = await this.systemConfigurationRepository.findOne({
      order: [['updatedAt', 'DESC']],
    });
    return systemConfig;
  }
}
