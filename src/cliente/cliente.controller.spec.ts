import { Test, TestingModule } from '@nestjs/testing';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { CreateClientDto } from './dto/createClient.dto';
import { UpdateClientDto } from './dto/updateClient.dto';

describe('ClienteController', () => {
  let controller: ClienteController;
  let service: ClienteService;

  const mockService = {
    listAllCustomers: jest.fn().mockResolvedValue(['cliente1', 'cliente2']),
    getCustomer: jest.fn().mockResolvedValue({ id: 1 }),
    createCustomer: jest.fn().mockResolvedValue({ id: 1 }),
    updateCustomer: jest.fn().mockResolvedValue({ id: 1 }),
    deleteCustomer: jest.fn().mockResolvedValue({ id: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [{ provide: ClienteService, useValue: mockService }],
    }).compile();

    controller = module.get<ClienteController>(ClienteController);
    service = module.get<ClienteService>(ClienteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('listAllCustomers deve retornar todos os clientes', async () => {
    const result = await controller.listAllCustomers();
    expect(result).toEqual(['cliente1', 'cliente2']);
    expect(service.listAllCustomers).toHaveBeenCalled();
  });

  it('getCustomer deve retornar um cliente', async () => {
    const result = await controller.getCustomer(1);
    expect(result).toEqual({ id: 1 });
    expect(service.getCustomer).toHaveBeenCalledWith(1);
  });

  it('createCustomer deve criar um cliente', async () => {
    const dto = {} as CreateClientDto;
    const result = await controller.createCustomer(dto);
    expect(result).toEqual({ id: 1 });
    expect(service.createCustomer).toHaveBeenCalledWith(dto);
  });

  it('updateCustomer deve atualizar um cliente', async () => {
    const dto = {} as UpdateClientDto;
    const result = await controller.updateCustomer(1, dto);
    expect(result).toEqual({ id: 1 });
    expect(service.updateCustomer).toHaveBeenCalledWith(1, dto);
  });

  it('deleteCustomer deve remover um cliente', async () => {
    const result = await controller.deleteCustomer(1);
    expect(result).toEqual({ id: 1 });
    expect(service.deleteCustomer).toHaveBeenCalledWith(1);
  });
});
