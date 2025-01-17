import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, UseInterceptors, UploadedFile, UploadedFiles, Headers, HttpException, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiProperty, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

class userDTO {

  @ApiProperty()
  id: number

  @ApiProperty()
  username: string

  @ApiProperty()
  pass: string

  @ApiProperty()
  email: string
}


class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  hinhAnh: any;
}

class FilesUploadDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  hinhAnh: any[];
}


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService

  ) { }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto
  })
  @UseInterceptors(FileInterceptor("hinhAnh", {
    storage: diskStorage({
      destination: process.cwd() + "/public/imgs", // nơi lưu hình ảnh
      filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname),
    })
  }))
  @Post("upload")
  upload(@UploadedFile() file) {
    return file
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FilesUploadDto
  })
  @UseInterceptors(FilesInterceptor("hinhAnh", 5, {
    storage: diskStorage({
      destination: process.cwd() + "/public/imgs", // nơi lưu hình ảnh
      filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname),
    })
  }))
  @Post("upload-multiple")
  uploadMultiple(@UploadedFiles() files) {
    return files
  }




  // Request
  // Response

  @ApiQuery({
    name: "uname"
  })
  @ApiParam({
    name: "uid"
  })
  @ApiBody({
    type: userDTO
  })
  @Post("/demo/:uid")
  getDemo(@Req() req,
    @Query("uname") uname: string,
    @Param("uid") uid: string,
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

  // @UseGuards(AuthGuard("jwt"))
  // @ApiBearerAuth()
  @Get()
  findAll(
    @Headers("Authorization") token: string
  ) {

    return this.productService.findAll();

  }

  @Get("/mysql")
  findMysqlAll(
    @Headers("Authorization") token: string
  ) {

    return this.productService.findMysqlAll();

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
