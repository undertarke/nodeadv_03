import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';


async function bootstrap() {
  // info, warning, error 
  const logger = WinstonModule.createLogger({
    defaultMeta: { service: "Notify services" },

    transports: [
      new winston.transports.Console(), // log ra ở terminal
      // new winston.transports.File({
      //   filename: "logs/error.log", // tạo file log
      //   level: "error" // info, warn , error
      // })
      new winston.transports.Http({
        host: "localhost",
        port: 5044,
        level: "error"
      })
    ]
  })

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    logger: logger,
    transport: Transport.RMQ,
    options: {
      urls: ["amqp://admin:1234@localhost:5672"],
      queue: "notify_queue",
      queueOptions: {
        durable: false
      }
    }
  });
  await app.listen();
}
bootstrap();
