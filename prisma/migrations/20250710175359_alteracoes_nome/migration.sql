/*
  Warnings:

  - You are about to drop the `cliente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `contas_pendentes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `estoque` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `produto` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `telefone` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "contas_pendentes" DROP CONSTRAINT "contas_pendentes_id_venda_fkey";

-- DropForeignKey
ALTER TABLE "estoque" DROP CONSTRAINT "estoque_id_produto_fkey";

-- DropForeignKey
ALTER TABLE "itens" DROP CONSTRAINT "itens_id_produto_fkey";

-- DropForeignKey
ALTER TABLE "itens" DROP CONSTRAINT "itens_id_venda_fkey";

-- DropForeignKey
ALTER TABLE "vendas" DROP CONSTRAINT "vendas_id_cliente_fkey";

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "telefone" SET NOT NULL;

-- DropTable
DROP TABLE "cliente";

-- DropTable
DROP TABLE "contas_pendentes";

-- DropTable
DROP TABLE "estoque";

-- DropTable
DROP TABLE "itens";

-- DropTable
DROP TABLE "produto";

-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "nascimento" TIMESTAMP(3) NOT NULL,
    "telefone" VARCHAR(20) NOT NULL,
    "bairro" VARCHAR(100) NOT NULL,
    "rua" VARCHAR(255) NOT NULL,
    "cidade" VARCHAR(100) NOT NULL,
    "estado" VARCHAR(2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "marca" VARCHAR(100) NOT NULL,
    "custo" DECIMAL(10,2) NOT NULL,
    "revenda" DECIMAL(10,2) NOT NULL,
    "minStock" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estoques" (
    "id" SERIAL NOT NULL,
    "id_produto" INTEGER NOT NULL,
    "qtd_disponivel" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estoques_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContasPendentes" (
    "id" SERIAL NOT NULL,
    "id_venda" INTEGER NOT NULL,
    "valor_pendente" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "valor_recebido" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContasPendentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItensVendas" (
    "id" SERIAL NOT NULL,
    "id_venda" INTEGER NOT NULL,
    "id_produto" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valor_total" DECIMAL(10,2) NOT NULL,
    "valor_unitario" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItensVendas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_telefone_key" ON "clientes"("telefone");

-- CreateIndex
CREATE INDEX "clientes_telefone_idx" ON "clientes"("telefone");

-- CreateIndex
CREATE INDEX "estoques_id_produto_idx" ON "estoques"("id_produto");

-- CreateIndex
CREATE UNIQUE INDEX "ContasPendentes_id_venda_key" ON "ContasPendentes"("id_venda");

-- CreateIndex
CREATE INDEX "ContasPendentes_id_venda_idx" ON "ContasPendentes"("id_venda");

-- CreateIndex
CREATE INDEX "ItensVendas_id_venda_id_produto_idx" ON "ItensVendas"("id_venda", "id_produto");

-- AddForeignKey
ALTER TABLE "estoques" ADD CONSTRAINT "estoques_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContasPendentes" ADD CONSTRAINT "ContasPendentes_id_venda_fkey" FOREIGN KEY ("id_venda") REFERENCES "vendas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensVendas" ADD CONSTRAINT "ItensVendas_id_venda_fkey" FOREIGN KEY ("id_venda") REFERENCES "vendas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItensVendas" ADD CONSTRAINT "ItensVendas_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
