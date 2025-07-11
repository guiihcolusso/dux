import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemVendaDto } from './dto/createItem.dto';
import { UpdateItemVendaDto } from './dto/updateItem.dto';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllItems() {
    return this.prisma.itemVenda.findMany();
  }

  async getItem(id: number) {
    const item = await this.prisma.itemVenda.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException('Item não encontrado');
    }
    return item;
  }

  async createItem(data: CreateItemVendaDto) {
    return this.prisma.itemVenda.create({
      data: {
        vendaId: data.vendaId,
        produtoId: data.produtoId,
        quantidade: data.quantidade,
        valorTotal: data.valorTotal,
        valorUnitario: data.valorUnitario,
      },
    });
  }

  async updateItem(id: number, data: UpdateItemVendaDto) {
    const item = await this.prisma.itemVenda.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException('Item não encontrado');
    }
    return this.prisma.itemVenda.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async deleteItem(id: number) {
    const item = await this.prisma.itemVenda.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException('Item não encontrado');
    }
    return this.prisma.itemVenda.delete({ where: { id } });
  }
}
