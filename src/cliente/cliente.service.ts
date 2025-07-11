import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/createClient.dto';
import { UpdateClientDto } from './dto/updateClient.dto';

@Injectable()
export class ClienteService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllCustomers() {
    return this.prisma.cliente.findMany();
  }

  async getCustomer(id: number) {
    const cliente = await this.prisma.cliente.findUnique({ where: { id } });
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return cliente;
  }

  async createCustomer(createClientDto: CreateClientDto) {
    const data = {
      ...createClientDto,
      nascimento:
        createClientDto.nascimento instanceof Date
          ? createClientDto.nascimento
          : new Date(createClientDto.nascimento),
    };
    return this.prisma.cliente.create({
      data,
    });
  }

  async updateCustomer(id: number, updateClientDto: UpdateClientDto) {
    const cliente = await this.prisma.cliente.findUnique({ where: { id } });
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    const data = {
      ...updateClientDto,
      ...(updateClientDto.nascimento && {
        nascimento:
          updateClientDto.nascimento instanceof Date
            ? updateClientDto.nascimento
            : new Date(updateClientDto.nascimento),
      }),
    };
    return this.prisma.cliente.update({
      where: { id },
      data,
    });
  }

  async deleteCustomer(id: number) {
    const cliente = await this.prisma.cliente.findUnique({ where: { id } });
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return this.prisma.cliente.delete({ where: { id } });
  }
}
