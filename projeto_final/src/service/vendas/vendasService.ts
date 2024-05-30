import { PrismaClient } from '@prisma/client';
import { VendaType } from '../../interfaces/vendasInterface'

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

    async realizarVenda(venda: VendaType) {
        
        const vendaRealizada = await prisma.venda.create({
            data: {
                ClienteID: venda.cliente,
                DataVenda: new Date(),
                ValorTotal: venda.total ?? 0,
                ItensVendidos: {
                    create: venda.produtos.map((item) => ({
                        ProdutoID: item.ProdutoID,
                        Quantidade: item.Quantidade,
                        PrecoUnitario: item.PrecoUnitario ?? 0,
                    })),
                },
            }
        });
    }

    async deletarVenda(vendaID: number) {
        try {
            await prisma.itensVendidos.deleteMany({
                where: {
                    VendaID: vendaID
                }
            });

            return await prisma.venda.delete({
                where: {
                    VendaID: vendaID
                }
            });
        } catch (error) {
            console.error('Erro ao deletar venda:', error);
            throw error;
        }
    }
}