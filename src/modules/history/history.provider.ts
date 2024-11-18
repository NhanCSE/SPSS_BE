import { ERROR_HISTORY_REPOSITORY, PRINTING_HISTORY_REPOSITORY, SYS_CONFIG_HISTORY_REPOSITORY } from "src/common/contants";
import { ErrorHistory } from "./entities/errorHistory.entity";
import { PrintingHistory } from "./entities/printingHistory.entity";
import { SysConfigHistory } from "./entities/sysConfigHistory.entity";

export const HistoryProvider = [
  {
    provide: ERROR_HISTORY_REPOSITORY,
    useValue: ErrorHistory
  },
  {
    provide: PRINTING_HISTORY_REPOSITORY,
    useValue: PrintingHistory
  },
  {
    provide: SYS_CONFIG_HISTORY_REPOSITORY,
    useValue: SysConfigHistory
  }
]