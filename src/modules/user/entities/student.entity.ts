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
import { User } from './user.entity';


@Table
export class Student extends Model<Student> {

    @PrimaryKey
    @AllowNull(false)
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    sso_id: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    bought_paper: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    current_free_paper: number;

}