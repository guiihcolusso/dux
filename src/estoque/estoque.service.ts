import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEstoqueDto, UpdateEstoqueDto } from './dto/estoque.dto';

@Injectable()
export class EstoqueService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllStocks() {
    return this.prisma.estoque.findMany({
      include: { produto: true },
    });
  }

  async getStock(id: number) {
    const estoque = await this.prisma.estoque.findUnique({
      where: { id },
      include: { produto: true },
    });
    if (!estoque) {
      throw new NotFoundException(`Nenhum estoque localizado com o ID: ${id}.`);
    }
    return estoque;
  }

  async createStock(createEstoqueDto: CreateEstoqueDto) {
    return this.prisma.estoque.create({
      data: {
        produtoId: createEstoqueDto.produtoId,
        qtdDisponivel: createEstoqueDto.qtdDisponivel,
      },
      include: { produto: true },
    });
  }

  async updateStock(id: number, updateEstoqueDto: UpdateEstoqueDto) {
    const estoque = await this.prisma.estoque.findUnique({ where: { id } });
    if (!estoque) {
      throw new NotFoundException(`Nenhum estoque localizado com o ID: ${id}.`);
    }
    return this.prisma.estoque.update({
      where: { id },
      data: updateEstoqueDto,
      include: { produto: true },
    });
  }

  async deleteStock(id: number) {
    const estoque = await this.prisma.estoque.findUnique({ where: { id } });
    if (!estoque) {
      throw new NotFoundException(`Nenhum estoque localizado com o ID: ${id}.`);
    }
    return this.prisma.estoque.delete({ where: { id } });
  }
}
