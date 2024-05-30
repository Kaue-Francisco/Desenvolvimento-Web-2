import { PrismaClient } from '@prisma/client'; // Add the missing import statement for 'vendaItem' model
import { clienteType } from '../../interfaces/clienteInterface';

const prisma = new PrismaClient();

export class ClienteService {
    
    async buscarClientes() {
    // Retorna todos os clientes   
        return prisma.cliente.findMany();
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

            // Deleta os registros dependentes primeiro, se necessário
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
}