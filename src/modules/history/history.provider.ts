import { PRINTING_HISTORY_REPOSITORY, ERROR_HISTORY_REPOSITORY, SYS_CONFIG_HISTORY_REPOSITORY } from "src/common/contants";
// import { PrintingHistory } from "./entities/printingHistory.entity";
import { PrintingHistory } from "./entities/printingHistory.entity";
import { ErrorHistory } from "./entities/errorHistory.entity";
import { SysConfigHistory } from "./entities/sysConfigHistory.entity";


export const HistoryProviders = [{
    provide: PRINTING_HISTORY_REPOSITORY,
    useValue: PrintingHistory
  },
  {
    provide: ERROR_HISTORY_REPOSITORY,
    useValue: ErrorHistory
  },
  {
    provide: SYS_CONFIG_HISTORY_REPOSITORY,
    useValue: SysConfigHistory
  }]