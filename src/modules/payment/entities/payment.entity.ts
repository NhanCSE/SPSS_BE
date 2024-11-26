
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
import { Student } from 'src/modules/user/entities/student.entity';


@Table({
  tableName: "payment"
})
export class Payment extends Model<Payment> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  transactionId: number;

  @AllowNull(false)
  @Column(DataType.DATE)
  dateTime: Date;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  value: Number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  numberOfPages: number;

  @AllowNull(false)
  @ForeignKey(() => Student)
  @Column(DataType.INTEGER)
  studentId: number;

  @BelongsTo(() => Student)
  student: Student;

}

