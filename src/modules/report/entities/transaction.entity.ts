
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
  tableName: 'Payment_Trasaction', // Specify the exact table name
  freezeTableName: true, // Prevent Sequelize from pluralizing the table name
})
export class Payment_Trasaction extends Model<Payment_Trasaction> {
  @PrimaryKey
  @Default(UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  transaction_id: UUID;

  @AllowNull(false)
  @ForeignKey(() => Student)
  @Column(DataType.INTEGER)
  student_id: number;

  @BelongsTo(() => Student)
  student: Student;

  @AllowNull(false)
  @Column(DataType.DATE)
  Date_time: Date;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  value: number;


  @AllowNull(false)
  @Column(DataType.INTEGER)
  number_of_page: number;
}