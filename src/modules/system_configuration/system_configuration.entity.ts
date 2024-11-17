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
} from 'sequelize-typescript';

@Table
export class SystemConfiguration extends Model<SystemConfiguration> {
    @PrimaryKey
    @Default(UUIDV4) 
    @AllowNull(false)
    @Column(DataType.UUID)
    versionId: UUID; 
  
    @Default(() => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1); 
        return date;
    })
    @Column(DataType.DATE)
    historyClearTime: Date;
  
    @Default(['PDF'])
    @Column(DataType.JSON)
    allowFile: string[]; 
  
    @Default(() => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1); 
        return date;
    })
    @Column(DataType.DATE)
    freePaperResetDate: Date;
  
    @Default(0)
    @Column(DataType.INTEGER)
    defaultFreePaper: number;
  }