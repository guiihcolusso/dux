import { Test, TestingModule } from '@nestjs/testing';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { CreateUserDto, UpdateUserDto } from './dto/usuarios.dto';
import { NotFoundException } from '@nestjs/common';

// cspell:ignore Usuarios usuarios
describe('UsuariosController', () => {
  let controller: UsuariosController;
  let service: UsuariosService;

  const mockUser = {
    id: 1,
    nome: 'Teste',
    email: 'teste@example.com',
    telefone: '11999933459',
    password: 'securepassword',
  };

  const mockService = {
    listAllUsers: jest.fn(function (this: void): Promise<any> {
      return Promise.resolve([mockUser]);
    }),
    getUser: jest.fn(function (this: void): Promise<any> {
      return Promise.resolve(mockUser);
    }),
    createUser: jest.fn(function (this: void): Promise<any> {
      return Promise.resolve(mockUser);
    }),
    updateUser: jest.fn(function (this: void): Promise<any> {
      return Promise.resolve(mockUser);
    }),
    deleteUser: jest.fn(function (this: void): Promise<any> {
      return Promise.resolve(undefined);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [
        {
          provide: UsuariosService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<UsuariosController>(UsuariosController);
    service = module.get<UsuariosService>(UsuariosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('listAllUsers', () => {
    it('should return an array of users', async () => {
      const result = await controller.listAllUsers();
      expect(result).toEqual([mockUser]);
      expect(mockService.listAllUsers).toHaveBeenCalled();
    });
  });

  describe('getUser', () => {
    it('should return a single user', async () => {
      const result = await controller.getUser(1);
      expect(result).toEqual(mockUser);
      await controller.getUser(1);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockService.getUser.mockImplementation(function (
        this: void,
      ): Promise<any> {
        return Promise.reject(
          new NotFoundException(`Usuário com id 999 não encontrado.`),
        );
      });
      await expect(controller.getUser(999)).rejects.toThrow(
        'Usuário com id 999 não encontrado.',
      );
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        nome: 'Teste',
        email: 'teste@example.com',
        telefone: '11999933459',
        password: 'securepassword',
      };
      const result = await controller.createUser(createUserDto);
      expect(result).toEqual(mockUser);
      expect(mockService.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        nome: 'Teste Atualizado',
        email: 'teste.atualizado@example.com',
        password: 'newpassword',
      };
      const result = await controller.updateUser(1, updateUserDto);
      expect(result).toEqual(mockUser);
      expect(mockService.updateUser).toHaveBeenCalledWith(1, updateUserDto);
    });

    it('should throw NotFoundException if user not found', async () => {
      const updateUserDto: UpdateUserDto = {
        nome: 'Teste Atualizado',
        email: 'teste.atualizado@example.com',
        password: 'newpassword',
      };
      mockService.updateUser.mockImplementation(function (
        this: void,
      ): Promise<any> {
        return Promise.reject(
          new NotFoundException(`Usuário com id 999 não encontrado.`),
        );
      });
      await expect(controller.updateUser(999, updateUserDto)).rejects.toThrow(
        'Usuário com id 999 não encontrado.',
      );
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const result = await controller.deleteUser(1);
      expect(result).toBeUndefined();
      expect(mockService.deleteUser).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockService.deleteUser.mockImplementation(function (
        this: void,
      ): Promise<any> {
        return Promise.reject(
          new NotFoundException(`Usuário com id 999 não encontrado.`),
        );
      });
      await expect(controller.deleteUser(999)).rejects.toThrow(
        'Usuário com id 999 não encontrado.',
      );
    });
  });
});
