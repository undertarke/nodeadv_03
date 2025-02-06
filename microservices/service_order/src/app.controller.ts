import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,

    private prismaService: PrismaService
  ) { }


  async saveOrder(data) {
    let { userId, productId, quantity } = data;

    let infoOrder = {
      user_id: userId,
      product_id: productId,
      quantity,
      order_date: new Date()
    }


    let dataOrder = await this.prismaService.orders.create({ data: infoOrder });

    // gọi service shipping để thực hiện tiếp

  }
  
}
