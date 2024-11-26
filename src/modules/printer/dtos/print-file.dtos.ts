import { IsIn, IsInt, IsString, Min } from "class-validator";



export class PrintDataI {
    @IsInt()
    fileId: number

    @IsString()
    @IsIn(['A4', 'A3', 'A5'], {
        message: 'Paper size must be one of the following: A4, A3, A5',
    })
    pageSize: string; 

    @IsInt()
    @Min(1)
    copies: number;
}

export class PrintFileDto {
    printDataList: PrintDataI[]
}