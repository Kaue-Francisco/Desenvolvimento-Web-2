import { Router, Request, Response } from 'express';
import { ClienteController } from './controller/cliente/clienteController';
import { ProdutoController } from './controller/produto/produtoController';
import { VendasController } from './controller/vendas/vendasController';
import { VendaType } from './interfaces/vendasInterface';

//////////////////////////////////////////////////////////////////////////////

const clienteController = new ClienteController();
const produtoController = new ProdutoController();
const vendasController = new VendasController();

const router = Router();

//////////////////////////////////////////////////////////////////////////////

// Inicial

router.get('/', async (req: Request, res: Response) => {
    res.render('home/home');
});

//////////////////////////////////////////////////////////////////////////////

// PRODUTOS

router.get('/produtos', async (req: Request, res: Response) => {
    const produtos = await produtoController.pegarProdutos();
    res.render('produtos/produtos', { data: produtos });
});

router.route('/adicionarProduto')
    .get((req: Request, res: Response) => {
        res.render('produtos/adicionarProduto');
    })
    .post(async (req: Request, res: Response) => {
        const produto = req.body;
        await produtoController.adicionarProduto(produto);
        res.redirect('/produtos');
    });

router.route('/deletarProduto')
    .get(async (req: Request, res: Response) => {
        const produtos = await produtoController.pegarProdutos();
        console.log(produtos)
        res.render('produtos/deletarProduto', { data: produtos });
    })
    .post(async (req: Request, res: Response) => {
        const { ProdutoID } = req.body; // Change to use body instead of params
        await produtoController.deletarProduto(parseInt(ProdutoID)); // Assuming a deletarProduto method exists in ProdutoController
        res.redirect('/produtos');
    });

router.route('/atualizarProduto/:id')
    .get(async (req: Request, res: Response) => {
        const produto = await produtoController.pegarProdutoUnico(parseInt(req.params.id));
        res.render('produtos/atualizarProduto', { produto: produto });
    })

    .post(async (req: Request, res: Response) => {
        const produto = req.body;
        produto.ProdutoID = parseInt(produto.ProdutoID);
        console.log(produto)
       await produtoController.atualizarProduto(produto);
        res.redirect('/produtos');
    });

//////////////////////////////////////////////////////////////////////////////

// CLIENTES

router.get('/clientes', async (req: Request, res: Response) => {
    const clientes = await clienteController.buscarClientes();
    res.render('clientes/clientes', { data: clientes });
});

router.route('/adicionarCliente')
    .get((req: Request, res: Response) => {
        res.render('clientes/adicionarCliente');
    })
    .post(async (req: Request, res: Response) => {
        const cliente = req.body;
        await clienteController.adicionarCliente(cliente);
        res.redirect('/clientes');
    });

router.route('/deletarCliente')
    .get(async (req: Request, res: Response) => {
        const clientes = await clienteController.buscarClientes();
        res.render('clientes/deletarCliente', { data: clientes });
    })
    .post(async (req: Request, res: Response) => {
        const { clienteID } = req.body; // Change to use body instead of params
        await clienteController.deletarCliente(parseInt(clienteID)); // Assuming a deletarCliente method exists in ClienteController
        res.redirect('/clientes');
    });

router.route('/atualizarCliente/:id')
    .get(async (req: Request, res: Response) => {
        const cliente = await clienteController.buscarClienteUnico(parseInt(req.params.id));
        res.render('clientes/atualizarCliente', { cliente: cliente });
    })

    .post(async (req: Request, res: Response) => {
        const cliente = req.body;
        cliente.ClienteID = parseInt(cliente.ClienteID);
        await clienteController.atualizarCliente(cliente);
        res.redirect('/clientes');
    });

//////////////////////////////////////////////////////////////////////////////

// VENDAS

router.get('/vendas', async (req: Request, res: Response) => {
    const vendas = await vendasController.buscarVendas();
    res.render('vendas/vendas', { data: vendas });
});

router.route('/realizarVenda')
    .get(async (req: Request, res: Response) => {
        const produtos = await produtoController.pegarProdutos();
        const clientes = await clienteController.buscarClientes();
        res.render('vendas/realizarVenda', { produtos: produtos, clientes: clientes });
    })
    .post(async (req: Request, res: Response) => {
        let venda: VendaType = { cliente: 0, produtos: [] };
        const data = req.body;
        venda.cliente = parseInt(data.cliente);
        
        for (let i = 0; i < data.produtos.length; i++) {
            const produtoID = parseInt(data.produtos[i]);
            const quantidade = parseInt(data.quantidades[i]);
            
            const produtoIndex = venda.produtos.findIndex(p => p.ProdutoID === produtoID);
            if (produtoIndex !== -1) {
                venda.produtos[produtoIndex].Quantidade += quantidade;
            } else {
                venda.produtos.push({ ProdutoID: produtoID, Quantidade: quantidade });
            }
        }

        await vendasController.realizarVenda(venda);
        res.redirect('/vendas');
    });

router.route('/deletarVenda')
    .get(async (req: Request, res: Response) => {
        const vendas = await vendasController.buscarVendas();
        res.render('vendas/deletarVenda', { data: vendas });
    })
    .post(async (req: Request, res: Response) => {
        const { VendaID } = req.body; // Change to use body instead of params
        await vendasController.deletarVenda(parseInt(VendaID)); // Assuming a deletarVenda method exists in VendasController
        res.redirect('/vendas');
    });

//////////////////////////////////////////////////////////////////////////////

export default router;