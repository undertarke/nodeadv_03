import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

import { RedisCacheModule } from './redis_cache/redis_cache.module';

@Module({
  imports: [ProductModule, ConfigModule.forRoot({ isGlobal: true }), PrismaModule,
    RedisCacheModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

// @nestjs/cache-manager 2.3.0
