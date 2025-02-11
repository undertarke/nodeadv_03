import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ClientProxy, EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private prismaService: PrismaService,
    @Inject("SHIPPING_NAME") private shippingService: ClientProxy
  ) { }

  @MessagePattern("save_order")
  async saveOrder(@Payload() data) {
    let { userId, productId, quantity, email, firstName, lastName, address } = data;

    let infoOrder = {
      user_id: userId,
      product_id: productId,
      quantity,
      order_date: new Date()
    }


    let dataOrder = await this.prismaService.orders.create({ data: infoOrder });

    // gọi service shipping để thực hiện tiếp
    this.shippingService.emit("save_ship", {
      orderId: dataOrder.id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      address: address
    });

    return dataOrder;
  }

}
