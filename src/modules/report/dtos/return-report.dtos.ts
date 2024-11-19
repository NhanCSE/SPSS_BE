
export class ReturnGeneralPaymentReportDto{
    report_ID: string;
    report_date: Date;
    report_type: string;    // weekly, monthly or yearly
    content : string ;   
    biggest_pay: number;
    smallest_pay: number;
    total_pay:number;    
    peak : Date ;          // 
}

export class ReturnGeneralPaperReportDto{
    report_date: Date;
    report_type: string;
    content : string ; 
    A3_paper_count: number;
    A4_paper_count: number;
    A5_paper_count : number;
    total_paper_count: number;
    most_use_printer: string|null;
    peak: Date|null;
}

