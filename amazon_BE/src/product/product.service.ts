import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as nodemailer from 'nodemailer';

@Injectable()
export class ProductService {

  constructor(
    private prismaService: PrismaService
  ) { }

  async order(info) {
    let { email, userId, productId, quantity } = info;

    // yarn add nodemailer 
    // yarn add @types/nodemailer
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

    // send mail verify order => nodemailer , google mail
    configMail.sendMail(infoMail, error => error);
    // throw new Error("Error !!!!");

    // create Orders => 

    let infoOrder = {
      user_id: userId,
      product_id: productId,
      quantity,
      order_date: new Date()
    }
    
    
    let dataOrder = await this.prismaService.orders.create({ data: infoOrder });
    
    // create shipping => Mysql order_id

    // send mail order success 
    infoMail = {
      from: "sangrom2003@gmail.com",
      to: email, // "khaitruong2112@gmail.com"
      subject: "Đặt hàng qua Amazon",
      html: "<h1 style='color:red'> Đặt hàng thành công </h1>"
    }

    // send mail verify order => nodemailer , google mail
    configMail.sendMail(infoMail, error => error);

    return 'Order Success';
  }

  async findAll() {
    return await this.prismaService.products.findMany();
  }

  async findProduct(name) {
    return await this.prismaService.products.findMany({
      where: {
        name: {
          contains: name // LIKE '%name%'
        }
      }
    });
  }

}
