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
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/createProduto.dto';
import { UpdateProdutoDto } from './dto/updateProduto.dto';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  listAllProduct() {
    return this.produtoService.listAllProduct();
  }

  @Get(':id')
  getProduct(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.getProduct(id);
  }

  @Post()
  createProduct(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.createProduct(createProdutoDto);
  }

  @Put(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ) {
    return this.produtoService.updateProduct(id, updateProdutoDto);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.produtoService.deleteProduct(id);
  }
}
