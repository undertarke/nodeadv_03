import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ClientProxy, EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,

    private prismaService: PrismaService,

    @Inject("NOTIFY_NAME") private notifyService: ClientProxy
  ) { }

  @EventPattern("save_ship")
  async saveShipping(@Payload() data) {

    let { orderId, email, firstName, lastName, address } = data;

    let infoShip = {
      order_id: orderId,
      email,
      first_name: firstName,
      last_name: lastName,
      address
    }
    await this.prismaService.shipping.create({ data: infoShip });

    // gọi service notify xử lý gửi mail thành công
    this.notifyService.emit("send_mail_success", { email: email });
  }
}
