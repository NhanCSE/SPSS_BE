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


@Table
export class PrintingHistory extends Model<PrintingHistory> {
  @PrimaryKey
  @Default(UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  printing_id: UUID;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  student_id: number;

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
  file_id: UUID;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  page_print: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  filenames: string

  @AllowNull(false)
  @Column(DataType.DATE)
  date: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  page_size: string;

}