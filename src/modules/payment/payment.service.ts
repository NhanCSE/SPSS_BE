import { Inject, Injectable } from "@nestjs/common";
import { PAYMENT_REPOSITORY, STUDENT_REPOSITORY } from "src/common/contants";
import { Payment } from "./entities/payment.entity";
import { CreatePayemntDto } from "./payment.dto";
import { Student } from "../user/entities/student.entity";
import axios from "axios";
import * as path from "path";
import { readFileSync } from "fs";
const crypto = require('crypto');
// import { CreatePrinterDto } from "../dtos/create-printer.dtos";



@Injectable()
export class PaymentService {
  constructor(
    @Inject(PAYMENT_REPOSITORY) private readonly paymentRepository: typeof Payment,
    @Inject(STUDENT_REPOSITORY) private readonly studentRepository: typeof Student
  ) { };


  async CreatePayment(payload: CreatePayemntDto) {

    const value = await this.calculate(payload.combo_type, payload.numberCombo)

    var accessKey = process.env.ACCESSKEY;
    var secretKey = process.env.SECRETKEY;
    var orderInfo = `Tong trang: ${value[1]}`;
    var partnerCode = process.env.PARTNERCODE;
    var redirectUrl = 'http://localhost:3000';
    var ipnUrl = 'https://c2ef-2405-4802-a41d-1be0-64a6-f44e-4fe6-3fc0.ngrok-free.app/v1/payment/callback';
    var requestType = "payWithMethod";
    var amount = value[0];
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = '';
    // var paymentCode = 'T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==';
    var orderGroupId = '';
    var autoCapture = true;
    var lang = 'vi';

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------")
    console.log(rawSignature)
    //signature
    var signature = crypto.createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');
    console.log("--------------------SIGNATURE----------------")
    console.log(signature)

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature
    });

    //Create the HTTPS objects
    const options = {
      method: 'POST',
      url: 'https://test-payment.momo.vn/v2/gateway/api/create',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
      },
      data: requestBody
    }
    let result;
    result = await axios(options)

    const paymentInfo = await this.paymentRepository.create({
      transaction_id: orderId,
      date_time: new Date(),
      value: amount,
      numberOfPages: value[1],
      student_id: payload.student_id,
      status: false
    });


    return result.data

  }

  async calculate(type: String, number: number) { //number là số lượng combo thằng đó muốn mua
    const filePath = path.join(__dirname, '..', '..', '..', '..', 'src', 'modules', 'payment', 'list_price.json'); // Đường dẫn tới file JSON
    // console.log(path.join(__dirname, '..', '..', '..', '..'));
    const jsonData = JSON.parse(readFileSync(filePath, 'utf8'));
    const price = jsonData[`${type}`]['price'] * number;
    const amountPapers = jsonData[`${type}`]['amount'] * number;
    return [price, amountPapers]
  }

  async paySuccessful(orderId: String) {

    const payment = await this.paymentRepository.findOne({
      where: {
        transaction_id: orderId,
      }
    })
    payment.status = true;

    const student = await this.studentRepository.findOne({
      where: {
        sso_id: payment.student_id,
      }
    })

    student.bought_paper += payment.numberOfPages;
    student.save();
    payment.save();


    return true;
  }

}