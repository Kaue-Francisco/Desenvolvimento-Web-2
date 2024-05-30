import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function gerarDados() {
    await prisma.itensVendidos.deleteMany({});
    await prisma.venda.deleteMany({});
    await prisma.produto.deleteMany({});
    await prisma.cliente.deleteMany({});

    // Inserir produtos de exemplo
    const produtos = await prisma.produto.createMany({
        data: [
            { Nome: 'Arroz', Preco: 20.00 },
            { Nome: 'Feijão', Preco: 10.00 },
            { Nome: 'Açúcar', Preco: 5.00 },
            { Nome: 'Sal', Preco: 2.00 },
            { Nome: 'Macarrão', Preco: 4.00 }
        ]
    });

    // Inserir clientes de exemplo
    const clientes = await prisma.cliente.createMany({
        data: [
            { Nome: 'João Silva', Email: 'joao@example.com', Telefone: '123456789', Endereco: 'Rua A, 123' },
            { Nome: 'Maria Souza', Email: 'maria@example.com', Telefone: '987654321', Endereco: 'Rua B, 456' },
            { Nome: 'Carlos Santos', Email: 'carlos@example.com', Telefone: '456123789', Endereco: 'Rua C, 789' },
            { Nome: 'Ana Lima', Email: 'ana@example.com', Telefone: '789456123', Endereco: 'Rua D, 101' }
        ]
    });

    // Obter produtos criados
    const [produto1, produto2, produto3, produto4, produto5] = await prisma.produto.findMany();

    // Obter clientes criados
    const [cliente1, cliente2, cliente3, cliente4] = await prisma.cliente.findMany();

    // Inserir vendas e itens vendidos de exemplo
    const vendas = await prisma.venda.createMany({
        data: [
            { ClienteID: cliente1.ClienteID, DataVenda: new Date('2024-05-28'), ValorTotal: 30.00 },
            { ClienteID: cliente2.ClienteID, DataVenda: new Date('2024-05-28'), ValorTotal: 35.00 },
            { ClienteID: cliente3.ClienteID, DataVenda: new Date('2024-05-29'), ValorTotal: 15.00 },
            { ClienteID: cliente4.ClienteID, DataVenda: new Date('2024-05-29'), ValorTotal: 50.00 }
        ]
    });

    const [venda1, venda2, venda3, venda4] = await prisma.venda.findMany();

    // Inserir itens vendidos para cada venda
    const itensVendidos = await prisma.itensVendidos.createMany({
        data: [
            { VendaID: venda1.VendaID, ProdutoID: produto1.ProdutoID, Quantidade: 1, PrecoUnitario: 20.00 },
            { VendaID: venda1.VendaID, ProdutoID: produto2.ProdutoID, Quantidade: 1, PrecoUnitario: 10.00 },
            { VendaID: venda2.VendaID, ProdutoID: produto2.ProdutoID, Quantidade: 2, PrecoUnitario: 10.00 },
            { VendaID: venda2.VendaID, ProdutoID: produto3.ProdutoID, Quantidade: 1, PrecoUnitario: 5.00 },
            { VendaID: venda3.VendaID, ProdutoID: produto4.ProdutoID, Quantidade: 5, PrecoUnitario: 2.00 },
            { VendaID: venda4.VendaID, ProdutoID: produto5.ProdutoID, Quantidade: 10, PrecoUnitario: 4.00 },
            { VendaID: venda4.VendaID, ProdutoID: produto3.ProdutoID, Quantidade: 2, PrecoUnitario: 5.00 }
        ]
    });
}