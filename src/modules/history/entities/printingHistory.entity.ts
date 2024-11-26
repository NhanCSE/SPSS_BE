
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
import { Printer } from '../../printer/entities/printer.entity';
// import { FOREIGNKEYS } from 'sequelize-typescript';


@Table({
  tableName: "printing_history"
})
export class PrintingHistory extends Model<PrintingHistory> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  printingId: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  studentId: number;

  @AllowNull(false)
  @ForeignKey(() => Printer)
  @Column(DataType.INTEGER)
  printerId: number;

  @BelongsTo(() => Printer)
  printer: Printer;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  copies: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  fileId: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  pagePrint: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  filename: string

  @AllowNull(false)
  @Column(DataType.DATE)
  date: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  pageSize: string;

}