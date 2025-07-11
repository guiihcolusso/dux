import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { CreateItemVendaDto } from './dto/createItem.dto';
import { UpdateItemVendaDto } from './dto/updateItem.dto';

describe('ItemController', () => {
  let controller: ItemController;
  let service: ItemService;

  const mockItemService = {
    listAllItems: jest.fn().mockResolvedValue(['item1', 'item2']),
    getItem: jest.fn().mockResolvedValue({ id: 1 }),
    createItem: jest.fn().mockResolvedValue({ id: 1 }),
    updateItem: jest.fn().mockResolvedValue({ id: 1 }),
    deleteItem: jest.fn().mockResolvedValue({ id: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [{ provide: ItemService, useValue: mockItemService }],
    }).compile();

    controller = module.get<ItemController>(ItemController);
    service = module.get<ItemService>(ItemService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('listAllItems deve retornar todos os itens', async () => {
    const result = await controller.listAllItems();
    expect(result).toEqual(['item1', 'item2']);
    expect(service.listAllItems).toHaveBeenCalled();
  });

  it('getItem deve retornar um item', async () => {
    const result = await controller.getItem(1);
    expect(result).toEqual({ id: 1 });
    expect(service.getItem).toHaveBeenCalledWith(1);
  });

  it('createItem deve criar um item', async () => {
    const dto = {} as CreateItemVendaDto;
    const result = await controller.createItem(dto);
    expect(result).toEqual({ id: 1 });
    expect(service.createItem).toHaveBeenCalledWith(dto);
  });

  it('updateItem deve atualizar um item', async () => {
    const dto = {} as UpdateItemVendaDto;
    const result = await controller.updateItem(1, dto);
    expect(result).toEqual({ id: 1 });
    expect(service.updateItem).toHaveBeenCalledWith(1, dto);
  });

  it('deleteItem deve remover um item', async () => {
    const result = await controller.deleteItem(1);
    expect(result).toEqual({ id: 1 });
    expect(service.deleteItem).toHaveBeenCalledWith(1);
  });
});
