import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosService } from './usuarios.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/usuarios.dto';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('UsuariosService', () => {
  let service: UsuariosService;
  let prisma: PrismaService;

  const mockUser = {
    id: 1,
    nome: 'Teste',
    email: 'teste@example.com',
    password: 'securepassword',
  };

  type UserOrNull = typeof mockUser | null;

  const mockPrismaService = {
    usuarios: {
      findMany: jest.fn(
        (): Promise<(typeof mockUser)[]> => Promise.resolve([mockUser]),
      ),
      findUnique: jest.fn((): Promise<UserOrNull> => Promise.resolve(mockUser)),
      create: jest.fn(
        (): Promise<typeof mockUser> => Promise.resolve(mockUser),
      ),
      update: jest.fn(
        (): Promise<typeof mockUser> => Promise.resolve(mockUser),
      ),
      delete: jest.fn(
        (): Promise<typeof mockUser> => Promise.resolve(mockUser),
      ),
    },
  };

  beforeEach(async () => {
    jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(
        (): Promise<string> => Promise.resolve('hashedPassword123'),
      );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuariosService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsuariosService>(UsuariosService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listAllUsers', () => {
    it('should return an array of users', async () => {
      const result = await service.listAllUsers();
      expect(result).toEqual([mockUser]);
      expect(prisma.usuarios.findMany).toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should return a single user', async () => {
      const result = await service.getUser(1);
      expect(result).toEqual(mockUser);
      expect(prisma.usuarios.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      mockPrismaService.usuarios.findUnique.mockImplementation(
        (): Promise<UserOrNull> => Promise.resolve(null),
      );
      await expect(service.getUser(999)).rejects.toThrow(
        new NotFoundException(
          `Usuário não localizado para o ID informado: 999`,
        ),
      );
    });
  });

  describe('createUser', () => {
    it('should create a user with hashed password', async () => {
      const createUserDto: CreateUserDto = {
        nome: 'Teste',
        email: 'teste@example.com',
        telefone: '1199993345',
        password: 'securepassword',
      };

      const mockUserWithHash = {
        id: 1,
        nome: 'Teste',
        email: 'teste@example.com',
        telefone: '1199993345',
        password: 'hashedPassword123',
      };

      mockPrismaService.usuarios.create.mockResolvedValue(mockUserWithHash);

      const result = await service.createUser(createUserDto);

      expect(prisma.usuarios.create).toHaveBeenCalledWith({
        data: {
          ...createUserDto,
          password: 'hashedPassword123',
        },
      });

      expect(result).toEqual(mockUserWithHash);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        nome: 'Teste Atualizado',
        email: 'teste.atualizado@example.com',
        password: 'newpassword',
      };
      const result = await service.updateUser(1, updateUserDto);
      expect(result).toEqual(mockUser);
      expect(prisma.usuarios.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateUserDto,
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      const updateUserDto: UpdateUserDto = {
        nome: 'Teste Atualizado',
        email: 'teste.atualizado@example.com',
        password: 'newpassword',
      };
      mockPrismaService.usuarios.update.mockImplementation(() =>
        Promise.reject(
          new NotFoundException(`Usuário com id 999 não encontrado.`),
        ),
      );
      await expect(service.updateUser(999, updateUserDto)).rejects.toThrow(
        new NotFoundException(`Usuário com id 999 não encontrado.`),
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const result = await service.deleteUser(1);
      expect(result).toEqual(mockUser);
      expect(prisma.usuarios.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if user not found', async () => {
      mockPrismaService.usuarios.delete.mockImplementation(() =>
        Promise.reject(
          new NotFoundException(`Usuário com id 999 não encontrado.`),
        ),
      );
      await expect(service.deleteUser(999)).rejects.toThrow(
        new NotFoundException(`Usuário com id 999 não encontrado.`),
      );
    });
  });
});
