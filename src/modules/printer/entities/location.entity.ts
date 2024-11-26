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
  tableName: "location"
})
export class Location extends Model<Location> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id: number;

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