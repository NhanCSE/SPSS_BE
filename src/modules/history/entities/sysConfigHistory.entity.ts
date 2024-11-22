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
import { SystemConfiguration } from 'src/modules/system/entities/configuration.entity';
import { Admin } from 'src/modules/user/entities/admin.entity';


@Table({
  tableName: "sys_config_history"
})
export class SysConfigHistory extends Model<SysConfigHistory> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  history_id: Number;

  @AllowNull(false)
  @ForeignKey(() => Admin)
  @Column(DataType.INTEGER)
  spso_id: number;

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
  @Column(DataType.INTEGER)
  version_id: number

  @BelongsTo(() => SystemConfiguration)
  configuration: SystemConfiguration;

}

