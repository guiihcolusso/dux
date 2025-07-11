import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Body,
} from '@nestjs/common';
import { ContasPendentesService } from './contas-pendentes.service';
import { CreateContasPendentesDto } from './dto/create-ContasPendentes.dto';
import { UpdateContasPendentesDto } from './dto/update-ContasPendentes.dto';

@Controller('contas-pendentes')
export class ContasPendentesController {
  constructor(
    private readonly pendingAccountsService: ContasPendentesService,
  ) {}

  @Get()
  listAllPendingAccounts() {
    return this.pendingAccountsService.listAllPendingAccounts();
  }

  @Get(':id')
  getPendingAccount(@Param('id', ParseIntPipe) id: number) {
    return this.pendingAccountsService.getPendingAccount(id);
  }

  @Post()
  createPendingAccount(@Body() createDto: CreateContasPendentesDto) {
    return this.pendingAccountsService.createPendingAccount(createDto);
  }

  @Put(':id')
  updatePendingAccount(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateContasPendentesDto,
  ) {
    return this.pendingAccountsService.updatePendingAccount(id, updateDto);
  }

  @Delete(':id')
  deletePendingAccount(@Param('id', ParseIntPipe) id: number) {
    return this.pendingAccountsService.deletePendingAccount(id);
  }
}
