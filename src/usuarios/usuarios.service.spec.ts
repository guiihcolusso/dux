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
    telefone: '11999933459',
    password: 'securepassword',
  };

  type UserOrNull = typeof mockUser | null;

  const mockPrismaService = {
    usuario: {
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
      expect(mockPrismaService.usuario.findMany).toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should return a single user', async () => {
      const result = await service.getUser(1);
      expect(result).toEqual(mockUser);
      expect(mockPrismaService.usuario.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        omit: { password: true },
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      mockPrismaService.usuario.findUnique.mockImplementation(
        (): Promise<UserOrNull> => Promise.resolve(null),
      );
      await expect(service.getUser(999)).rejects.toThrow(
        new NotFoundException(`Nenhum usuário localizado com o ID: 999.`),
      );
    });
  });

  describe('createUser', () => {
    it('should create a user with hashed password', async () => {
      const createUserDto: CreateUserDto = {
        nome: 'Teste',
        email: 'teste@example.com',
        telefone: '11999933459',
        password: 'securepassword',
      };

      const mockUserWithHash = {
        id: 1,
        nome: 'Teste',
        email: 'teste@example.com',
        telefone: '11999933459',
        password: 'hashedPassword123',
      };

      mockPrismaService.usuario.create.mockResolvedValue(mockUserWithHash);

      const result = await service.createUser(createUserDto);

      expect(mockPrismaService.usuario.create).toHaveBeenCalledWith({
        data: {
          ...createUserDto,
          password: 'hashedPassword123',
        },
        omit: { password: true },
      });

      expect(result).toEqual(mockUserWithHash);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      // O service faz um findUnique antes do update, então precisamos mockar isso
      mockPrismaService.usuario.findUnique.mockResolvedValueOnce(mockUser);
      const updateUserDto: UpdateUserDto = {
        nome: 'Teste Atualizado',
        email: 'teste.atualizado@example.com',
        password: 'newpassword',
      };
      const result = await service.updateUser(1, updateUserDto);
      expect(result).toEqual(mockUser);
      expect(mockPrismaService.usuario.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          ...updateUserDto,
          password: 'hashedPassword123',
          telefone: undefined,
        },
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      const updateUserDto: UpdateUserDto = {
        nome: 'Teste Atualizado',
        email: 'teste.atualizado@example.com',
        password: 'newpassword',
      };
      mockPrismaService.usuario.findUnique.mockResolvedValueOnce(null);
      await expect(service.updateUser(999, updateUserDto)).rejects.toThrow(
        new NotFoundException(`Nenhum usuário localizado com o ID: 999.`),
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      // O service faz um findUnique antes do delete, então precisamos mockar isso
      mockPrismaService.usuario.findUnique.mockResolvedValueOnce(mockUser);
      const result = await service.deleteUser(1);
      expect(result).toEqual(mockUser);
      expect(mockPrismaService.usuario.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      mockPrismaService.usuario.findUnique.mockResolvedValueOnce(null);
      await expect(service.deleteUser(999)).rejects.toThrow(
        new NotFoundException(`Nenhum usuário localizado com o ID: 999.`),
      );
    });
  });
});
