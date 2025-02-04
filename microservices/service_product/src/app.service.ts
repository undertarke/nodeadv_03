import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {

  constructor(
    private prismaService: PrismaService
  ) { }

  async getProduct(name) {
    return await this.prismaService.products.findMany({
      where: {
        name: {
          contains: name // LIKE '%name%'
        }
      }
    });
  }
}
