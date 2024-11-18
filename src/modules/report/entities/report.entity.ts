
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


@Table({
  tableName: 'GeneralPaperReport', // Specify the exact table name
  freezeTableName: true, // Prevent Sequelize from pluralizing the table name
})
export class GeneralPaperReport extends Model<GeneralPaperReport> {
  @PrimaryKey
  @Default(UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  report_id: UUID;

  @AllowNull(false)
  @Column(DataType.DATE)
  report_date: Date;


  @AllowNull(false)
  @Column(DataType.STRING)
  report_type: string;


  @Default(0)
  @Column(DataType.INTEGER)
  A3_paper_count: number;

  @Default(0)
  @Column(DataType.INTEGER)
  A4_paper_count: number;

  @Default(0)
  @Column(DataType.INTEGER)
  A5_paper_count: number;

  @Column(DataType.STRING)
  most_use_printer: string;

  @Column(DataType.DATE)
  peak: Date;
}

@Table({
  tableName: 'PaymentReport', // Specify the exact table name
  freezeTableName: true, // Prevent Sequelize from pluralizing the table name
})
export class PaymentReport extends Model<PaymentReport> {
  @PrimaryKey
  @Default(UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  report_id: UUID;


  @AllowNull(false)
  @Column(DataType.DATE)
  report_date: Date;


  @AllowNull(false)
  @Column(DataType.STRING)
  report_type: string;


  @Default(0)
  @Column(DataType.INTEGER)
  biggest_pay: number;


  @Default(0)
  @Column(DataType.INTEGER)
  smallest_pay: number;


  @Default(0)
  @Column(DataType.INTEGER)
  total_pay: number;


  @Column(DataType.DATE)
  peak: Date;
}


