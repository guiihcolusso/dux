import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVendaDto {
  @ApiProperty({ example: 1, description: 'ID do cliente' })
  @IsNotEmpty({ message: 'O clienteId é obrigatório.' })
  @IsNumber({}, { message: 'O clienteId deve ser um número.' })
  clienteId: number;

  @ApiProperty({ example: 2, description: 'ID do usuário/vendedor' })
  @IsNotEmpty({ message: 'O usuarioId é obrigatório.' })
  @IsNumber({}, { message: 'O usuarioId deve ser um número.' })
  usuarioId: number;

  @ApiProperty({ example: 150.75, description: 'Valor total da venda' })
  @IsNotEmpty({ message: 'O valorTotal é obrigatório.' })
  @IsNumber({}, { message: 'O valorTotal deve ser um número.' })
  @Min(0, { message: 'O valorTotal não pode ser negativo.' })
  valorTotal: number;

  @ApiProperty({ example: 0.0, description: 'Desconto aplicado na venda' })
  @IsNotEmpty({ message: 'O desconto é obrigatório.' })
  @IsNumber({}, { message: 'O desconto deve ser um número.' })
  @Min(0, { message: 'O desconto não pode ser negativo.' })
  desconto: number;

  @ApiProperty({
    example: '2025-07-10T15:30:00Z',
    description: 'Data da venda',
  })
  @Type(() => Date)
  @IsDate({ message: 'A data deve ser uma data válida.' })
  data: Date;
}
