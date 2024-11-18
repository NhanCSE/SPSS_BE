import { IsUUID, IsString, IsInt, IsDate } from 'class-validator';
import { UUID } from 'crypto';

export class SetFileDto {
    @IsString()
    filenames: string;

    @IsString()
    type: string;

    @IsDate()
    time_uploaded: Date;

    @IsInt()
    size: number;

    @IsUUID()
    student_id: UUID;
}
