import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ClienteService {
    
    async buscarClientes() {
    // Retorna todos os clientes   
        return prisma.cliente.findMany();
    }
    
}