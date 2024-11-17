import { IsOptional, IsInt, IsUUID } from 'class-validator';

export class UpdatePaperAfterPrintingDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsInt()
  A3PaperCount?: number;

  @IsOptional()
  @IsInt()
  A4PaperCount?: number;

  @IsOptional()
  @IsInt()
  A5PaperCount?: number;
}
