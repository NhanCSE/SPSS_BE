

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
  tableName: "general_paper_report"
})
export class GeneralPaperReport extends Model<GeneralPaperReport> {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  reportId: number;

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


