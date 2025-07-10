import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('estoque')
export class EstoqueController {
  @Get()
  listAllStocks() {}

  @Get(':id')
  getStock() {
    return 'a';
  }

  @Post()
  createStock() {
    return 'a';
  }

  @Put(':id')
  updateStock() {
    return 'a';
  }

  @Delete(':id')
  deleteStock() {
    return 'a';
  }
}
