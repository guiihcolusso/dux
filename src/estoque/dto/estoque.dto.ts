import { IsInt, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEstoqueDto {
  @ApiProperty({ example: 1, description: 'ID do produto' })
  @IsNotEmpty({ message: 'O produtoId é obrigatório.' })
  @IsInt({ message: 'O produtoId deve ser um número inteiro.' })
  produtoId: number;

  @ApiProperty({
    example: 100,
    description: 'Quantidade disponível no estoque',
  })
  @IsNotEmpty({ message: 'A quantidade disponível é obrigatória.' })
  @IsInt({ message: 'A quantidade disponível deve ser um número inteiro.' })
  @Min(0, { message: 'A quantidade disponível não pode ser negativa.' })
  qtdDisponivel: number;
}

export class UpdateEstoqueDto {
  @ApiProperty({
    example: 100,
    description: 'Quantidade disponível no estoque',
    required: false,
  })
  @IsInt({ message: 'A quantidade disponível deve ser um número inteiro.' })
  @Min(0, { message: 'A quantidade disponível não pode ser negativa.' })
  qtdDisponivel?: number;
}
