import { Test, TestingModule } from '@nestjs/testing';
import { EstoqueService } from './estoque.service';
import { PrismaService } from '../prisma/prisma.service';

describe('EstoqueService', () => {
  let service: EstoqueService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstoqueService, PrismaService],
    }).compile();

    service = module.get<EstoqueService>(EstoqueService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('listAllStocks deve chamar prisma.estoque.findMany', async () => {
    const findManySpy = jest
      .spyOn(prisma.estoque, 'findMany')
      .mockResolvedValue([]);
    await service.listAllStocks();
    expect(findManySpy).toHaveBeenCalled();
  });

  it('getStock deve retornar estoque existente', async () => {
    jest
      .spyOn(prisma.estoque, 'findUnique')
      .mockResolvedValue({ id: 1 } as any);
    const result = await service.getStock(1);
    expect(result).toEqual({ id: 1 });
  });

  it('getStock deve lançar erro se estoque não existir', async () => {
    jest.spyOn(prisma.estoque, 'findUnique').mockResolvedValue(null);
    await expect(service.getStock(999)).rejects.toThrow(
      'Nenhum estoque localizado com o ID: 999.',
    );
  });
});
