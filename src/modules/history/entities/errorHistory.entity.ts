
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
  tableName: "error_history"
})
export class ErrorHistory extends Model<History> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  errorId: number;

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
  @Column(DataType.DATE)
  timeOccured: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  errorType: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  content: string;



}