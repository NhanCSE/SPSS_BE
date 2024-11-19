import { LOCATION_REPOSITORY, PAPER_REPORT_REPOSITORY, PAYMENT_REPORT_REPOSITORY, PRINTER_REPOSITORY, PRINTING_HISTORY_REPOSITORY, TRANSACTION_REPOSITORY } from "src/common/contants";
// import { PrintingHistory } from "./entities/printingHistory.entity";
import { Payment_Trasaction } from "./entities/transaction.entity";
import { GeneralPaperReport, PaymentReport } from "./entities/report.entity";
import { PrintingHistory } from "../history/entities/printingHistory.entity";


export const reportProviders = [{
    provide: PRINTING_HISTORY_REPOSITORY,
    useValue: PrintingHistory,
}, {
    provide: TRANSACTION_REPOSITORY,
    useValue: Payment_Trasaction,
}, {
    provide: PAPER_REPORT_REPOSITORY,
    useValue: GeneralPaperReport,
}, {
    provide: PAYMENT_REPORT_REPOSITORY,
    useValue: PaymentReport,
}]

