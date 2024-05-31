import { PrismaClient } from '@prisma/client';
import { produtoType } from "../../interfaces/produtoInterface";

const prisma = new PrismaClient();

export class ProdutoService {

    async pegarProdutos() {
        // Retorna todos os produtos.
        return prisma.produto.findMany();
    }

    async adicionarProduto(produto: produtoType) {
        // Adiciona um produto.
        const preco = parseFloat(produto.Preco);
        return prisma.produto.create({
            data: {
                Nome: produto.Nome,
                Preco: preco // Convert the string back to a number
            }
        });
    }

    async pegarPrecoProduto(produtoID: number) {
        // Retorna o preço de um produto.
        const produto = await prisma.produto.findUnique({
            where: {
                ProdutoID: produtoID
            }
        });

        if (!produto) {
            return 0;
        }

        return produto.Preco;
    }

    async deletarProduto(produtoID: number) {
        // Verifica se o produto existe.
        const produto = await prisma.produto.findUnique({
            where: {
                ProdutoID: produtoID
            }
        });

        if (!produto) {
            throw new Error("Produto não encontrado.");
        }

        // Encontra todas as vendas associadas a este produto.
        const vendasAssociadas = await prisma.itensVendidos.findMany({
            where: {
                ProdutoID: produtoID
            },
            select: {
                VendaID: true
            }
        });

        // Remove o produto de todas as vendas associadas.
        for (const vendaProduto of vendasAssociadas) {
            const vendaID = vendaProduto.VendaID;

            // Verifica quantos produtos existem na venda.
            const countProdutos = await prisma.itensVendidos.count({
                where: {
                    VendaID: vendaID
                }
            });

            if (countProdutos === 1) {
                // Se este é o único produto na venda, deleta a venda.
                await prisma.venda.delete({
                    where: {
                        VendaID: vendaID
                    }
                });
            } else {
                // Caso contrário, apenas remove o produto da venda.
                await prisma.itensVendidos.deleteMany({
                    where: {
                        VendaID: vendaID,
                        ProdutoID: produtoID
                    }
                });

                // Atualiza o preço total da venda.
                const itensVendidos = await prisma.itensVendidos.findMany({
                    where: {
                        VendaID: vendaID
                    }
                });

                // Calcula o novo total da venda.
                const novoTotal = itensVendidos.reduce((total, item) => {
                    return total + item.PrecoUnitario * item.Quantidade;
                }, 0);

                // Atualiza o total da venda.
                await prisma.venda.update({
                    where: {
                        VendaID: vendaID
                    },
                    data: {
                        ValorTotal: novoTotal
                    }
                });
            }
        }

        // Finalmente, deleta o produto.
        return prisma.produto.delete({
            where: {
                ProdutoID: produtoID
            }
        });
    }
}
