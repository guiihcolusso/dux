import { IsOptional, IsNumber, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateItemVendaDto {
  @ApiPropertyOptional({ example: 1, description: 'ID da venda' })
  @IsOptional()
  @IsNumber({}, { message: 'O vendaId deve ser um número.' })
  vendaId?: number;

  @ApiPropertyOptional({ example: 1, description: 'ID do produto' })
  @IsOptional()
  @IsNumber({}, { message: 'O produtoId deve ser um número.' })
  produtoId?: number;

  @ApiPropertyOptional({
    example: 5,
    description: 'Quantidade do produto na venda',
  })
  @IsOptional()
  @IsNumber({}, { message: 'A quantidade deve ser um número.' })
  @Min(1, { message: 'A quantidade deve ser pelo menos 1.' })
  quantidade?: number;

  @ApiPropertyOptional({
    example: 500.0,
    description: 'Valor total do item na venda',
  })
  @IsOptional()
  @IsNumber({}, { message: 'O valorTotal deve ser um número.' })
  @Min(0, { message: 'O valorTotal não pode ser negativo.' })
  valorTotal?: number;

  @ApiPropertyOptional({
    example: 100.0,
    description: 'Valor unitário do produto',
  })
  @IsOptional()
  @IsNumber({}, { message: 'O valorUnitario deve ser um número.' })
  @Min(0, { message: 'O valorUnitario não pode ser negativo.' })
  valorUnitario?: number;
}
