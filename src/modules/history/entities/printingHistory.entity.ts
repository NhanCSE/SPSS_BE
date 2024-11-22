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
import { Printer } from '../../printer/entities/printer.entity';
// import { FOREIGNKEYS } from 'sequelize-typescript';


@Table({
  tableName: "printing_history"
})
export class PrintingHistory extends Model<PrintingHistory> {
  @PrimaryKey
  @Default(UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  printingId: UUID;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  studentId: number;

  @AllowNull(false)
  @ForeignKey(() => Printer)
  @Column(DataType.UUID)
  printer_id: UUID;

  @BelongsTo(() => Printer)
  printer: Printer;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  copies: number;

  @AllowNull(false)
  @Column(DataType.UUID)
  fileId: UUID;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  page_print: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  filename: string

  @AllowNull(false)
  @Column(DataType.DATE)
  date: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  page_size: string;

}