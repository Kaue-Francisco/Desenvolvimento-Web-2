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
}
