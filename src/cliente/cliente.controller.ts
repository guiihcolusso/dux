import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('cliente')
export class ClienteController {
  @Get()
  listAllCustomers() {}

  @Get(':id')
  getCustomer() {
    return 'a';
  }

  @Post()
  createCustomer() {
    return 'a';
  }

  @Put(':id')
  updateCustomer() {
    return 'a';
  }

  @Delete(':id')
  deleteCustomer() {
    return 'a';
  }
}
