import { PrismaClient } from '@prisma/client';
import { produtoType } from "../../interfaces/produtoInterface";
import { VendasService } from '../vendas/vendasService';

const prisma = new PrismaClient();
const vendasService = new VendasService();

export class ProdutoService {

    async pegarProdutos() {
        // Retorna todos os produtos ativos.
        return prisma.produto.findMany({
            where: { ativo: true }
        });
    }

    async adicionarProduto(produto: produtoType) {
        // Adiciona um produto.
        const preco = parseFloat(produto.Preco);
        return prisma.produto.create({
            data: {
                Nome: produto.Nome,
                Preco: preco,
                ativo: true // Define o produto como ativo
            }
        });
    }

    async pegarPrecoProduto(produtoID: number) {
        // Retorna o preço de um produto.
        const produto = await prisma.produto.findUnique({
            where: { ProdutoID: produtoID }
        });

        if (!produto) {
            return 0;
        }

        return produto.Preco;
    }

    async deletarProduto(produtoID: number) {
        // Verifica se o produto existe.
        const produto = await prisma.produto.findUnique({
            where: { ProdutoID: produtoID }
        });

        if (!produto) {
            throw new Error("Produto não encontrado.");
        }

        // Atualiza o produto para inativo em vez de deletá-lo.
        return prisma.produto.update({
            where: { ProdutoID: produtoID },
            data: { ativo: false }
        });
    }

    async pegarProdutoUnico(produtoID: number) {
        // Retorna um produto específico.
        return prisma.produto.findUnique({
            where: { ProdutoID: produtoID } // Corrige a sintaxe do where
        });
    }

    async atualizarProduto(produto: produtoType) {
        // Converte o preço para um número.
        const novoPreco = parseFloat(produto.Preco);

        return prisma.produto.update({
            where: { ProdutoID: produto.ProdutoID },
            data: {
                Nome: produto.Nome,
                Preco: novoPreco,
                ativo: true // Garantir que o produto permaneça ativo ao atualizar
            }
        });
    }
}
