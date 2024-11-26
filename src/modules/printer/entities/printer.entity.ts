

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
import { Location } from './location.entity';

@Table({
  tableName: "printer"
})
export class Printer extends Model<Printer> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id: number;

  @Default(true)
  @Column(DataType.BOOLEAN)
  status: boolean;

  @Default(0)
  @Column(DataType.INTEGER)
  A3PaperCount: number;

  @Default(0)
  @Column(DataType.INTEGER)
  A4PaperCount: number;

  @Default(0)
  @Column(DataType.INTEGER)
  A5PaperCount: number;

  @ForeignKey(() => Location)
  @Column(DataType.INTEGER)
  locationId: number;

  @BelongsTo(() => Location)
  location: Location;

  @Column(DataType.STRING)
  brand: string;

  @Column(DataType.STRING)
  model: string;
}