import { Inject, Injectable } from "@nestjs/common";
import { LOCATION_REPOSITORY, PAPER_REPORT_REPOSITORY, PAYMENT_REPORT_REPOSITORY, PRINTER_REPOSITORY, PRINTING_HISTORY_REPOSITORY, TRANSACTION_REPOSITORY } from "src/common/contants";
import { GeneralPaperReport} from "../entities/general-report.entity";
import { PaymentTrasaction } from "../entities/transaction.entity";
// import { PrintingHistory } from "../entities/printingHistory.entity";
import { CreateReportDto } from "../dtos/create-report.dtos";
import { Op } from "sequelize";
import { ViewReportDto } from "../dtos/view-report.dtos";
import { PrintingHistory } from "src/modules/history/entities/printingHistory.entity";
import { PaymentReport } from "../entities/payment-report.entity";

@Injectable()
export class ReportService {
  constructor(
    @Inject(PRINTING_HISTORY_REPOSITORY) private readonly printingHistoryRepository: typeof PrintingHistory,
    @Inject(TRANSACTION_REPOSITORY) private readonly paymentRepository: typeof PaymentTrasaction,
    @Inject(PAPER_REPORT_REPOSITORY) private readonly generalPaperReportRepository: typeof GeneralPaperReport,
    @Inject(PAYMENT_REPORT_REPOSITORY) private readonly paymentReportRepository: typeof PaymentReport,
  ) { };
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




  async view(payload: ViewReportDto) {
    const content = payload.content.toLowerCase();
    const type = payload.reportType.toLowerCase();
    const reportDate = new Date(payload.reportDate);

    let report;

    if (content === "paper") {
      if (type === "monthly") {
        report = await this.generalPaperReportRepository.findOne({
          where: {
            reportType: type,
            [Op.and]: [
              { reportDate: { [Op.gte]: new Date(reportDate.getFullYear(), reportDate.getMonth(), 1) } },
              { reportDate: { [Op.lt]: new Date(reportDate.getFullYear(), reportDate.getMonth() + 1, 1) } }
            ]
          },
        });
      } else if (type === "yearly") {
        report = await this.generalPaperReportRepository.findOne({
          where: {
            reportType: type,
            [Op.and]: [
              { reportDate: { [Op.gte]: new Date(reportDate.getFullYear(), 0, 1) } },
              { reportDate: { [Op.lt]: new Date(reportDate.getFullYear() + 1, 0, 1) } }
            ]
          },
        });
      } else {
        report = await this.generalPaperReportRepository.findOne({
          where: {
            reportType: type,
            reportDate: reportDate,
          },
        });
      }
    } else if (content === "payment") {
      if (type === "monthly") {
        report = await this.paymentReportRepository.findOne({
          where: {
            reportType: type,
            [Op.and]: [
              { reportDate: { [Op.gte]: new Date(reportDate.getFullYear(), reportDate.getMonth(), 1) } },
              { reportDate: { [Op.lt]: new Date(reportDate.getFullYear(), reportDate.getMonth() + 1, 1) } }
            ]
          },
        });
      } else if (type === "yearly") {
        report = await this.paymentReportRepository.findOne({
          where: {
            reportType: type,
            [Op.and]: [
              { reportDate: { [Op.gte]: new Date(reportDate.getFullYear(), 0, 1) } },
              { reportDate: { [Op.lt]: new Date(reportDate.getFullYear() + 1, 0, 1) } }
            ]
          },
        });
      } else {
        report = await this.paymentReportRepository.findOne({
          where: {
            reportType: type,
            reportDate: reportDate,
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

    // Calculate peak usage day
    const peakDay = findMostFrequentValue(printingHistories.map(record => record.date))
    // Create a report object
    console.log(peakDay)
    const report = await this.generalPaperReportRepository.create({
      reportDate: reportDate,
      reportType: type,
      A3PaperCount: totalA3PaperCount,
      A4PaperCount: totalA4PaperCount,
      A5PaperCount: totalA5PaperCount,
      mostUsePrinter: mostUsePrinter,
      peak: peakDay ? new Date(peakDay) : null,
    });

    return report;
  }
}

class PaymentReportService {
  constructor(
    @Inject(TRANSACTION_REPOSITORY) private readonly paymentRepository: typeof PaymentTrasaction,
    @Inject(PAYMENT_REPORT_REPOSITORY) private readonly paymentReportRepository: typeof PaymentReport,
  ) { };
  async create(payload: CreateReportDto) {
    const type = payload.reportType.toLowerCase();
    const reportDate = new Date(payload.reportDate);
    let transactions: PaymentTrasaction[];
    if (type === 'monthly') {
      const startOfMonth = new Date(reportDate.getFullYear(), reportDate.getMonth(), 1);
      const endOfMonth = new Date(reportDate.getFullYear(), reportDate.getMonth() + 1, 0);
      transactions = await this.paymentRepository.findAll({
        where: {
          dateTime: {
            [Op.between]: [startOfMonth, endOfMonth]
          }
        }
      });
    } else if (type === 'yearly') {
      const startOfYear = new Date(reportDate.getFullYear(), 0, 1);
      const endOfYear = new Date(reportDate.getFullYear(), 11, 31);
      transactions = await this.paymentRepository.findAll({
        where: {
          dateTime: {
            [Op.between]: [startOfYear, endOfYear]
          }
        }
      });
    } else {
      transactions = await this.paymentRepository.findAll();
    }

    const totalPay = transactions.reduce((sum, record) => sum + (record.value * record.numberOfPage), 0);
    const biggestPay = Math.max(...transactions.map(record => record.value * record.numberOfPage));
    const smallestPay = Math.min(...transactions.map(record => record.value * record.numberOfPage));

    // Calculate peak usage day
    const peakDay = findMostFrequentValue(transactions.map(record => record.dateTime))

    // Create a report object
    const report = await this.paymentReportRepository.create({
      reportDate: reportDate,
      reportType: type,
      biggestPay: biggestPay,
      smallestPay: smallestPay,
      totalPay: totalPay,
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
  console.log(countMap)
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
