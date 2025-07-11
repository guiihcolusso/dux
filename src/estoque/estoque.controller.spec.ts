import { Test, TestingModule } from '@nestjs/testing';
import { EstoqueController } from './estoque.controller';
import { EstoqueService } from './estoque.service';
import { CreateEstoqueDto, UpdateEstoqueDto } from './dto/estoque.dto';

describe('EstoqueController', () => {
  let controller: EstoqueController;
  let service: EstoqueService;

  const mockEstoqueService = {
    listAllStocks: jest.fn().mockResolvedValue(['estoque1', 'estoque2']),
    getStock: jest.fn().mockResolvedValue({ id: 1 }),
    createStock: jest.fn().mockResolvedValue({ id: 1 }),
    updateStock: jest.fn().mockResolvedValue({ id: 1 }),
    deleteStock: jest.fn().mockResolvedValue({ id: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstoqueController],
      providers: [{ provide: EstoqueService, useValue: mockEstoqueService }],
    }).compile();

    controller = module.get<EstoqueController>(EstoqueController);
    service = module.get<EstoqueService>(EstoqueService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('listAllStocks deve retornar todos os estoques', async () => {
    const result = await controller.listAllStocks();
    expect(result).toEqual(['estoque1', 'estoque2']);
    expect(service.listAllStocks).toHaveBeenCalled();
  });

  it('getStock deve retornar um estoque', async () => {
    const result = await controller.getStock(1);
    expect(result).toEqual({ id: 1 });
    expect(service.getStock).toHaveBeenCalledWith(1);
  });

  it('createStock deve criar um estoque', async () => {
    const dto = {} as CreateEstoqueDto;
    const result = await controller.createStock(dto);
    expect(result).toEqual({ id: 1 });
    expect(service.createStock).toHaveBeenCalledWith(dto);
  });

  it('updateStock deve atualizar um estoque', async () => {
    const dto = {} as UpdateEstoqueDto;
    const result = await controller.updateStock(1, dto);
    expect(result).toEqual({ id: 1 });
    expect(service.updateStock).toHaveBeenCalledWith(1, dto);
  });

  it('deleteStock deve remover um estoque', async () => {
    const result = await controller.deleteStock(1);
    expect(result).toEqual({ id: 1 });
    expect(service.deleteStock).toHaveBeenCalledWith(1);
  });
});
