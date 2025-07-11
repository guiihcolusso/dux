import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
  })
  @IsString({ message: 'O nome deve ser uma string.' })
  nome: string;

  @ApiProperty({
    description: 'E-mail válido do usuário',
    example: 'teste@example.com',
  })
  @IsEmail({}, { message: 'O e-mail informado não é válido.' })
  email: string;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '+55 11 9XXXX-YYYY',
  })
  @IsPhoneNumber('BR', {
    message: 'Telefone deve ser um número válido do Brasil',
  })
  telefone: string;

  @ApiProperty({
    description: 'Senha do usuário com no mínimo 8 caracteres',
    minLength: 8,
    example: 'Exemplo@1234',
  })
  @IsString({
    message: 'Senha inválida: deve ser uma sequência de caracteres (string).',
  })
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
  password: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Nome completo do usuário',
    example: 'João Silva',
  })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string.' })
  nome?: string;

  @ApiPropertyOptional({
    description: 'E-mail válido do usuário',
    example: 'teste@example.com',
  })
  @IsOptional()
  @IsEmail({}, { message: 'O e-mail informado não é válido.' })
  email?: string;

  @ApiPropertyOptional({
    description: 'Telefone do usuário',
    example: '+55 11 9XXXX-YYYY',
  })
  @IsOptional()
  @IsPhoneNumber('BR', {
    message: 'Telefone deve ser um número válido do Brasil',
  })
  telefone?: string;

  @ApiPropertyOptional({
    description: 'Senha do usuário com no mínimo 8 caracteres',
    minLength: 8,
    example: 'Exemplo@1234',
  })
  @IsOptional()
  @IsString({
    message: 'Senha inválida: deve ser uma sequência de caracteres (string).',
  })
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
  password?: string;
}
