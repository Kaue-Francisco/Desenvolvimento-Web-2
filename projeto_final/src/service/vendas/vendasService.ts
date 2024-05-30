import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class VendasService {

    async buscarVendas() {
        const vendas = await prisma.venda.findMany({
            include: {
                Cliente: true, // Inclui dados do cliente
                ItensVendidos: {
                    include: {
                        Produto: true, // Inclui dados do produto
                    },
                },
            },
        });

        return vendas;
    }

}