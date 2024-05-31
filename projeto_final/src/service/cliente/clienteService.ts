import { PrismaClient } from '@prisma/client';
import { clienteType } from '../../interfaces/clienteInterface';

const prisma = new PrismaClient();

export class ClienteService {

    async buscarClientes() {
        // Retorna todos os clientes   
        return prisma.cliente.findMany();
    }

    async buscarClienteUnico(clienteID: number) {
        // Retorna um cliente específico
        const cliente = await prisma.cliente.findUnique({
            where: { ClienteID: clienteID }
        });
        if (cliente === null) {
            return {};
        }
        return cliente;
    }

    async adicionarCliente(cliente: clienteType) {
        // Adiciona um cliente
        return prisma.cliente.create({
            data: {
                Nome: cliente.Nome,
                Email: cliente.Email,
                Telefone: cliente.Telefone,
                Endereco: cliente.Endereco
            }
        });
    }

    async deletarCliente(clienteID: number) {
        try {
            // Deleta os itens de venda associados primeiro
            await prisma.itensVendidos.deleteMany({
                where: {
                    Venda: {
                        ClienteID: clienteID
                    }
                }
            });

            // Deleta os registros de venda associados
            await prisma.venda.deleteMany({
                where: {
                    ClienteID: clienteID
                }
            });

            // Agora, deletar o cliente
            return await prisma.cliente.delete({
                where: {
                    ClienteID: clienteID
                }
            });
        } catch (error) {
            console.error('Erro ao deletar cliente:', error);
            throw error;
        }
    }

    async atualizarCliente(cliente: clienteType) {
        try {
            // Atualizar o cliente diretamente
            return await prisma.cliente.update({
                where: {
                    ClienteID: cliente.ClienteID
                },
                data: {
                    Nome: cliente.Nome,
                    Email: cliente.Email,
                    Telefone: cliente.Telefone,
                    Endereco: cliente.Endereco
                }
            });
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            throw error;
        }
    }
}
