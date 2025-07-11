import { Test, TestingModule } from '@nestjs/testing';
import { VendaController } from './venda.controller';
import { VendaService } from './venda.service';
import { CreateVendaDto } from './dto/createVenda.dto';
import { UpdateVendaDto } from './dto/updateVenda.dto';

describe('VendaController', () => {
  let controller: VendaController;
  let service: VendaService;

  const mockVendaService = {
    listAllSale: jest.fn().mockResolvedValue(['venda1', 'venda2']),
    getSale: jest.fn().mockResolvedValue({ id: 1 }),
    createSale: jest.fn().mockResolvedValue({ id: 1 }),
    updateSale: jest.fn().mockResolvedValue({ id: 1 }),
    deleteSale: jest.fn().mockResolvedValue({ id: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendaController],
      providers: [{ provide: VendaService, useValue: mockVendaService }],
    }).compile();

    controller = module.get<VendaController>(VendaController);
    service = module.get<VendaService>(VendaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('listAllSale deve retornar todas as vendas', async () => {
    const result = await controller.listAllSale();
    expect(result).toEqual(['venda1', 'venda2']);
    expect(service.listAllSale).toHaveBeenCalled();
  });

  it('getSale deve retornar uma venda', async () => {
    const result = await controller.getSale(1);
    expect(result).toEqual({ id: 1 });
    expect(service.getSale).toHaveBeenCalledWith(1);
  });

  it('createSale deve criar uma venda', async () => {
    const dto = {} as CreateVendaDto;
    const result = await controller.createSale(dto);
    expect(result).toEqual({ id: 1 });
    expect(service.createSale).toHaveBeenCalledWith(dto);
  });

  it('updateSale deve atualizar uma venda', async () => {
    const dto = {} as UpdateVendaDto;
    const result = await controller.updateSale(1, dto);
    expect(result).toEqual({ id: 1 });
    expect(service.updateSale).toHaveBeenCalledWith(1, dto);
  });

  it('deleteSale deve remover uma venda', async () => {
    const result = await controller.deleteSale(1);
    expect(result).toEqual({ id: 1 });
    expect(service.deleteSale).toHaveBeenCalledWith(1);
  });
});
