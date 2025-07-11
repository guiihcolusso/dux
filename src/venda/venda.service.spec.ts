import { Test, TestingModule } from '@nestjs/testing';
import { VendaService } from './venda.service';
import { PrismaService } from '../prisma/prisma.service';

describe('VendaService', () => {
  let service: VendaService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VendaService, PrismaService],
    }).compile();

    service = module.get<VendaService>(VendaService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('listAllSale deve chamar prisma.venda.findMany', async () => {
    const findManySpy = jest
      .spyOn(prisma.venda, 'findMany')
      .mockResolvedValue([]);
    await service.listAllSale();
    expect(findManySpy).toHaveBeenCalled();
  });

  it('getSale deve retornar venda existente', async () => {
    jest.spyOn(prisma.venda, 'findUnique').mockResolvedValue({ id: 1 } as any);
    const result = await service.getSale(1);
    expect(result).toEqual({ id: 1 });
  });

  it('getSale deve lançar erro se venda não existir', async () => {
    jest.spyOn(prisma.venda, 'findUnique').mockResolvedValue(null);
    await expect(service.getSale(999)).rejects.toThrow('Venda não encontrada');
  });
});
