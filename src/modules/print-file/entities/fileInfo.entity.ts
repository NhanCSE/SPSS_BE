import { Column, Model, PrimaryKey, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'file_info' })
export class FileInfo extends Model<FileInfo> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  fileID: string;

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  timeUploaded: Date;

  @Column({ type: DataType.STRING(255) })
  name: string;

  @Column({ type: DataType.STRING(100) })
  type: string;

  @Column({ type: DataType.FLOAT })
  size: number;

  @Column({ type: DataType.BLOB('long') })
  fileData: Buffer;
}
