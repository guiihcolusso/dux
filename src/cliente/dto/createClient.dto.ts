import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, Length, MaxDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    example: 'João Silva',
    description: 'Nome completo do cliente',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string.' })
  @Length(2, 255, { message: 'O nome deve ter entre 2 e 255 caracteres.' })
  nome: string;

  @ApiProperty({
    example: '1990-01-01T00:00:00.000Z',
    description: 'Data de nascimento do cliente (formato ISO-8601)',
  })
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória.' })
  @Type(() => Date)
  @IsDate({
    message: 'A data de nascimento deve ser uma data válida (ISO-8601).',
  })
  @MaxDate(new Date(), {
    message: 'A data de nascimento não pode ser no futuro.',
  })
  nascimento: Date;

  @ApiProperty({ example: '11999999999', description: 'Telefone do cliente' })
  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  @IsString({ message: 'O telefone deve ser uma string.' })
  @Length(10, 20, {
    message: 'O telefone deve ter entre 10 e 20 caracteres.',
  })
  telefone: string;

  @ApiProperty({ example: 'Centro', description: 'Bairro do cliente' })
  @IsNotEmpty({ message: 'O bairro é obrigatório.' })
  @IsString({ message: 'O bairro deve ser uma string.' })
  @Length(2, 100, { message: 'O bairro deve ter entre 2 e 100 caracteres.' })
  bairro: string;

  @ApiProperty({ example: 'Rua das Flores', description: 'Rua do cliente' })
  @IsNotEmpty({ message: 'A rua é obrigatória.' })
  @IsString({ message: 'A rua deve ser uma string.' })
  @Length(2, 255, { message: 'A rua deve ter entre 2 e 255 caracteres.' })
  rua: string;

  @ApiProperty({ example: 'São Paulo', description: 'Cidade do cliente' })
  @IsNotEmpty({ message: 'A cidade é obrigatória.' })
  @IsString({ message: 'A cidade deve ser uma string.' })
  @Length(2, 100, { message: 'A cidade deve ter entre 2 e 100 caracteres.' })
  cidade: string;

  @ApiProperty({ example: 'SP', description: 'Estado do cliente (sigla)' })
  @IsNotEmpty({ message: 'O estado é obrigatório.' })
  @IsString({ message: 'O estado deve ser uma sigla.' })
  @Length(2, 2, { message: 'O estado deve ter 2 letras.' })
  estado: string;
}
