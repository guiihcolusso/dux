import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('produto')
export class ProdutoController {
  @Get()
  listAllProduct() {}

  @Get(':id')
  getProduct() {
    return 'a';
  }

  @Post()
  createProduct() {
    return 'a';
  }

  @Put(':id')
  updateProduct() {
    return 'a';
  }

  @Delete(':id')
  deleteProduct() {
    return 'a';
  }
}
