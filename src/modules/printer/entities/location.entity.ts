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
export class Location extends Model<Location> {
  @PrimaryKey
  @Default(UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  id: UUID;

  @AllowNull(false)
  @Column(DataType.STRING)
  building: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  floor: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  room: number;
}
