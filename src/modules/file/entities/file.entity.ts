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
import { FileType } from 'src/common/contants';
import { Student } from 'src/modules/user/entities/student.entity';


@Table({
  tableName: "file"
})
export class File extends Model<File> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  fileId: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  filename: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM,
    values: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf']
  })  
  type: FileType;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  pageCount: number;

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

