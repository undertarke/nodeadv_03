import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [ProductModule, ConfigModule.forRoot({ isGlobal: true }), PrismaModule,

    CacheModule.register({
      isGlobal: true,
      ttl: 20000, // time to life milisecond
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

// @nestjs/cache-manager 2.3.0
