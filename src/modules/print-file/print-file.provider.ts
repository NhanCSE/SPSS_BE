import { FileInfo } from './entities/fileInfo.entity';
import { PrintingConfigure } from './entities/printingconfigure.entity';
import { FILEINFO_REPOSITORY, PRINTINGCONFIGURE_REPOSITORY } from 'src/common/contants';

export const printFileProviders = [
  {
    provide: FILEINFO_REPOSITORY,
    useValue: FileInfo,
  },
  {
    provide: PRINTINGCONFIGURE_REPOSITORY,
    useValue: PrintingConfigure,
  },
];
