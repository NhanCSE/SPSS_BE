import {
  IsOptional,
  IsString,
  IsInt,
  IsUUID,
  IsBoolean,
} from 'class-validator';

export class UpdatePrinterDto {
  @IsUUID()
  id: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsInt()
  A3PaperCount?: number;

  @IsOptional()
  @IsInt()
  A4PaperCount?: number;

  @IsOptional()
  @IsInt()
  A5PaperCount?: number;

  @IsOptional()
  @IsString()
  building?: string;

  @IsOptional()
  @IsInt()
  floor?: number;

  @IsOptional()
  @IsInt()
  room?: number;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  model?: string;
}
