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
  HasOne,
} from 'sequelize-typescript';
import { User } from './user.entity';
// import { FOREIGNKEYS } from 'sequelize-typescript';


@Table({
  tableName: "admin"
})
export class Admin extends Model<Admin> {

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  ssoId: number;

  @AllowNull(false)
  @Column(DataType.DATE)
  lastLogin: Date;

  @BelongsTo(() => User)
  user: User
}