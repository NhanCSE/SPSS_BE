
export class ReturnGeneralPaymentReportDto{
    reportId: string;
    reportDate: Date;
    reportType: string;    // weekly, monthly or yearly
    content : string ;   
    biggestPay: number;
    smallestPay: number;
    totalPay:number;    
    peak : Date ;          // 
}

export class ReturnGeneralPaperReportDto{
    reportDate: Date;
    reportType: string;
    content : string ; 
    A3PaperCount: number;
    A4PaperCount: number;
    A5PaperCount : number;
    total_paper_count: number;
    mostUsePrinter: string|null;
    peak: Date|null;
}

