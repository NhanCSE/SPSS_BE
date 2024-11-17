import {
    IsOptional,
    IsString,
    IsInt,
    IsUUID,
    IsDate,
    IsArray,
    ArrayNotEmpty,
  } from 'class-validator';
  
  export class CreateSystemConfigDto {
    @IsOptional()
    @IsDate()
    historyClearTime: Date;
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    allowFile: string[];
    @IsOptional()
    @IsDate()
    freePaperResetDate: Date;
    defaultPaper: number;
  }
  export class UpdateSystemConfigDto {
    @IsUUID()
    @IsString()
    versionId: string;
    @IsOptional()
    @IsDate()
    historyClearTime?: Date;
    @IsOptional()
    allowFile?: string[];
    @IsOptional()
    @IsDate()
    freePaperResetDate?: Date;
    @IsOptional()
    @IsInt()
    defaultPaper?: number;
  }
  