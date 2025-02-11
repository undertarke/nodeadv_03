import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, retry, timeout } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject("PRODUCT_NAME") private productService: ClientProxy,
    @Inject("NOTIFY_NAME") private notifyService: ClientProxy,
    @Inject("ORDER_NAME") private orderService: ClientProxy


  ) { }

  // localhost:8080/product/laptop
  @Post("/product/:name")
  async getProduct(@Param('name') name: string) {
    // gọi đến service product để lấy data
    let productData = await lastValueFrom(this.productService.send("get_product", name));

    return productData
  }

  @Post("/order")
  async order(@Body() info) {
    let { email } = info;

    // gọi server notify để gửi mail xác nhận đơn
    this.notifyService.emit("send_mail_order", { email: email });

    // gọi service order để lưu data
    let dataOrder = await lastValueFrom(this.orderService.send("save_order", info).pipe(
      timeout(2000), // mỗi lần gọi lại cách nhau 2s
      retry(2), // số lần gọi lại
      catchError(error => {
        console.log(error)
        throw new Error("Services order lỗi");
      })
    ));

    return dataOrder;
  }
}
