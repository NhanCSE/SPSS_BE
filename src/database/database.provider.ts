import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from "src/common/contants";
import { databaseConfig } from "./database.config";
import { Sequelize } from "sequelize-typescript";
import { Printer } from "src/modules/printer/entities/printer.entity";
import { Location } from "src/modules/printer/entities/location.entity";
import { ErrorHistory } from "src/modules/history/entities/errorHistory.entity";
import { PrintingHistory } from "src/modules/history/entities/printingHistory.entity";
import { SysConfigHistory } from "src/modules/history/entities/sysConfigHistory.entity";
import { PrinterError } from "src/modules/printer/entities/printerError.entity";
import { SystemConfiguration } from "src/modules/system/entities/configuration.entity";
import { Admin } from "src/modules/user/entities/admin.entity";
import { Student } from "src/modules/user/entities/student.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Payment } from "src/modules/payment/entities/payment.entity";
import { GeneralPaperReport } from "src/modules/report/entities/general-report.entity";
import { PaymentTrasaction } from "src/modules/report/entities/transaction.entity";
import { File } from "src/modules/file/entities/file.entity";


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

      // sequelize.addModels([PrinterError, Printer, Location, File, ErrorHistory, PrintingHistory, SysConfigHistory, Report, SystemConfiguration, Admin, Student, User, Payment]);
      sequelize.addModels([PrinterError, Printer, Location, Admin, Student, User, ErrorHistory, PrintingHistory, SysConfigHistory, SystemConfiguration, GeneralPaperReport, PaymentTrasaction, File]);
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
