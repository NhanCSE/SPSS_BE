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
import { User } from './user.entity';
// import { FOREIGNKEYS } from 'sequelize-typescript';


@Table
export class Admin extends Model<Admin> {

  @PrimaryKey
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  sso_id: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  last_login: Date;

}