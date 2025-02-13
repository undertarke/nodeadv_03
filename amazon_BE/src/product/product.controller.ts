import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Put } from '@nestjs/common';
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
  async findOne(@Param('name') name: string) {
    let dataCache = await this.cacheManager.get("get_product");
    // lần hai
    if (dataCache) {
      console.log(" lần hai: ", dataCache);
      return dataCache
    }

    let data = await this.productService.findProduct(name);
    console.log(" lần đầu: ", dataCache)

    // lần đầu
    this.cacheManager.set("get_product", data);

    return data

  }

  @Put()
  updateProduct() {

    this.productService.update();
    this.cacheManager.del("get_product");
    return "update success"
  }

  @Get("/cache/save-cache")
  saveCache() {
    this.cacheManager.set("get_demo", { id: 1, uName: "Tony" });

    this.cacheManager.set("get_demo2", "Hello world");
    return "save cache";
  }

  @Get("/cache/get-cache")
  async getCache() {

    let data = await this.cacheManager.get("get_demo");
    let data2 = await this.cacheManager.get("get_product");
    let data3 = await this.cacheManager.get("get_demo2");
    let data4 = await this.cacheManager.get("demo_cache");

    return { data, data2, data3, data4 }
  }

  @Get("/cache/remove-cache")
  removeCache() {
    this.cacheManager.del("get_demo");
    this.cacheManager.reset();
    return "del cache";

  }



}
