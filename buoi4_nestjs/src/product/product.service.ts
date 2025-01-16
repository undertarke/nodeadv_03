import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { products } from '@prisma/client';

@Injectable()
export class ProductService {


  constructor(
    private configService: ConfigService,
    private prismaService: PrismaService
  ) { }

  async findAll() {
    // SELECT * FROM products
    // insert into
    // this.prisma.products.create({data: });
    // update set
    // this.prisma.products.update({data: ,where});
    // delete from where
    // this.prisma.products.delete({where});

    this.configService.get("PASSWORD");
    return await this.prismaService.products.findMany();
  }





  create(createProductDto) {
    this.prismaService.products.create({
      data: createProductDto
    })
    return 'Create successs';
  }


  findOne(id: number) {
    return this.prismaService.products.findFirst({
      where: {
        id: id
      }
    });
  }

  update(id: number, updateProductDto) {

    this.prismaService.products.update({
      data: updateProductDto,
      where: {
        id
      }
    })
    return `This action updates a #${id} product`;
  }

  remove(id: number) {

    this.prismaService.products.delete({
      where: {
        id
      }
    })
    return `This action removes a #${id} product`;
  }
}
