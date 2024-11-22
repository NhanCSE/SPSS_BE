import { IsString, IsInt, IsDate, Min, IsNumber } from 'class-validator';

export class SetFileDto {
    @IsString()
    filename: string;

    @IsString()
    type: string;

    @IsDate()
    timeUploaded: Date;

    @IsInt()
    size: number;

    @IsNumber()
    studentId: number;
}
