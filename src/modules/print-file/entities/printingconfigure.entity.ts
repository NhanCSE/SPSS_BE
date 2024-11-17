import { Column, Model, PrimaryKey, Table, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { FileInfo } from './fileInfo.entity';

export enum PaperType {
  A3 = 'A3',
  A4 = 'A4',
  A5 = 'A5',
}

export enum PaperSize {
  Portrait = 'portrait',
  Landscape = 'landscape',
}

export enum PaperStyle {
  OnePage = 'onePage',
  TwoPage = 'twoPage',
}

@Table({ tableName: 'printing_configure' })
export class PrintingConfigure extends Model<PrintingConfigure> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  configID: string;

  @ForeignKey(() => FileInfo)
  @Column({ type: DataType.UUID })
  fileID: string;

  @BelongsTo(() => FileInfo)
  fileInfo: FileInfo;

  @Column({ type: DataType.ENUM, values: Object.values(PaperType) })
  paperType: PaperType;

  @Column({ type: DataType.ENUM, values: Object.values(PaperSize) })
  paperSize: PaperSize;

  @Column({ type: DataType.ENUM, values: Object.values(PaperStyle) })
  paperStyle: PaperStyle;

  @Column({ type: DataType.INTEGER })
  numOfCopy: number;

  @Column({ type: DataType.INTEGER })
  numOfPage: number;
}
