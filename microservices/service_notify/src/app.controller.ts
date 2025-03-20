import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as nodemailer from 'nodemailer';
import { EventPattern, Payload } from '@nestjs/microservices';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @EventPattern("send_mail_order")
  getMailOrder(@Payload() data) {
    try {

      // throw new Error("adsada");
      let { email } = data;
      let configMail = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "sangrom2003@gmail.com",
          pass: "ckmvrngahrhykdfv"
        }
      })
      let infoMail = {
        from: "sangrom2003@gmail.com",
        to: email, // "khaitruong2112@gmail.com"
        subject: "Đặt hàng qua Amazon",
        html: "<h1> Xác nhận đơn hàng thành công </h1>"
      }

      configMail.sendMail(infoMail, error => error);
    } catch {
      console.log("error");
    }

  }

  @EventPattern("send_mail_success")
  sendMailSuccess(data) {
    let { email } = data;

    let configMail = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sangrom2003@gmail.com",
        pass: "ckmvrngahrhykdfv"
      }
    })
    // send mail order success 
    let infoMail = {
      from: "sangrom2003@gmail.com",
      to: email, // "khaitruong2112@gmail.com"
      subject: "Đặt hàng qua Amazon",
      html: "<h1 style='color:red'> Đặt hàng thành công </h1>"
    }

    // send mail verify order => nodemailer , google mail
    configMail.sendMail(infoMail, error => error);

  }

  

}
