import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVendaDto } from './dto/createVenda.dto';
import { UpdateVendaDto } from './dto/updateVenda.dto';

@Injectable()
export class VendaService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllSale() {
    return this.prisma.venda.findMany({
      include: {
        cliente: {
          select: { nome: true },
        },
        itensVenda: {
          include: {
            produto: {
              select: { nome: true },
            },
          },
        },
      },
    });
  }

  async getSale(id: number) {
    const venda = await this.prisma.venda.findUnique({
      where: { id },
      include: {
        cliente: {
          select: { nome: true },
        },
        itensVenda: {
          include: {
            produto: {
              select: { nome: true },
            },
          },
        },
      },
    });
    if (!venda) {
      throw new NotFoundException('Venda não encontrada');
    }
    return venda;
  }

  async createSale(data: CreateVendaDto) {
    return this.prisma.venda.create({
      data: {
        clienteId: data.clienteId,
        usuarioId: data.usuarioId,
        valorTotal: data.valorTotal,
        desconto: data.desconto,
        data: data.data instanceof Date ? data.data : new Date(data.data),
      },
    });
  }

  async updateSale(id: number, data: UpdateVendaDto) {
    const venda = await this.prisma.venda.findUnique({ where: { id } });
    if (!venda) {
      throw new NotFoundException('Venda não encontrada');
    }
    return this.prisma.venda.update({
      where: { id },
      data: {
        ...data,
        ...(data.data && {
          data: data.data instanceof Date ? data.data : new Date(data.data),
        }),
      },
    });
  }

  async deleteSale(id: number) {
    const venda = await this.prisma.venda.findUnique({ where: { id } });
    if (!venda) {
      throw new NotFoundException('Venda não encontrada');
    }
    return this.prisma.venda.delete({ where: { id } });
  }
}
