
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


@Table({
  tableName: "configuration"
})
export class SystemConfiguration extends Model<SystemConfiguration> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  versionId: Number;

  @Default(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date;
  })
  @Column(DataType.DATE)
  historyClearTime: Date;

  @Default([FileType.PDF])
  @Column({
    type: DataType.JSON
  })
  allowedFiles: FileType[];

  @Default(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date;
  })
  @Column(DataType.DATE)
  freePaperResetDate: Date;

  @Default(0)
  @Column(DataType.INTEGER)
  defaultFreePaper: number;

}

