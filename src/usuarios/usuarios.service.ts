import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/usuarios.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async listAllUsers() {
    return this.prisma.usuario.findMany({ omit: { password: true } });
  }

  async getUser(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
      omit: { password: true },
    });

    if (!user) {
      throw new NotFoundException(`Nenhum usuário localizado com o ID: ${id}.`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.usuario.create({
      data: {
        nome: createUserDto.nome,
        email: createUserDto.email,
        telefone: createUserDto.telefone,
        password: hash,
      },
      omit: { password: true },
    });
  }

  async updateUser(id: number, data: UpdateUserDto) {
    const checkUser = await this.prisma.usuario.findUnique({ where: { id } });

    if (!checkUser) {
      throw new NotFoundException(`Nenhum usuário localizado com o ID: ${id}.`);
    }

    if (data.password) {
      const hash = await bcrypt.hash(data.password, 10);
      return this.prisma.usuario.update({
        where: { id },
        data: {
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          password: hash,
        },
      });
    }

    return this.prisma.usuario.update({
      where: { id },
      data: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
      },
    });
  }

  async deleteUser(id: number) {
    const checkUser = await this.prisma.usuario.findUnique({ where: { id } });

    if (!checkUser) {
      throw new NotFoundException(`Nenhum usuário localizado com o ID: ${id}.`);
    }
    return this.prisma.usuario.delete({ where: { id } });
  }
}
