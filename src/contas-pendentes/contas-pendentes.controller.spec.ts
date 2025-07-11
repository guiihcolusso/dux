import { Test, TestingModule } from '@nestjs/testing';
import { ContasPendentesController } from './contas-pendentes.controller';
import { ContasPendentesService } from './contas-pendentes.service';
import { CreateContasPendentesDto } from './dto/create-ContasPendentes.dto';
import { UpdateContasPendentesDto } from './dto/update-ContasPendentes.dto';

describe('ContasPendentesController', () => {
  let controller: ContasPendentesController;
  let service: ContasPendentesService;

  const mockService = {
    listAllPendingAccounts: jest.fn().mockResolvedValue(['conta1', 'conta2']),
    getPendingAccount: jest.fn().mockResolvedValue({ id: 1 }),
    createPendingAccount: jest.fn().mockResolvedValue({ id: 1 }),
    updatePendingAccount: jest.fn().mockResolvedValue({ id: 1 }),
    deletePendingAccount: jest.fn().mockResolvedValue({ id: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContasPendentesController],
      providers: [{ provide: ContasPendentesService, useValue: mockService }],
    }).compile();

    controller = module.get<ContasPendentesController>(
      ContasPendentesController,
    );
    service = module.get<ContasPendentesService>(ContasPendentesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('listAllPendingAccounts deve retornar todas as contas', async () => {
    const result = await controller.listAllPendingAccounts();
    expect(result).toEqual(['conta1', 'conta2']);
    expect(service.listAllPendingAccounts).toHaveBeenCalled();
  });

  it('getPendingAccount deve retornar uma conta', async () => {
    const result = await controller.getPendingAccount(1);
    expect(result).toEqual({ id: 1 });
    expect(service.getPendingAccount).toHaveBeenCalledWith(1);
  });

  it('createPendingAccount deve criar uma conta', async () => {
    const dto = {} as CreateContasPendentesDto;
    const result = await controller.createPendingAccount(dto);
    expect(result).toEqual({ id: 1 });
    expect(service.createPendingAccount).toHaveBeenCalledWith(dto);
  });

  it('updatePendingAccount deve atualizar uma conta', async () => {
    const dto = {} as UpdateContasPendentesDto;
    const result = await controller.updatePendingAccount(1, dto);
    expect(result).toEqual({ id: 1 });
    expect(service.updatePendingAccount).toHaveBeenCalledWith(1, dto);
  });

  it('deletePendingAccount deve remover uma conta', async () => {
    const result = await controller.deletePendingAccount(1);
    expect(result).toEqual({ id: 1 });
    expect(service.deletePendingAccount).toHaveBeenCalledWith(1);
  });
});
