import { Test, TestingModule } from '@nestjs/testing';
import { ItemService } from './item.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ItemService', () => {
  let service: ItemService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemService, PrismaService],
    }).compile();

    service = module.get<ItemService>(ItemService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('listAllItems deve chamar prisma.itemVenda.findMany', async () => {
    const findManySpy = jest
      .spyOn(prisma.itemVenda, 'findMany')
      .mockResolvedValue([]);
    await service.listAllItems();
    expect(findManySpy).toHaveBeenCalled();
  });

  it('getItem deve retornar item existente', async () => {
    jest
      .spyOn(prisma.itemVenda, 'findUnique')
      .mockResolvedValue({ id: 1 } as any);
    const result = await service.getItem(1);
    expect(result).toEqual({ id: 1 });
  });

  it('getItem deve lançar erro se item não existir', async () => {
    jest.spyOn(prisma.itemVenda, 'findUnique').mockResolvedValue(null);
    await expect(service.getItem(999)).rejects.toThrow('Item não encontrado');
  });
});
