import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { LOCATION_REPOSITORY, PAPER_REPORT_REPOSITORY, PAYMENT_REPORT_REPOSITORY, PRINTER_REPOSITORY, PRINTING_HISTORY_REPOSITORY, TRANSACTION_REPOSITORY } from "src/common/contants";
import { GeneralPaperReport, PaymentReport } from "../entities/report.entity";
import { Payment_Trasaction } from "../entities/transaction.entity";
// import { PrintingHistory } from "../entities/printingHistory.entity";
import { CreateReportDto } from "../dtos/create-report.dtos";
import { Op } from "sequelize";
import { ViewReportDto } from "../dtos/view-report.dtos";
import { PrintingHistory } from "src/modules/history/entities/printingHistory.entity";
import { Cron, CronExpression } from "@nestjs/schedule";
@Injectable()
export class ReportService {
  constructor(
    @Inject(PRINTING_HISTORY_REPOSITORY) private readonly printingHistoryRepository: typeof PrintingHistory,
    @Inject(TRANSACTION_REPOSITORY) private readonly paymentRepository: typeof Payment_Trasaction,
    @Inject(PAPER_REPORT_REPOSITORY) private readonly generalPaperReportRepository: typeof GeneralPaperReport,
    @Inject(PAYMENT_REPORT_REPOSITORY) private readonly paymentReportRepository: typeof PaymentReport,
  ) { };
  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async createMonthlyPaperReport() {
    const CreateReport= new createReport(
      this.printingHistoryRepository,
      this.paymentRepository,
      this.generalPaperReportRepository,
      this.paymentReportRepository,
    )
    const payload: CreateReportDto = {
      content: 'paper',
     reportDate:new Date().toISOString(),
     reportType:"monthly",
    };
    await CreateReport.create(payload);

  }
  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async createMonthlyPaymentReport() {
    const CreateReport= new createReport(
      this.printingHistoryRepository,
      this.paymentRepository,
      this.generalPaperReportRepository,
      this.paymentReportRepository,
    )
    const payload: CreateReportDto = {
      content: 'payment',
     reportDate:new Date().toISOString(),
     reportType:"monthly",
    };
    await CreateReport.create(payload);

  }
  @Cron(CronExpression.EVERY_YEAR)
  async createYearlyPaperReport() {
    const CreateReport= new createReport(
      this.printingHistoryRepository,
      this.paymentRepository,
      this.generalPaperReportRepository,
      this.paymentReportRepository,
    )
    const payload: CreateReportDto = {
      content: 'paper',
      reportDate:new Date().toISOString(),
      reportType:"yearly",
    };
    await CreateReport.create(payload);
  }
  @Cron(CronExpression.EVERY_YEAR)
  async createYearlyPaymentReport() {
    const CreateReport= new createReport(
      this.printingHistoryRepository,
      this.paymentRepository,
      this.generalPaperReportRepository,
      this.paymentReportRepository,
    )
    const payload: CreateReportDto = {
      content: 'payment',
      reportDate:new Date().toISOString(),
      reportType:"yearly",
    };
    await CreateReport.create(payload);
  }
  


