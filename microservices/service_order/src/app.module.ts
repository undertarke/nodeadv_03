import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([{

      name: "SHIPPING_NAME",
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://admin:1234@some-rabbit:5672"],
        queue: "shipping_queue",
        queueOptions: {
          durable: false // giữ lại queue khi RabbitMQ bị restart
        }
      }

    }])
    , PrismaModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
