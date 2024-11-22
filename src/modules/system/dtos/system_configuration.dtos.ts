import {
    IsOptional,
    IsString,
    IsInt,
    IsUUID,
    IsDate,
    IsArray,
    ArrayNotEmpty,
    IsNumber,
  } from 'class-validator';
  
  export class CreateSystemConfigDto {
    @IsOptional()
    @IsDate()
    historyClearTime: Date;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    allowedFiles: string[];

    @IsOptional()
    @IsDate()
    freePaperResetDate: Date;

    
    @IsNumber()
    defaultPaper: number;
  }
  export class UpdateSystemConfigDto {
    @IsUUID()
    @IsString()
    versionId: string;

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
  