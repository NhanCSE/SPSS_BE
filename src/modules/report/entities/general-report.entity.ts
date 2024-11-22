
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


@Table({
  tableName: "general_paper_report"
})
export class GeneralPaperReport extends Model<GeneralPaperReport> {
  @PrimaryKey
  @Default(UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  reportId: UUID;

  @AllowNull(false)
  @Column(DataType.DATE)
  reportDate: Date;


  @AllowNull(false)
  @Column(DataType.STRING)
  reportType: string;


  @Default(0)
  @Column(DataType.INTEGER)
  A3PaperCount: number;

  @Default(0)
  @Column(DataType.INTEGER)
  A4PaperCount: number;

  @Default(0)
  @Column(DataType.INTEGER)
  A5PaperCount: number;

  //Note 1
  @Column(DataType.STRING)
  mostUsePrinter: string;

  @Column(DataType.DATE)
  peak: Date;
}


