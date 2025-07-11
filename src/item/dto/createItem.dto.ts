import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemVendaDto {
  @ApiProperty({ example: 1, description: 'ID da venda' })
  @IsNotEmpty({ message: 'O vendaId é obrigatório.' })
  @IsNumber({}, { message: 'O vendaId deve ser um número.' })
  vendaId: number;

  @ApiProperty({ example: 1, description: 'ID do produto' })
  @IsNotEmpty({ message: 'O produtoId é obrigatório.' })
  @IsNumber({}, { message: 'O produtoId deve ser um número.' })
  produtoId: number;

  @ApiProperty({ example: 5, description: 'Quantidade do produto na venda' })
  @IsNotEmpty({ message: 'A quantidade é obrigatória.' })
  @IsNumber({}, { message: 'A quantidade deve ser um número.' })
  @Min(1, { message: 'A quantidade deve ser pelo menos 1.' })
  quantidade: number;

  @ApiProperty({ example: 500.0, description: 'Valor total do item na venda' })
  @IsNotEmpty({ message: 'O valorTotal é obrigatório.' })
  @IsNumber({}, { message: 'O valorTotal deve ser um número.' })
  @Min(0, { message: 'O valorTotal não pode ser negativo.' })
  valorTotal: number;

  @ApiProperty({ example: 100.0, description: 'Valor unitário do produto' })
  @IsNotEmpty({ message: 'O valorUnitario é obrigatório.' })
  @IsNumber({}, { message: 'O valorUnitario deve ser um número.' })
  @Min(0, { message: 'O valorUnitario não pode ser negativo.' })
  valorUnitario: number;
}
