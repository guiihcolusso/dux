import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('App E2E', () => {
  let app: INestApplication;
  let server: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  // Remova o teste da raiz, pois não existe rota /v1/api/

  describe('/usuarios', () => {
    let userId: number;
    const userDto = {
      nome: 'Usuário E2E',
      email: 'e2euser@example.com',
      telefone: '11999999999',
      password: 'senhaSegura123',
    };

    it('POST /usuarios', async () => {
      const res = await request(server)
        .post('/v1/api/usuarios')
        .send(userDto)
        .expect(201);
      expect(res.body).toMatchObject({
        nome: userDto.nome,
        email: userDto.email,
        telefone: userDto.telefone,
      });
      userId = res.body.id;
    });

    it('GET /usuarios', async () => {
      const res = await request(server).get('/v1/api/usuarios').expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      // Permite que o id seja string ou number, para compatibilidade com o retorno do Prisma
      expect(res.body.some((u: any) => String(u.id) === String(userId))).toBe(
        true,
      );
    });

    it('GET /usuarios/:id', async () => {
      const res = await request(server)
        .get(`/v1/api/usuarios/${userId}`)
        .expect(200);
      expect(res.body).toMatchObject({ id: userId, nome: userDto.nome });
    });

    it('PUT /usuarios/:id', async () => {
      const update = { nome: 'Usuário Atualizado' };
      const res = await request(server)
        .put(`/v1/api/usuarios/${userId}`)
        .send(update)
        .expect(200);
      expect(res.body.nome).toBe(update.nome);
    });

    it('DELETE /usuarios/:id', async () => {
      await request(server).delete(`/v1/api/usuarios/${userId}`).expect(200);
    });
  });

  describe('/produto', () => {
    let produtoId: number;
    const produtoDto = {
      nome: 'Produto E2E',
      preco: 10.5,
      quantidade: 5,
    };

    it('POST /produto', async () => {
      const res = await request(server)
        .post('/v1/api/produto')
        .send(produtoDto)
        .expect(201);
      expect(res.body).toMatchObject({
        nome: produtoDto.nome,
        preco: produtoDto.preco,
      });
      produtoId = res.body.id;
    });

    it('GET /produto', async () => {
      const res = await request(server).get('/v1/api/produto').expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(
        res.body.some((p: any) => String(p.id) === String(produtoId)),
      ).toBe(true);
    });

    it('GET /produto/:id', async () => {
      const res = await request(server)
        .get(`/v1/api/produto/${produtoId}`)
        .expect(200);
      expect(res.body).toMatchObject({ id: produtoId, nome: produtoDto.nome });
    });

    it('PUT /produto/:id', async () => {
      const update = { nome: 'Produto Atualizado' };
      const res = await request(server)
        .put(`/v1/api/produto/${produtoId}`)
        .send(update)
        .expect(200);
      expect(res.body.nome).toBe(update.nome);
    });

    it('DELETE /produto/:id', async () => {
      await request(server).delete(`/v1/api/produto/${produtoId}`).expect(200);
    });
  });

  describe('/cliente', () => {
    let clienteId: number;
    const clienteDto = {
      nome: 'Cliente E2E',
      email: 'cliente@e2e.com',
      telefone: '11988887777',
    };

    it('POST /cliente', async () => {
      const res = await request(server)
        .post('/v1/api/cliente')
        .send(clienteDto)
        .expect(201);
      expect(res.body).toMatchObject({
        nome: clienteDto.nome,
        email: clienteDto.email,
      });
      clienteId = res.body.id;
    });

    it('GET /cliente', async () => {
      const res = await request(server).get('/v1/api/cliente').expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(
        res.body.some((c: any) => String(c.id) === String(clienteId)),
      ).toBe(true);
    });

    it('GET /cliente/:id', async () => {
      const res = await request(server)
        .get(`/v1/api/cliente/${clienteId}`)
        .expect(200);
      expect(res.body).toMatchObject({ id: clienteId, nome: clienteDto.nome });
    });

    it('PUT /cliente/:id', async () => {
      const update = { nome: 'Cliente Atualizado' };
      const res = await request(server)
        .put(`/v1/api/cliente/${clienteId}`)
        .send(update)
        .expect(200);
      expect(res.body.nome).toBe(update.nome);
    });

    it('DELETE /cliente/:id', async () => {
      await request(server).delete(`/v1/api/cliente/${clienteId}`).expect(200);
    });
  });

  // Adicione blocos semelhantes para item, estoque, venda, contas-pendentes conforme necessário
});
