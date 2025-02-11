import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ProductService } from './product.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache

  ) { }

  @Post("/order")
  create(@Body() info) {
    return this.productService.order(info);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.productService.findProduct(name);
  }

  @Get("/cache/save-cache")
  saveCache() {
    this.cacheManager.set("get_demo", { id: 1, uName: "Tony" });
    return "save cache";
  }

  @Get("/cache/get-cache")
  getCache() {

    return this.cacheManager.get("get_demo");
  }

  @Get("/cache/remove-cache")
  removeCache() {
    this.cacheManager.del("get_demo");
    this.cacheManager.reset();
    return "del cache";

  }



}
