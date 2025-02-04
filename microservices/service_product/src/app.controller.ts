import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getProduct(@Param('name') name: string) {
    return this.appService.getProduct(name);
  }
}
