import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PrismaMysqlModule } from './prisma/prisma-mysql.module';

@Module({
  imports: [ProductModule, ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule, PrismaMysqlModule], // kết nối module đối tượng khác
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
