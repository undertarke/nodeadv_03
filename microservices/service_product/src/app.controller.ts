import { Controller, Get, Inject, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    private elasticService: ElasticsearchService
  ) { }

  @MessagePattern("get_product")
  async getProduct(@Payload() data) {
    return await this.appService.getProduct(data);
  }


  @EventPattern("save_cache")
  saveCache() {
    this.cacheManager.set("get_demo", { id: 1, uName: "Tony" });

    this.cacheManager.set("get_demo2", "Hello world");
    return "save cache";
  }

  @MessagePattern("get_cache")
  async getCache() {

    let data = await this.cacheManager.get("get_demo");
    let data2 = await this.cacheManager.get("get_product");
    let data3 = await this.cacheManager.get("get_demo2");
    let data4 = await this.cacheManager.get("demo_cache");

    return { data, data2, data3, data4 }
  }

  @MessagePattern("get_elastic")
  async getElastic(@Payload() data) {

    //create auto id
    await this.elasticService.index({
      index: "demo_product",
      document: {
        "name": "test",
        "category": "test",
        "price": 0,
        "in_stock": true,
        "quantity": 0,
        "create_date": "2024-02-20"
      },
      refresh: true
    })

    let result = this.elasticService.search({
      index: "demo_product",

    });
    // create with id
    // this.elasticService.create({
    //   index: "demo_product",
    //   id:"101",
    //   document: {
    //     "name": "test",
    //     "category": "test",
    //     "price": 0,
    //     "in_stock": true,
    //     "quantity": 0,
    //     "create_date": "2024-02-20"
    //   },
    // })

    return result;
  }

}




