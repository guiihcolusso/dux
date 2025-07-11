import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateVendaDto {
  @ApiPropertyOptional({ example: 1, description: 'ID do cliente' })
  @IsOptional()
  @IsNumber({}, { message: 'O clienteId deve ser um número.' })
  clienteId?: number;

  @ApiPropertyOptional({ example: 2, description: 'ID do usuário/vendedor' })
  @IsOptional()
  @IsNumber({}, { message: 'O usuarioId deve ser um número.' })
  usuarioId?: number;

  @ApiPropertyOptional({ example: 150.75, description: 'Valor total da venda' })
  @IsOptional()
  @IsNumber({}, { message: 'O valorTotal deve ser um número.' })
  @Min(0, { message: 'O valorTotal não pode ser negativo.' })
  valorTotal?: number;

  @ApiPropertyOptional({
    example: 0.0,
    description: 'Desconto aplicado na venda',
  })
  @IsOptional()
  @IsNumber({}, { message: 'O desconto deve ser um número.' })
  @Min(0, { message: 'O desconto não pode ser negativo.' })
  desconto?: number;

  @ApiPropertyOptional({
    example: '2025-07-10T15:30:00Z',
    description: 'Data da venda',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'A data deve ser uma data válida.' })
  data?: Date;
}
