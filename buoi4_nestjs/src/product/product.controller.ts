import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

type userDTO = {
  id: number,
  username: string,
  pass: string,
  email: string
}

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  // Request
  // Response
  @Get("/demo/:uid")
  getDemo(@Req() req,
    @Query("uname") uname,
    @Param("uid") uid,
    @Body() body: userDTO
  ) {

    // url: query string (?), route params (/uid)
    // let { uname } = req.query
    // let { uid } = req.params

    // body: json
    // let { id, username, pass, email } = req.body;
    let { id, username, pass, email } = body;

    return { uname, uid, id, username, pass, email }
  }



  @Post()
  create(@Body() createProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }


}
