import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContasPendentesDto {
  @ApiProperty({ example: 1, description: 'ID da venda relacionada' })
  @IsNotEmpty({ message: 'O vendaId é obrigatório.' })
  @IsNumber({}, { message: 'O vendaId deve ser um número.' })
  vendaId: number;

  @ApiProperty({ example: 0.0, description: 'Valor pendente da conta' })
  @IsNotEmpty({ message: 'O valorPendente é obrigatório.' })
  @IsNumber({}, { message: 'O valorPendente deve ser um número.' })
  @Min(0, { message: 'O valorPendente não pode ser negativo.' })
  valorPendente: number;

  @ApiProperty({ example: 0.0, description: 'Valor recebido da conta' })
  @IsNotEmpty({ message: 'O valorRecebido é obrigatório.' })
  @IsNumber({}, { message: 'O valorRecebido deve ser um número.' })
  @Min(0, { message: 'O valorRecebido não pode ser negativo.' })
  valorRecebido: number;
}
