
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
    HasOne,
} from 'sequelize-typescript';
import { User } from './user.entity';


@Table({
    tableName: "student"
})
export class Student extends Model<Student> {

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    ssoId: number;

    @Default(0)
    @Column(DataType.INTEGER)
    boughtPaper: number;

    @Default(0)
    @Column(DataType.INTEGER)
    currentFreePaper: number;

    @BelongsTo(() => User)
    user: User
}