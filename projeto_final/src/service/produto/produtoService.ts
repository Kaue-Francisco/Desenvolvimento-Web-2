import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProdutoService {
    
    async pegarProdutos() {
    //  Retorna todos os produtos.
        return prisma.produto.findMany();
    }
}