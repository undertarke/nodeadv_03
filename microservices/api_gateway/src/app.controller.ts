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
    let dataOrder = await lastValueFrom(this.orderService.send("save_order", info));

    return dataOrder;
  }


  @Get("/cache/save-cache")
  async saveCache() {

    this.productService.emit("save_cache", "");
    return "sace cache"
  }

  @Get("/cache/get-cache")
  async getCache() {

    return await lastValueFrom(this.productService.send("get_cache", ""));
  }

  @Get("/get-elastic/:key")
  async getElasticsearch(@Param("key") key) {
    return await lastValueFrom(this.productService.send("get_elastic", key));
  }

  @Get("/error")
  ApiError() {

    throw new Error("Lỗi api gateway")

    return ""
  }

  @Get("/error-notify")
  async ApiErrorNotify() {
    try {
      return await lastValueFrom(this.notifyService.send("error_notify", ""));
    } catch {
      throw new Error("error api gateway");
    }


  }

}
