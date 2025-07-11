import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ClienteService', () => {
  let service: ClienteService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClienteService, PrismaService],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('listAllCustomers deve chamar prisma.cliente.findMany', async () => {
    const findManySpy = jest
      .spyOn(prisma.cliente, 'findMany')
      .mockResolvedValue([]);
    await service.listAllCustomers();
    expect(findManySpy).toHaveBeenCalled();
  });

  it('getCustomer deve retornar cliente existente', async () => {
    jest
      .spyOn(prisma.cliente, 'findUnique')
      .mockResolvedValue({ id: 1 } as any);
    const result = await service.getCustomer(1);
    expect(result).toEqual({ id: 1 });
  });

  it('getCustomer deve lançar erro se cliente não existir', async () => {
    jest.spyOn(prisma.cliente, 'findUnique').mockResolvedValue(null);
    await expect(service.getCustomer(999)).rejects.toThrow(
      'Cliente não encontrado',
    );
  });
});
