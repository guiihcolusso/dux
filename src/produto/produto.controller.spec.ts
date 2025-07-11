import { Test, TestingModule } from '@nestjs/testing';
import { ProdutoController } from './produto.controller';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/createProduto.dto';
import { UpdateProdutoDto } from './dto/updateProduto.dto';

describe('ProdutoController', () => {
  let controller: ProdutoController;
  let service: ProdutoService;

  const mockProdutoService = {
    listAllProduct: jest.fn().mockResolvedValue(['produto1', 'produto2']),
    getProduct: jest.fn().mockResolvedValue({ id: 1 }),
    createProduct: jest.fn().mockResolvedValue({ id: 1 }),
    updateProduct: jest.fn().mockResolvedValue({ id: 1 }),
    deleteProduct: jest.fn().mockResolvedValue({ id: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutoController],
      providers: [{ provide: ProdutoService, useValue: mockProdutoService }],
    }).compile();

    controller = module.get<ProdutoController>(ProdutoController);
    service = module.get<ProdutoService>(ProdutoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('listAllProduct deve retornar todos os produtos', async () => {
    const result = await controller.listAllProduct();
    expect(result).toEqual(['produto1', 'produto2']);
    expect(service.listAllProduct).toHaveBeenCalled();
  });

  it('getProduct deve retornar um produto', async () => {
    const result = await controller.getProduct(1);
    expect(result).toEqual({ id: 1 });
    expect(service.getProduct).toHaveBeenCalledWith(1);
  });

  it('createProduct deve criar um produto', async () => {
    const dto = {} as CreateProdutoDto;
    const result = await controller.createProduct(dto);
    expect(result).toEqual({ id: 1 });
    expect(service.createProduct).toHaveBeenCalledWith(dto);
  });

  it('updateProduct deve atualizar um produto', async () => {
    const dto = {} as UpdateProdutoDto;
    const result = await controller.updateProduct(1, dto);
    expect(result).toEqual({ id: 1 });
    expect(service.updateProduct).toHaveBeenCalledWith(1, dto);
  });

  it('deleteProduct deve remover um produto', async () => {
    const result = await controller.deleteProduct(1);
    expect(result).toEqual({ id: 1 });
    expect(service.deleteProduct).toHaveBeenCalledWith(1);
  });
});
