import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern("get_product")
  async getProduct(@Payload() data) {
    return await this.appService.getProduct(data);
  }

}
