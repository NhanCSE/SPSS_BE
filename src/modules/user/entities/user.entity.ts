
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
    AutoIncrement,
} from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    sso_id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    password: String;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    username: String;

    @AllowNull(false)
    @Column(DataType.STRING)
    email: String;

    @AllowNull(false)
    @Column(DataType.STRING)
    phone: String;
<<<<<<< HEAD
=======

    @AllowNull(false)
    @Column(DataType.STRING)
    role: string;
>>>>>>> 3f6b5ee05da61fc6596ae17f03ededcb63b7c6e3
}