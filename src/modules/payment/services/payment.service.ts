import { Injectable } from '@nestjs/common';
import { Payment } from '../entities/payment.entity';
import { CreatePaymentDto } from '../dto/payment.dto';
import { ViewPaymentDto } from '../dto/payment.dto';

@Injectable()
export class PaymentService {

    async createPaymentTransaction(createPaymentDto: CreatePaymentDto): Promise<any> {
        try {    
          const paymentTransactionData = {
            ...createPaymentDto,
          };
          const newPaymentTransaction = await Payment.create(paymentTransactionData);
          return newPaymentTransaction;
        } catch (error) {
          throw new Error(`Failed to store payment transaction: ${error.message}`);
        }
      }
    
      // Retrieve a printing history entry by printing_id
      async getPaymentHistories(student_id: number): Promise<any> {
        try {
          const paymentHistories = await Payment.findAll({ where: { student_id: student_id } });
          if (!paymentHistories) {
            throw new Error(`Payment history of user's ID ${student_id} not found.`);
          }
          return paymentHistories;
        } catch (error) {
          throw new Error(`Failed to retrieve payment history: ${error.message}`);
        }
      }
}