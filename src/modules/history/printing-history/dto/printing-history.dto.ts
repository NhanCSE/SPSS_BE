import { IsString, IsUUID, IsInt, IsDate, Min } from 'class-validator';
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
}
