import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ClienteModule } from './cliente/cliente.module';
import { ProdutoModule } from './produto/produto.module';
import { EstoqueModule } from './estoque/estoque.module';
import { VendaModule } from './venda/venda.module';
import { ContasPendentesModule } from './contas-pendentes/contas-pendentes.module';
import { ItemModule } from './item/item.module';
import { UsuariosModule } from './usuarios/usuarios.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ClienteModule,
    ProdutoModule,
    EstoqueModule,
    VendaModule,
    ContasPendentesModule,
    ItemModule,
    UsuariosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
