import { Test, TestingModule } from '@nestjs/testing';
import { ContasPendentesService } from './contas-pendentes.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ContasPendentesService', () => {
  let service: ContasPendentesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContasPendentesService, PrismaService],
    }).compile();

    service = module.get<ContasPendentesService>(ContasPendentesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('listAllPendingAccounts deve chamar prisma.contasPendentes.findMany', async () => {
    const findManySpy = jest
      .spyOn(prisma.contasPendentes, 'findMany')
      .mockResolvedValue([]);
    await service.listAllPendingAccounts();
    expect(findManySpy).toHaveBeenCalled();
  });

  it('getPendingAccount deve retornar conta existente', async () => {
    jest
      .spyOn(prisma.contasPendentes, 'findUnique')
      .mockResolvedValue({ id: 1 } as any);
    const result = await service.getPendingAccount(1);
    expect(result).toEqual({ id: 1 });
  });

  it('createPendingAccount deve criar uma conta', async () => {
    const createDto = { valorPendente: 100 } as any;
    jest
      .spyOn(prisma.contasPendentes, 'create')
      .mockResolvedValue({ id: 1, ...createDto });
    const result = await service.createPendingAccount(createDto);
    expect(result).toEqual({ id: 1, ...createDto });
  });

  it('updatePendingAccount deve atualizar uma conta', async () => {
    const updateDto = { valorPendente: 200 } as any;
    jest
      .spyOn(prisma.contasPendentes, 'update')
      .mockResolvedValue({ id: 1, ...updateDto });
    const result = await service.updatePendingAccount(1, updateDto);
    expect(result).toEqual({ id: 1, ...updateDto });
  });

  it('deletePendingAccount deve remover uma conta', async () => {
    jest
      .spyOn(prisma.contasPendentes, 'delete')
      .mockResolvedValue({ id: 1 } as any);
    const result = await service.deletePendingAccount(1);
    expect(result).toEqual({ id: 1 });
  });
});
