import { PrismaClient } from '@prisma/client';
import { VendaType, AtualizarVenda } from '../../interfaces/vendasInterface';

const prisma = new PrismaClient();

export class VendasService {

    async buscarVendas() {
        const vendas = await prisma.venda.findMany({
            include: {
                Cliente: true,
                ItensVendidos: {
                    include: {
                        Produto: true,
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

        return vendaRealizada;
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
        const itensVendidos = await prisma.itensVendidos.findMany({
            where: {
                VendaID: vendaID
            }
        });

        const novoTotal = itensVendidos.reduce((total, item) => {
            return total + item.PrecoUnitario * item.Quantidade;
        }, 0);

        await prisma.venda.update({
            where: {
                VendaID: vendaID
            },
            data: {
                ValorTotal: novoTotal
            }
        });
    }

    async buscarVendaUnica(vendaID: number) {
        const venda = await prisma.venda.findUnique({
            where: {
                VendaID: vendaID
            },
            include: {
                Cliente: true,
                ItensVendidos: {
                    include: {
                        Produto: true
                    }
                }
            }
        });

        return venda;
    }

    async atualizarVenda(venda: AtualizarVenda) {
        try {
            // Atualiza os dados da venda
            await prisma.venda.update({
                where: {
                    VendaID: venda.VendaID
                },
                data: {
                    ClienteID: venda.ClienteID,
                    DataVenda: new Date(venda.DataVenda),
                }
            });

            // Deleta os itens vendidos antigos
            await prisma.itensVendidos.deleteMany({
                where: {
                    VendaID: venda.VendaID
                }
            });

            // Adiciona os novos itens vendidos com o preço unitário correto
            const novosItensVendidos = await Promise.all(venda.itens.map(async (item) => {
                const produto = await prisma.produto.findUnique({
                    where: {
                        ProdutoID: item.ProdutoID
                    }
                });

                return {
                    VendaID: venda.VendaID,
                    ProdutoID: item.ProdutoID,
                    Quantidade: item.Quantidade,
                    PrecoUnitario: produto?.Preco ?? 0
                };
            }));

            await prisma.itensVendidos.createMany({
                data: novosItensVendidos
            });

            // Atualiza o valor total da venda
            await this.atualizarTotalVenda(venda.VendaID);
        } catch (error) {
            console.error('Erro ao atualizar venda:', error);
            throw error;
        }
    }
}
