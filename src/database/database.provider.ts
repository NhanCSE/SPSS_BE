import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from "src/common/contants";
import { databaseConfig } from "./database.config";
import { Sequelize } from "sequelize-typescript";
import { Printer } from "src/modules/printer/entities/printer.entity";
import { Location } from "src/modules/printer/entities/location.entity";
import { FileInfo } from "src/modules/print-file/entities/fileInfo.entity";
import { PrintingConfigure } from "src/modules/print-file/entities/printingconfigure.entity";


export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([Printer, Location, FileInfo, PrintingConfigure]);
      await sequelize.sync();

      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully');
        await sequelize.sync();
        console.log('Database synchronized successfully');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
      
      return sequelize;
    },
  },
];
