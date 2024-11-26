import { IsOptional, IsInt } from 'class-validator';

export class UpdatePaperAfterPrintingDto {
  @IsInt()
  id: number;

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