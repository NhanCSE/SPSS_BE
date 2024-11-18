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
import { Printer } from './printer.entity';
import { ErrorHistory } from 'src/modules/history/entities/errorHistory.entity';


@Table
export class PrinterError extends Model<PrinterError> {
  @PrimaryKey
  @AllowNull(false)
  @ForeignKey(() => Printer)
  @Column(DataType.UUID)
  printer_id: UUID;

  @BelongsTo(() => Printer)
  printer: Printer;

  @PrimaryKey
  @AllowNull(false)
  @ForeignKey(() => ErrorHistory)
  @Column(DataType.UUID)
  Error_ID: UUID;

  @BelongsTo(() => ErrorHistory)
  error: ErrorHistory;
}