import { IsOptional, IsNumber, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateContasPendentesDto {
  @ApiPropertyOptional({ example: 1, description: 'ID da venda relacionada' })
  @IsOptional()
  @IsNumber({}, { message: 'O vendaId deve ser um número.' })
  vendaId?: number;

  @ApiPropertyOptional({ example: 0.0, description: 'Valor pendente da conta' })
  @IsOptional()
  @IsNumber({}, { message: 'O valorPendente deve ser um número.' })
  @Min(0, { message: 'O valorPendente não pode ser negativo.' })
  valorPendente?: number;

  @ApiPropertyOptional({ example: 0.0, description: 'Valor recebido da conta' })
  @IsOptional()
  @IsNumber({}, { message: 'O valorRecebido deve ser um número.' })
  @Min(0, { message: 'O valorRecebido não pode ser negativo.' })
  valorRecebido?: number;
}
