import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('venda')
export class VendaController {
  @Get()
  listAllSale() {}

  @Get(':id')
  getSale() {
    return 'a';
  }

  @Post()
  createSale() {
    return 'a';
  }

  @Put(':id')
  updateSale() {
    return 'a';
  }

  @Delete(':id')
  deleteSale() {
    return 'a';
  }
}
