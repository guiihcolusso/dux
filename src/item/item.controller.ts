import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('item')
export class ItemController {
  @Get()
  listAllItems() {}

  @Get(':id')
  getItem() {
    return 'a';
  }

  @Post()
  createItem() {
    return 'a';
  }

  @Put(':id')
  updateItem() {
    return 'a';
  }

  @Delete(':id')
  deleteItem() {
    return 'a';
  }
}
