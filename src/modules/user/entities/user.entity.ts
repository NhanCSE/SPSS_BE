
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
    HasOne,
} from 'sequelize-typescript';
import { UserRole } from 'src/common/contants';
import { Student } from './student.entity';
import { Admin } from './admin.entity';

@Table({
    tableName: "user"
})
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    ssoId: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    username: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    email: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    phone: string;

    @AllowNull(false)
    @Column({
        type: DataType.ENUM,
        values: [UserRole.ADMIN, UserRole.STUDENT]
    })
    role: UserRole;

    @HasOne(() => Student)
    student: Student

    @HasOne(() => Admin)
    admin: Admin
}