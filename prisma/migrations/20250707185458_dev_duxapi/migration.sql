-- CreateTable
CREATE TABLE "cliente" (
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

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produto" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "marca" VARCHAR(100) NOT NULL,
    "custo" DECIMAL(10,2) NOT NULL,
    "revenda" DECIMAL(10,2) NOT NULL,
    "minStock" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estoque" (
    "id" SERIAL NOT NULL,
    "id_produto" INTEGER NOT NULL,
    "qtd_disponivel" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendas" (
    "id" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "valor_total" DECIMAL(10,2) NOT NULL,
    "desconto" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contas_pendentes" (
    "id" SERIAL NOT NULL,
    "id_venda" INTEGER NOT NULL,
    "valor_pendente" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "valor_recebido" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contas_pendentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens" (
    "id" SERIAL NOT NULL,
    "id_venda" INTEGER NOT NULL,
    "id_produto" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valor_total" DECIMAL(10,2) NOT NULL,
    "valor_unitario" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "itens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cliente_telefone_key" ON "cliente"("telefone");

-- CreateIndex
CREATE INDEX "cliente_telefone_idx" ON "cliente"("telefone");

-- CreateIndex
CREATE INDEX "estoque_id_produto_idx" ON "estoque"("id_produto");

-- CreateIndex
CREATE INDEX "vendas_id_cliente_idx" ON "vendas"("id_cliente");

-- CreateIndex
CREATE UNIQUE INDEX "contas_pendentes_id_venda_key" ON "contas_pendentes"("id_venda");

-- CreateIndex
CREATE INDEX "contas_pendentes_id_venda_idx" ON "contas_pendentes"("id_venda");

-- CreateIndex
CREATE INDEX "itens_id_venda_id_produto_idx" ON "itens"("id_venda", "id_produto");

-- AddForeignKey
ALTER TABLE "estoque" ADD CONSTRAINT "estoque_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contas_pendentes" ADD CONSTRAINT "contas_pendentes_id_venda_fkey" FOREIGN KEY ("id_venda") REFERENCES "vendas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens" ADD CONSTRAINT "itens_id_venda_fkey" FOREIGN KEY ("id_venda") REFERENCES "vendas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens" ADD CONSTRAINT "itens_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
