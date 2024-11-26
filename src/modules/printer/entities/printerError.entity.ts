
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
import { Printer } from './printer.entity';
import { ErrorHistory } from 'src/modules/history/entities/errorHistory.entity';


@Table({
  tableName: "printer_error"
})
export class PrinterError extends Model<PrinterError> {
  @PrimaryKey
  @AllowNull(false)
  @ForeignKey(() => Printer)
  @Column(DataType.INTEGER)
  printerId: number;

  @BelongsTo(() => Printer)
  printer: Printer;

  @PrimaryKey
  @AllowNull(false)
  @ForeignKey(() => ErrorHistory)
  @Column(DataType.INTEGER)
  errorId: number;

  @BelongsTo(() => ErrorHistory)
  error: ErrorHistory;
}