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
import { File } from 'src/modules/file/entities/file.entity';


@Table
export class Report extends Model<Report> {

  @PrimaryKey
  @Default(UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  report_id: UUID;

  @AllowNull(false)
  @Column(DataType.STRING)
  report_date: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  content: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  report_type: Date;

  @AllowNull(false)
  @ForeignKey(() => File)
  @Column(DataType.UUID)
  file_id: UUID;

  @BelongsTo(() => File)
  file: File;

}

