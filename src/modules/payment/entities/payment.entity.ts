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


@Table({
  tableName: "payment"
})
export class Payment extends Model<Payment> {
  @PrimaryKey
  @Default(UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  transactionId: UUID;

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
  @Column(DataType.UUID)
  studentId: UUID;

  @BelongsTo(() => Student)
  student: Student;

}

