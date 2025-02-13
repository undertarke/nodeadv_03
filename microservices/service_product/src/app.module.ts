import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RedisCacheModule } from './redis_cache/redis_cache.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot({ isGlobal: true }), RedisCacheModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
