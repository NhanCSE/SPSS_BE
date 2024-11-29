import { PAYMENT_REPOSITORY, STUDENT_REPOSITORY } from "src/common/contants";
import { Payment } from "./entities/payment.entity";
import { Student } from "../user/entities/student.entity";

export const PaymentProviders = [{
  provide: PAYMENT_REPOSITORY,
  useValue: Payment
}, {
  provide: STUDENT_REPOSITORY,
  useValue: Student
}]