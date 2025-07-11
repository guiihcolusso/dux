import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, Length, MaxDate } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateClientDto {
  @ApiPropertyOptional({
    example: 'João Silva',
    description: 'Nome completo do cliente',
  })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string.' })
  @Length(2, 255, { message: 'O nome deve ter entre 2 e 255 caracteres.' })
  nome?: string;

  @ApiPropertyOptional({
    example: '1990-01-01',
    description: 'Data de nascimento do cliente',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'A data de nascimento deve ser uma data válida.' })
  @MaxDate(new Date(), {
    message: 'A data de nascimento não pode ser no futuro.',
  })
  nascimento?: Date;

  @ApiPropertyOptional({
    example: '11999999999',
    description: 'Telefone do cliente',
  })
  @IsOptional()
  @IsString({ message: 'O telefone deve ser uma string.' })
  @Length(10, 20, {
    message: 'O telefone deve ter entre 10 e 20 caracteres.',
  })
  telefone?: string;

  @ApiPropertyOptional({ example: 'Centro', description: 'Bairro do cliente' })
  @IsOptional()
  @IsString({ message: 'O bairro deve ser uma string.' })
  @Length(2, 100, { message: 'O bairro deve ter entre 2 e 100 caracteres.' })
  bairro?: string;

  @ApiPropertyOptional({
    example: 'Rua das Flores',
    description: 'Rua do cliente',
  })
  @IsOptional()
  @IsString({ message: 'A rua deve ser uma string.' })
  @Length(2, 255, { message: 'A rua deve ter entre 2 e 255 caracteres.' })
  rua?: string;

  @ApiPropertyOptional({
    example: 'São Paulo',
    description: 'Cidade do cliente',
  })
  @IsOptional()
  @IsString({ message: 'A cidade deve ser uma string.' })
  @Length(2, 100, { message: 'A cidade deve ter entre 2 e 100 caracteres.' })
  cidade?: string;

  @ApiPropertyOptional({
    example: 'SP',
    description: 'Estado do cliente (sigla)',
  })
  @IsOptional()
  @IsString({ message: 'O estado deve ser uma sigla.' })
  @Length(2, 2, { message: 'O estado deve ter 2 letras.' })
  estado?: string;
}
