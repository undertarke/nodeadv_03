import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

// API gateway
async function bootstrap() {

  // info, warning, error 
  const logger = WinstonModule.createLogger({
    defaultMeta: { service: "API gateway" },

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

  const app = await NestFactory.create(AppModule, { logger: logger });
  await app.listen(8080);
}
bootstrap();
