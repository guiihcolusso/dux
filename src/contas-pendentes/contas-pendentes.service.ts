import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContasPendentesDto } from './dto/create-ContasPendentes.dto';
import { UpdateContasPendentesDto } from './dto/update-ContasPendentes.dto';

@Injectable()
export class ContasPendentesService {
  constructor(private readonly prisma: PrismaService) {}

  listAllPendingAccounts() {
    return this.prisma.contasPendentes.findMany();
  }

  getPendingAccount(id: number) {
    return this.prisma.contasPendentes.findUnique({
      where: { id },
    });
  }

  createPendingAccount(createPendingAccount: CreateContasPendentesDto) {
    return this.prisma.contasPendentes.create({
      data: createPendingAccount,
    });
  }

  updatePendingAccount(
    id: number,
    updatePendingAccount: UpdateContasPendentesDto,
  ) {
    return this.prisma.contasPendentes.update({
      where: { id },
      data: updatePendingAccount,
    });
  }

  deletePendingAccount(id: number) {
    return this.prisma.contasPendentes.delete({
      where: { id },
    });
  }
}
