import { Test, TestingModule } from '@nestjs/testing';
import { ContasPendentesController } from './contas-pendentes.controller';

describe('ContasPendentesController', () => {
  let controller: ContasPendentesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContasPendentesController],
    }).compile();

    controller = module.get<ContasPendentesController>(
      ContasPendentesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
