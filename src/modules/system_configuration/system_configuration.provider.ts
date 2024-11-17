import {
    SYSTEM_CONFIGURATION_REPOSITORY,
    SEQUELIZE,
  } from 'src/common/contants';
import { SystemConfiguration } from './system_configuration.entity';
import { Sequelize } from 'sequelize-typescript';
  
  export const SystemConfigurationProviders = [
    {
      provide: SYSTEM_CONFIGURATION_REPOSITORY,
      useValue: SystemConfiguration,
    },
    {
      provide: SEQUELIZE,
      useValue: Sequelize,
    },
  ];        