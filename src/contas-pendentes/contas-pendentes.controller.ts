import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('contas-pendentes')
export class ContasPendentesController {
  @Get()
  listAllPendingAccounts() {}

  @Get(':id')
  getPendingAccount() {
    return 'a';
  }

  @Post()
  createPendingAccount() {
    return 'a';
  }

  @Put(':id')
  updatePendingAccount() {
    return 'a';
  }

  @Delete(':id')
  deletePendingAccount() {
    return 'a';
  }
}
