import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoService } from './produto.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ProdutoService', () => {
  let service: ProdutoService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProdutoService, PrismaService],
    }).compile();

    service = module.get<ProdutoService>(ProdutoService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('listAllProduct deve chamar prisma.produto.findMany', async () => {
    const findManySpy = jest
      .spyOn(prisma.produto, 'findMany')
      .mockResolvedValue([]);
    await service.listAllProduct();
    expect(findManySpy).toHaveBeenCalled();
  });

  it('getProduct deve retornar produto existente', async () => {
    jest
      .spyOn(prisma.produto, 'findUnique')
      .mockResolvedValue({ id: 1 } as any);
    const result = await service.getProduct(1);
    expect(result).toEqual({ id: 1 });
  });

  it('getProduct deve lançar erro se produto não existir', async () => {
    jest.spyOn(prisma.produto, 'findUnique').mockResolvedValue(null);
    await expect(service.getProduct(999)).rejects.toThrow(
      'Produto não encontrado',
    );
  });
});
