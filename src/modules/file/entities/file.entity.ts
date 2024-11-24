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

enum FileType {

}


@Table({
  tableName: "file"
})
export class File extends Model<File> {
  @PrimaryKey
  @Default(UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  fileId: UUID;

  @AllowNull(false)
  @Column(DataType.STRING)
  filename: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  type: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  timeUploaded: Date;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  size: number;

  @AllowNull(false)
  @ForeignKey(() => Student)
  @Column(DataType.INTEGER)
  studentId: number;

  @BelongsTo(() => Student)
  student: Student;

}

