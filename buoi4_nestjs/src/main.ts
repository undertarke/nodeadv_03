import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // module gốc
  await app.listen(8080);
}
bootstrap();


// yarn start 
// yarn start:dev => watching


/* 
- quản lý theo đối tượng: controller, module, service (provider)
    + controller: khai báo, quản lý API (endpoint, method)
    + service: quản lý chức năng, xử lý logic, tính toán ,....
    + module: khai báo, kết nối controller, service, kết nối module của đối tượng khác.

    @: decorator
    
*/

/*
  1/ yarn add prisma @prisma/client
  2/ yarn prisma init
  3/ update lại file .env , schema.prisma
  4/ yarn prisma db pull
  5/ yarn prisma generate

*/