import { IsUUID, IsString, IsInt, IsDate, Min } from 'class-validator';
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
    student_id: number;
}
// export class SetFileDto {
//     @IsUUID()
//     student_id: string;

//     @IsUUID()
//     printer_id: string;

//     @IsInt()
//     @Min(1)
//     copies: number;

//     @IsUUID()
//     file_id: string;

//     @IsInt()
//     @Min(1)
//     page_print: number;

//     @IsDate()
//     date: Date;
// }