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


@Table
export class Payment extends Model<Payment> {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING)
  transactionId: String;

  @AllowNull(false)
  @Column(DataType.DATE)
  dateTime: Date;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  value: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  numberOfPages: number;

  @AllowNull(false)
  @ForeignKey(() => Student)
  @Column(DataType.INTEGER)
  studentId: number;

  @BelongsTo(() => Student)
  student: Student;


  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  status: boolean
}
