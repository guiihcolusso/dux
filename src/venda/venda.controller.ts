import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { VendaService } from './venda.service';
import { CreateVendaDto } from './dto/createVenda.dto';
import { UpdateVendaDto } from './dto/updateVenda.dto';

@Controller('venda')
export class VendaController {
  constructor(private readonly saleService: VendaService) {}

  @Get()
  listAllSale() {
    return this.saleService.listAllSale();
  }

  @Get(':id')
  getSale(@Param('id', ParseIntPipe) id: number) {
    return this.saleService.getSale(id);
  }

  @Post()
  createSale(@Body() createVendaDto: CreateVendaDto) {
    return this.saleService.createSale(createVendaDto);
  }

  @Put(':id')
  updateSale(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVenda: UpdateVendaDto,
  ) {
    return this.saleService.updateSale(id, updateVenda);
  }

  @Delete(':id')
  deleteSale(@Param('id', ParseIntPipe) id: number) {
    return this.saleService.deleteSale(id);
  }
}
