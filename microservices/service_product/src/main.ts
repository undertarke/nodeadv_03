import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

// service product
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ["amqp://admin:1234@some-rabbit:5672"],
      queue: "product_queue",
      queueOptions: {
        durable: false
      }
    }
  });
  await app.listen();
}
bootstrap();
