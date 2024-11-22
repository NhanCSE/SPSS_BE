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
import { Location } from './location.entity';

@Table({
  tableName: "printer"
})
export class Printer extends Model<Printer> {
  @PrimaryKey
  @Default(UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  id: UUID;

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
  @Column(DataType.UUID)
  locationId: UUID;

  @BelongsTo(() => Location)
  location: Location;

  @Column(DataType.STRING)
  brand: string;

  @Column(DataType.STRING)
  model: string;
}