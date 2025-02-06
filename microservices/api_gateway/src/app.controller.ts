import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject("PRODUCT_NAME") private productService: ClientProxy

  ) { }

  // localhost:8080/product/laptop
  @Get("/product/:name")
  async getProduct(@Param('name') name: string) {
    // gọi đến service product để lấy data
    let productData = await lastValueFrom(this.productService.send("get_product", name));

    return productData
  }

  @Post("/order")
  order(@Body() info){
    // gọi service order để lưu data
    // gọi server notify để gửi mail xác nhận đơn
  }
}
