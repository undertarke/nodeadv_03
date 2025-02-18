import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register(
    [
      {
        name: "PRODUCT_NAME",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://admin:1234@some-rabbit:5672"],
          queue: "product_queue",
          queueOptions: {
            durable: false // giữ lại queue khi RabbitMQ bị restart
          }
        }
      },
      {
        name: "NOTIFY_NAME",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://admin:1234@some-rabbit:5672"],
          queue: "notify_queue",
          queueOptions: {
            durable: false // giữ lại queue khi RabbitMQ bị restart
          }
        }
      },
      {
        name: "ORDER_NAME",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://admin:1234@some-rabbit:5672"],
          queue: "order_queue",
          queueOptions: {
            durable: false // giữ lại queue khi RabbitMQ bị restart
          }
        }
      }
    ]
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
