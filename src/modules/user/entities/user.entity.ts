
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

@Table
export class User extends Model<User> {
    @PrimaryKey
    @Default(UUIDV4)
    @AllowNull(false)
    @Column(DataType.UUID)
    sso_id: UUID;

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
}