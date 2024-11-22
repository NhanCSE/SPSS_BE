import { TRANSACTION_REPOSITORY } from "src/common/contants";
// import { PrintingHistory } from "./entities/printingHistory.entity";
import { Payment } from "./entities/payment.entity";


export const PaymentProviders = [{
    provide: TRANSACTION_REPOSITORY,
    useValue: Payment,
}]