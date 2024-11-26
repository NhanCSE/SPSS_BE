import { IsString, IsInt, IsDate, Min, IsNumber } from 'class-validator';
import { FileType } from 'src/common/contants';

export class SetFileDto {
    @IsString()
    filename: string;

    type: FileType;
    pageCount: number;

    @IsDate()
    timeUploaded: Date;

    @IsInt()
    size: number;

    @IsNumber()
    studentId: number;
}
