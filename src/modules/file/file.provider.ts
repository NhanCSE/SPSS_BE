import { File } from './entities/file.entity';
// import { PrintingConfigure } from './entities/printingconfigure.entity';
import { FILE_REPOSITORY} from 'src/common/contants';

export const FileProviders = [
  {
    provide: FILE_REPOSITORY,
    useValue: File,
  },
  // {
  //   provide: PRINTINGCONFIGURE_REPOSITORY,
  //   useValue: PrintingConfigure,
  // },
];
