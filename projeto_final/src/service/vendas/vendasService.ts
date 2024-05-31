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

    async atualizarTotalVenda(vendaID: number) {
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