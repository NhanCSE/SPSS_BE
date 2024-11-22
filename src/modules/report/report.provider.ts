import { LOCATION_REPOSITORY, PAPER_REPORT_REPOSITORY, PAYMENT_REPORT_REPOSITORY, PRINTER_REPOSITORY, PRINTING_HISTORY_REPOSITORY, TRANSACTION_REPOSITORY } from "src/common/contants";
// import { PrintingHistory } from "./entities/printingHistory.entity";
import { PaymentTrasaction } from "./entities/transaction.entity";
import { GeneralPaperReport } from "./entities/general-report.entity";
import { PrintingHistory } from "../history/entities/printingHistory.entity";
import { PaymentReport } from "./entities/payment-report.entity";


export const reportProviders = [{
    provide: PRINTING_HISTORY_REPOSITORY,
    useValue: PrintingHistory,
}, {
    provide: TRANSACTION_REPOSITORY,
    useValue: PaymentTrasaction,
}, {
    provide: PAPER_REPORT_REPOSITORY,
    useValue: GeneralPaperReport,
}, {
    provide: PAYMENT_REPORT_REPOSITORY,
    useValue: PaymentReport,
}]

