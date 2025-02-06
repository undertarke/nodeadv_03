import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,

    private prismaService: PrismaService
  ) { }


  saveShipping(data) {

    let { orderId, email, firstName, lastName, address } = data;

    let infoShip = {
      order_id: orderId,
      email,
      first_name: firstName,
      last_name: lastName,
      address
    }
    this.prismaService.shipping.create({ data: infoShip });

    // gọi service notify xử lý gửi mail thành công

  }
}
