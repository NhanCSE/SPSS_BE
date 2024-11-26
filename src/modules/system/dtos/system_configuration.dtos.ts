import {
    IsOptional,
    IsString,
    IsInt,
    IsDate,
    IsArray,
    ArrayNotEmpty,
    IsNumber,
  } from 'class-validator';
import { FileType } from 'src/common/contants';
  
  export class CreateSystemConfigDto {
    @IsOptional()
    @IsDate()
    historyClearTime: Date;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    allowedFiles: FileType[];

    @IsOptional()
    @IsDate()
    freePaperResetDate: Date;

    
    @IsNumber()
    defaultFreePaper: number;
  }
  export class UpdateSystemConfigDto {
    @IsInt()
    versionId: number;

    @IsOptional()
    @IsDate()
    historyClearTime: Date;

    @IsOptional()
    allowedFiles: string[];

    @IsOptional()
    @IsDate()
    freePaperResetDate: Date;

    @IsOptional()
    @IsInt()
    defaultPaper: number;
  }
  