
import { UUID } from 'crypto';
import { UUIDV4 } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  HasMany,
  Unique,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Student } from 'src/modules/user/entities/student.entity';


@Table({
  tableName: "transaction"
})
export class PaymentTrasaction extends Model<PaymentTrasaction> {
  @PrimaryKey
  @Default(UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  transactionId: UUID;

  @AllowNull(false)
  @ForeignKey(() => Student)
  @Column(DataType.INTEGER)
  studentId: number;

  @BelongsTo(() => Student)
  student: Student;

  @AllowNull(false)
  @Column(DataType.DATE)
  dateTime: Date;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  value: number;


  @AllowNull(false)
  @Column(DataType.INTEGER)
  numberOfPage: number;
}