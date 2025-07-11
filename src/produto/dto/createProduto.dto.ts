import { IsNotEmpty, IsString, Length, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProdutoDto {
  @ApiProperty({ example: 'Notebook Gamer', description: 'Nome do produto' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  @Length(2, 255, { message: 'O nome deve ter entre 2 e 255 caracteres.' })
  nome: string;

  @ApiProperty({ example: 'Dell', description: 'Marca do produto' })
  @IsNotEmpty({ message: 'A marca é obrigatória.' })
  @IsString({ message: 'A marca deve ser uma string.' })
  @Length(2, 100, { message: 'A marca deve ter entre 2 e 100 caracteres.' })
  marca: string;

  @ApiProperty({ example: 1500.0, description: 'Custo do produto' })
  @IsNotEmpty({ message: 'O custo é obrigatório.' })
  @IsNumber({}, { message: 'O custo deve ser um número.' })
  @Min(0, { message: 'O custo não pode ser negativo.' })
  custo: number;

  @ApiProperty({ example: 1800.0, description: 'Preço de revenda do produto' })
  @IsNotEmpty({ message: 'O preço de revenda é obrigatório.' })
  @IsNumber({}, { message: 'O preço de revenda deve ser um número.' })
  @Min(0, { message: 'O preço de revenda não pode ser negativo.' })
  revenda: number;

  @ApiProperty({ example: 10, description: 'Estoque mínimo para alertas' })
  @IsNotEmpty({ message: 'O estoque mínimo é obrigatório.' })
  @IsNumber({}, { message: 'O estoque mínimo deve ser um número.' })
  @Min(0, { message: 'O estoque mínimo não pode ser negativo.' })
  minStock: number;
}
