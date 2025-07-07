/*
  Warnings:

  - Added the required column `id_usuario` to the `vendas` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "vendas_id_cliente_idx";

-- AlterTable
ALTER TABLE "vendas" ADD COLUMN     "id_usuario" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE INDEX "usuarios_email_idx" ON "usuarios"("email");

-- CreateIndex
CREATE INDEX "vendas_id_cliente_id_usuario_idx" ON "vendas"("id_cliente", "id_usuario");

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
