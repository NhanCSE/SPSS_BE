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
export class ErrorHistory extends Model<History> {
  @PrimaryKey
  @Default(UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  error_id: UUID;

  @AllowNull(false)
  @Column(DataType.UUID)
  student_id: UUID;

  @AllowNull(false)
  @ForeignKey(() => Printer)
  @Column(DataType.UUID)
  printer_id: UUID;

  @BelongsTo(() => Printer)
  printer: Printer;

  @AllowNull(false)
  @Column(DataType.DATE)
  timeOccured: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  errorType: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  content: string;



}