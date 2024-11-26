import {
    IsOptional,
    IsString,
    IsInt,
    IsBoolean,
} from 'class-validator';
  
export class UpdatePrinterDto {
    @IsInt()
    id: number;
  
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