

import { IsString, IsInt, IsDate, Min, IsIn } from 'class-validator';

export class UploadFileDto {


  @IsInt()
  printerId: number;

  @IsInt()
  @Min(1)
  copies: number;

  @IsInt()
  fileId: number;

  @IsDate()
  date: Date;

  @IsString()
  @IsIn(['A4', 'A3', 'A5'], {
    message: 'Paper size must be one of the following: A4, A3, A5',
  })
  pageSize: string;

  @IsString()
  filename: string;
}
