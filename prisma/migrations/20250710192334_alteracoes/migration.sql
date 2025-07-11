/*
  Warnings:

  - You are about to drop the `ContasPendentes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ItensVendas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ContasPendentes" DROP CONSTRAINT "ContasPendentes_id_venda_fkey";

-- DropForeignKey
ALTER TABLE "ItensVendas" DROP CONSTRAINT "ItensVendas_id_produto_fkey";

-- DropForeignKey
ALTER TABLE "ItensVendas" DROP CONSTRAINT "ItensVendas_id_venda_fkey";

-- DropTable
DROP TABLE "ContasPendentes";

-- DropTable
DROP TABLE "ItensVendas";

-- CreateTable
CREATE TABLE "contas-pendentes" (
    "id" SERIAL NOT NULL,
    "id_venda" INTEGER NOT NULL,
    "valor_pendente" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "valor_recebido" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contas-pendentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens-vendas" (
    "id" SERIAL NOT NULL,
    "id_venda" INTEGER NOT NULL,
    "id_produto" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valor_total" DECIMAL(10,2) NOT NULL,
    "valor_unitario" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "itens-vendas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "contas-pendentes_id_venda_key" ON "contas-pendentes"("id_venda");

-- CreateIndex
CREATE INDEX "contas-pendentes_id_venda_idx" ON "contas-pendentes"("id_venda");

-- CreateIndex
CREATE INDEX "itens-vendas_id_venda_id_produto_idx" ON "itens-vendas"("id_venda", "id_produto");

-- AddForeignKey
ALTER TABLE "contas-pendentes" ADD CONSTRAINT "contas-pendentes_id_venda_fkey" FOREIGN KEY ("id_venda") REFERENCES "vendas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens-vendas" ADD CONSTRAINT "itens-vendas_id_venda_fkey" FOREIGN KEY ("id_venda") REFERENCES "vendas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens-vendas" ADD CONSTRAINT "itens-vendas_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
