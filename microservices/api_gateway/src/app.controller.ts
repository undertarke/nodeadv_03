import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/product/:name")
  getHello() {
    // gọi đến service product để lấy data
  }
}
