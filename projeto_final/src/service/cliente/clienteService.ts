import { PrismaClient } from '@prisma/client';
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
}