  async view(payload: ViewReportDto) {
    const content = payload.content.toLowerCase();
    const type = payload.reportType.toLowerCase();
    const reportDate = new Date(payload.reportDate);
    let report;

    if (content === "paper") {
      if (type === "monthly") {
        report = await this.generalPaperReportRepository.findOne({
          where: {
            report_type: type,
            [Op.and]: [
              { report_date: { [Op.gte]: new Date(reportDate.getFullYear(), reportDate.getMonth(), 1) } },
              { report_date: { [Op.lt]: new Date(reportDate.getFullYear(), reportDate.getMonth() + 1, 1) } }
            ]
          },
        });
      } else if (type === "yearly") {
        report = await this.generalPaperReportRepository.findOne(
        {
          where: {
            report_type: type,
            [Op.and]: [
              { report_date: { [Op.gte]: new Date(reportDate.getFullYear(), 0, 1) } },
              { report_date: { [Op.lt]: new Date(reportDate.getFullYear() + 1, 0, 1) } }
            ]
          },
        });
      } else {
        throw new BadRequestException(" wrong type, type must be monthly or yearly");
      }
    } else if (content === "payment") {
      if (type === "monthly") {
        report = await this.paymentReportRepository.findOne({
          where: {
            report_type: type,
            [Op.and]: [
              { report_date: { [Op.gte]: new Date(reportDate.getFullYear(), reportDate.getMonth(), 1) } },
              { report_date: { [Op.lt]: new Date(reportDate.getFullYear(), reportDate.getMonth() + 1, 1) } }
            ]
          },
        });
      } else if (type === "yearly") {
        report = await this.paymentReportRepository.findOne({
          where: {
            report_type: type,
            [Op.and]: [
              { report_date: { [Op.gte]: new Date(reportDate.getFullYear(), 0, 1) } },
              { report_date: { [Op.lt]: new Date(reportDate.getFullYear() + 1, 0, 1) } }
            ]
          },
        });
      } else {
        report = await this.paymentReportRepository.findOne({
          where: {
            report_type: type,
            report_date: reportDate,
          },
        });
      }
    } else {
      throw new Error(`Unsupported content type for report: ${payload.content}`);
    }

    if (!report) {
      throw new Error(`Report not available. You must wait until the end of the ${type} to get the report.`);
    }

    return report;
  }

}

class createReport{
  constructor(
    @Inject(PRINTING_HISTORY_REPOSITORY) private readonly printingHistoryRepository: typeof PrintingHistory,
    @Inject(TRANSACTION_REPOSITORY) private readonly paymentRepository: typeof Payment_Trasaction,
    @Inject(PAPER_REPORT_REPOSITORY) private readonly generalPaperReportRepository: typeof GeneralPaperReport,
    @Inject(PAYMENT_REPORT_REPOSITORY) private readonly paymentReportRepository: typeof PaymentReport,
  ) { }
async create(payload: CreateReportDto) {
  const content = payload.content.toLowerCase();
  if (content == "paper") {
    const generalPaperReport = new PaperReportService(
      this.printingHistoryRepository,
      this.generalPaperReportRepository
    );
    return await generalPaperReport.create(payload);
  }
  else if (content == "payment") {
    const generalPaperReport = new PaymentReportService(
      this.paymentRepository,
      this.paymentReportRepository,
    );
    return await generalPaperReport.create(payload);
  }
  else {
    throw new Error(`Unsupported content type for report: ${payload.content}`);
  }

}
}
class PaperReportService {
  constructor(
    @Inject(PRINTING_HISTORY_REPOSITORY) private readonly printingHistoryRepository: typeof PrintingHistory,
    @Inject(PAPER_REPORT_REPOSITORY) private readonly generalPaperReportRepository: typeof GeneralPaperReport,
  ) { }

  async create(payload: CreateReportDto) {
    const type = payload.reportType.toLowerCase();
    const reportDate = new Date(payload.reportDate);
    let printingHistories: PrintingHistory[];

    if (type === 'monthly') {
      const startOfMonth = new Date(reportDate.getFullYear(), reportDate.getMonth(), 1);
      const endOfMonth = new Date(reportDate.getFullYear(), reportDate.getMonth() + 1, 0);
      printingHistories = await this.printingHistoryRepository.findAll({
        where: {
          date: {
            [Op.between]: [startOfMonth, endOfMonth]
          }
        }
      });
    } else if (type === 'yearly') {
      const startOfYear = new Date(reportDate.getFullYear(), 0, 1);
      const endOfYear = new Date(reportDate.getFullYear(), 11, 31);
      printingHistories = await this.printingHistoryRepository.findAll({
        where: {
          date: {
            [Op.between]: [startOfYear, endOfYear]
          }
        }
      });
    } else {
      printingHistories = await this.printingHistoryRepository.findAll();
    }

    const totalA3PaperCount = printingHistories
      .filter((record: PrintingHistory) => record.page_size === 'A3')
      .reduce((sum: number, record: PrintingHistory) => sum + (record.page_print * record.copies), 0);

    const totalA4PaperCount = printingHistories
      .filter((record: PrintingHistory) => record.page_size === 'A4')
      .reduce((sum: number, record: PrintingHistory) => sum + (record.page_print * record.copies), 0);

    const totalA5PaperCount = printingHistories
      .filter((record: PrintingHistory) => record.page_size === 'A5')
      .reduce((sum: number, record: PrintingHistory) => sum + (record.page_print * record.copies), 0);


    const mostUsePrinter = findMostFrequentValue(printingHistories.map(record => record.printer_id));


    const peakDay = findMostFrequentValue(printingHistories.map(record => record.date))
    const report = await this.generalPaperReportRepository.create({
      report_date: reportDate,
      report_type: type,
      A3_paper_count: totalA3PaperCount,
      A4_paper_count: totalA4PaperCount,
      A5_paper_count: totalA5PaperCount,
      most_use_printer: mostUsePrinter,
      peak: peakDay ? new Date(peakDay) : null,
    });

    return report;
  }
}

