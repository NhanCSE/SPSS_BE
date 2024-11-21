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

@Table
export class SystemConfiguration extends Model<SystemConfiguration> {

  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.INTEGER)
  versionID: Number;

  @AllowNull(false)
  @Column(DataType.DATE)
  historyClearTime: Date;

  @AllowNull(false)
  @Column(DataType.ARRAY(DataType.STRING))
  allowedFile: string[];

  @AllowNull(false)
  @Column(DataType.DATE)
  freePaperResetDate: Date;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  defaultFreePapers: Number;
  
}