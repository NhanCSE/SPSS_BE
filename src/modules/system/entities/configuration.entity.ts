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
  AutoIncrement,
} from 'sequelize-typescript';


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

  @Default(['PDF'])
  @Column(DataType.JSON)
  allowedFiles: string[];

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

