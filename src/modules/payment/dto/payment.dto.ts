import { IsString, IsUUID, IsInt, IsDate, Min, IsIn } from 'class-validator';
import { UUID } from 'crypto';

export class CreatePaymentDto {
  
    @IsUUID()
    transaction_id: UUID;

    @IsDate()
    date_time: Date;

    @IsInt()
    value: number;

    @IsInt()
    @Min(1)
    numberOfPages: number;

    student_id: number;
}

export class ViewPaymentDto {
    transaction_id: UUID;
    date_time: Date;
    value: number;
    numberOfPages: number;
    student_id: number;
}