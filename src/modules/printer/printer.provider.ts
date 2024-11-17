import {
  LOCATION_REPOSITORY,
  PRINTER_REPOSITORY,
  SEQUELIZE,
} from 'src/common/contants';
import { Printer } from './entities/printer.entity';
import { Location } from './entities/location.entity';
import { Sequelize } from 'sequelize-typescript';

export const printerProviders = [
  {
    provide: PRINTER_REPOSITORY,
    useValue: Printer,
  },
  {
    provide: LOCATION_REPOSITORY,
    useValue: Location,
  },
  {
    provide: SEQUELIZE,
    useValue: Sequelize,
  },
];
