import { IsOptional, IsString, Length, IsNumber, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProdutoDto {
  @ApiPropertyOptional({
    example: 'Notebook Gamer',
    description: 'Nome do produto',
  })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string.' })
  @Length(2, 255, { message: 'O nome deve ter entre 2 e 255 caracteres.' })
  nome?: string;

  @ApiPropertyOptional({ example: 'Dell', description: 'Marca do produto' })
  @IsOptional()
  @IsString({ message: 'A marca deve ser uma string.' })
  @Length(2, 100, { message: 'A marca deve ter entre 2 e 100 caracteres.' })
  marca?: string;

  @ApiPropertyOptional({ example: 1500.0, description: 'Custo do produto' })
  @IsOptional()
  @IsNumber({}, { message: 'O custo deve ser um número.' })
  @Min(0, { message: 'O custo não pode ser negativo.' })
  custo?: number;

  @ApiPropertyOptional({
    example: 1800.0,
    description: 'Preço de revenda do produto',
  })
  @IsOptional()
  @IsNumber({}, { message: 'O preço de revenda deve ser um número.' })
  @Min(0, { message: 'O preço de revenda não pode ser negativo.' })
  revenda?: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'Estoque mínimo para alertas',
  })
  @IsOptional()
  @IsNumber({}, { message: 'O estoque mínimo deve ser um número.' })
  @Min(0, { message: 'O estoque mínimo não pode ser negativo.' })
  minStock?: number;
}
