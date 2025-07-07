import { Test, TestingModule } from '@nestjs/testing';
import { ContasPendentesService } from './contas-pendentes.service';

describe('ContasPendentesService', () => {
  let service: ContasPendentesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContasPendentesService],
    }).compile();

    service = module.get<ContasPendentesService>(ContasPendentesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