class PaymentReportService {
  constructor(
    @Inject(TRANSACTION_REPOSITORY) private readonly paymentRepository: typeof Payment_Trasaction,
    @Inject(PAYMENT_REPORT_REPOSITORY) private readonly paymentReportRepository: typeof PaymentReport,
  ) { };
  async create(payload: CreateReportDto) {
    const type = payload.reportType.toLowerCase();
    const reportDate = new Date(payload.reportDate);
    let transactions: Payment_Trasaction[];
    if (type === 'monthly') {
      const startOfMonth = new Date(reportDate.getFullYear(), reportDate.getMonth(), 1);
      const endOfMonth = new Date(reportDate.getFullYear(), reportDate.getMonth() + 1, 0);
      transactions = await this.paymentRepository.findAll({
        where: {
          Date_time: {
            [Op.between]: [startOfMonth, endOfMonth]
          }
        }
      });
    } else if (type === 'yearly') {
      const startOfYear = new Date(reportDate.getFullYear(), 0, 1);
      const endOfYear = new Date(reportDate.getFullYear(), 11, 31);
      transactions = await this.paymentRepository.findAll({
        where: {
          Date_time: {
            [Op.between]: [startOfYear, endOfYear]
          }
        }
      });
    } else {
      transactions = await this.paymentRepository.findAll();
    }

    const totalPay = transactions.reduce((sum, record) => sum + (record.value * record.number_of_page), 0);
    const biggestPay = Math.max(...transactions.map(record => record.value * record.number_of_page));
    const smallestPay = Math.min(...transactions.map(record => record.value * record.number_of_page));

    // Calculate peak usage day
    const peakDay = findMostFrequentValue(transactions.map(record => record.Date_time))

    // Create a report object
    const report = await this.paymentReportRepository.create({
      report_date: reportDate,
      report_type: type,
      biggest_pay: biggestPay,
      smallest_pay: smallestPay,
      total_pay: totalPay,
      peak: peakDay ? new Date(peakDay) : null,
    });

    return report;
  }
}

function findMostFrequentValue(arr: any[]): any {
  if (arr.length === 0) {
    return null;
  }

  const countMap: { [key: string]: number } = {};

  // Count the occurrences of each value
  arr.forEach(value => {
    const key = JSON.stringify(value);
    countMap[key] = (countMap[key] || 0) + 1;
  });

  // Find the most frequent value
  let mostFrequentValue = null;
  let maxCount = 0;
  let maxCountOccurrences = 0;
  for (const key in countMap) {
    if (countMap[key] > maxCount) {
      maxCount = countMap[key];
      mostFrequentValue = JSON.parse(key);
      maxCountOccurrences = 1;
    } else if (countMap[key] === maxCount) {
      maxCountOccurrences++;
    }
  }

  // Check if there are at least two values with the same highest frequency
  if (maxCountOccurrences > 1) {
    return null;
  }

  return mostFrequentValue;
}

