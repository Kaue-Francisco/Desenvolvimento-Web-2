import { PrismaClient } from '@prisma/client';
import { produtoType } from "../../interfaces/produtoInterface";
import { VendasService } from '../vendas/vendasService';


const prisma = new PrismaClient();
const vendasService = new VendasService

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

                await vendasService.atualizarTotalVenda(vendaID);
            }
        }

        // Finalmente, deleta o produto.
        return prisma.produto.delete({
            where: {
                ProdutoID: produtoID
            }
        });
    }

    async pegarProdutoUnico(produtoID: number) {
        // Retorna um produto específico.
        return prisma.produto.findUnique({
            where: {
                ProdutoID: produtoID
            }
        });
    }

    async atualizarProduto(produto: produtoType) {
        // Converte o preço para um número.
        const novoPreco = parseFloat(produto.Preco);
    
        // Atualiza o preço do produto em todos os itens vendidos que o contêm.
        await prisma.itensVendidos.updateMany({
            where: {
                ProdutoID: produto.ProdutoID
            },
            data: {
                PrecoUnitario: novoPreco
            }
        });
    
        // Atualiza o preço do produto em todas as vendas que o contêm.
        const vendasAssociadas = await prisma.itensVendidos.findMany({
            where: {
                ProdutoID: produto.ProdutoID
            },
            distinct: ['VendaID']
        });
    
        for (const venda of vendasAssociadas) {
            await vendasService.atualizarTotalVenda(venda.VendaID);
        }
    
        // Atualiza o produto com o novo nome e preço.
        return prisma.produto.update({
            where: {
                ProdutoID: produto.ProdutoID
            },
            data: {
                Nome: produto.Nome,
                Preco: novoPreco
            }
        });
    }
    
}
