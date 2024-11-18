import { IsString, IsUUID, IsInt, IsDate, Min, IsIn } from 'class-validator';
import { UUID } from 'crypto';

export class CreatePrintingHistoryDto {
  @IsUUID()
  student_id: UUID;

  @IsUUID()
  printer_id: UUID;

  @IsInt()
  @Min(1)
  copies: number;

  @IsUUID()
  file_id: UUID;

  @IsInt()
  @Min(1)
  page_print: number;

  @IsDate()
  date: Date;

  @IsString()
  @IsIn(['A4', 'A3', 'A5'], {
    message: 'Paper size must be one of the following: A4, A3, A5',
  })
  paper_size: string;
  
  @IsString()
  filenames: string;
}
