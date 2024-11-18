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
// import { FOREIGNKEYS } from 'sequelize-typescript';

enum FileType {

}


@Table
export class File extends Model<File> {
  @PrimaryKey
  @Default(UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  file_id: UUID;

  @AllowNull(false)
  @Column(DataType.STRING)
  filenames: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  type: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  time_uploaded: Date;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  size: number;

  @AllowNull(false)
  @ForeignKey(() => Student)
  @Column(DataType.INTEGER)
  student_id: number;

  @BelongsTo(() => Student)
  student: Student;

}

