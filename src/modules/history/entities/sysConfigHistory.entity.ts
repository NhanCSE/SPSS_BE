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
import { SystemConfiguration } from '../../system/entities/configuration.entity';
import { Admin } from '../../user/entities/admin.entity';


@Table
export class SysConfigHistory extends Model<SysConfigHistory> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  history_id: Number;

  @AllowNull(false)
  @ForeignKey(() => Admin)
  @Column(DataType.UUID)
  SPSO_ID: UUID;

  @BelongsTo(() => Admin)
  admin: Admin;

  @AllowNull(false)
  @Column(DataType.DATE)
  configTime: Date;

  @AllowNull(false)
  @Column(DataType.STRING)
  changesField: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  comment: string;

  @AllowNull(false)
  @ForeignKey(() => SystemConfiguration)
  @Column(DataType.NUMBER)
  version_id: number

  @BelongsTo(() => SystemConfiguration)
  configuration: SystemConfiguration;

}