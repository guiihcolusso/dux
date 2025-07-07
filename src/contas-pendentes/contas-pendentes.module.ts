import { Module } from '@nestjs/common';
import { ContasPendentesController } from './contas-pendentes.controller';
import { ContasPendentesService } from './contas-pendentes.service';

@Module({
  controllers: [ContasPendentesController],
  providers: [ContasPendentesService],
})
export class ContasPendentesModule {}
