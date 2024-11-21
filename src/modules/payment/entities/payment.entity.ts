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
  @Default(UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  transaction_id: UUID;

  @AllowNull(false)
  @Column(DataType.DATE)
  date_time: Date;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  value: Number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  numberOfPages: number;

  @AllowNull(false)
  @ForeignKey(() => Student)
  @Column(DataType.UUID)
  student_id: UUID;

  @BelongsTo(() => Student)
  student: Student;

}