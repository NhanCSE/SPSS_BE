
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
  AutoIncrement,
} from 'sequelize-typescript';

@Table({
  tableName: "payment_report"
})
export class PaymentReport extends Model<PaymentReport> {
    @PrimaryKey
    @AutoIncrement
    @AllowNull(false)
    @Column(DataType.INTEGER)
    reportId: number;


    @AllowNull(false)
    @Column(DataType.DATE)
    reportDate: Date;


    @AllowNull(false)
    @Column(DataType.STRING)
    reportType: string;


    @Default(0)
    @Column(DataType.INTEGER)
    biggestPay: number;


    @Default(0)
    @Column(DataType.INTEGER)
    smallestPay: number;


    @Default(0)
    @Column(DataType.INTEGER)
    totalPay: number;


    @Column(DataType.DATE)
    peak: Date;
}