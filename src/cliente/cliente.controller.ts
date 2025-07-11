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
import { ClienteService } from './cliente.service';
import { CreateClientDto } from './dto/createClient.dto';
import { UpdateClientDto } from './dto/updateClient.dto';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly customerService: ClienteService) {}

  @Get()
  listAllCustomers() {
    return this.customerService.listAllCustomers();
  }

  @Get(':id')
  getCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.getCustomer(id);
  }

  @Post()
  createCustomer(@Body() createClientDto: CreateClientDto) {
    return this.customerService.createCustomer(createClientDto);
  }

  @Put(':id')
  updateCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.customerService.updateCustomer(id, updateClientDto);
  }

  @Delete(':id')
  deleteCustomer(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.deleteCustomer(id);
  }
}
