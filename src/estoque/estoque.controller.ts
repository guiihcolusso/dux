import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateEstoqueDto, UpdateEstoqueDto } from './dto/estoque.dto';
import { EstoqueService } from './estoque.service';

@Controller('estoque')
export class EstoqueController {
  constructor(private readonly estoqueService: EstoqueService) {}

  @Get()
  listAllStocks() {
    return this.estoqueService.listAllStocks();
  }

  @Get(':id')
  async getStock(@Param('id', ParseIntPipe) id: number) {
    return await this.estoqueService.getStock(id);
  }

  @Post()
  async createStock(@Body() createEstoqueDto: CreateEstoqueDto) {
    return await this.estoqueService.createStock(createEstoqueDto);
  }

  @Put(':id')
  async updateStock(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEstoqueDto: UpdateEstoqueDto,
  ) {
    return await this.estoqueService.updateStock(id, updateEstoqueDto);
  }

  @Delete(':id')
  async deleteStock(@Param('id', ParseIntPipe) id: number) {
    return await this.estoqueService.deleteStock(id);
  }
}
