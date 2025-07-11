import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProdutoDto } from './dto/createProduto.dto';
import { UpdateProdutoDto } from './dto/updateProduto.dto';

@Injectable()
export class ProdutoService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllProduct() {
    return this.prisma.produto.findMany();
  }

  async getProduct(id: number) {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return produto;
  }

  async createProduct(data: CreateProdutoDto) {
    return this.prisma.produto.create({
      data: {
        nome: data.nome,
        marca: data.marca,
        custo: data.custo,
        revenda: data.revenda,
        minStock: data.minStock,
      },
    });
  }

  async updateProduct(id: number, data: UpdateProdutoDto) {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return this.prisma.produto.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async deleteProduct(id: number) {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return this.prisma.produto.delete({ where: { id } });
  }
}
