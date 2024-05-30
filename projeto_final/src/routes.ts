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

router.route('/adicionar_produto')
    .get((req: Request, res: Response) => {
        res.render('produtos/adicionar_produto');
    })
    .post(async (req: Request, res: Response) => {
        const produto = req.body;
        await produtoController.adicionarProduto(produto);
        res.redirect('/produtos');
    });

//////////////////////////////////////////////////////////////////////////////

// CLIENTES

router.get('/clientes', async (req: Request, res: Response) => {
    const clientes = await clienteController.buscarClientes();
    res.render('clientes/clientes', { data: clientes });
});

router.route('/adicionar_cliente')
    .get((req: Request, res: Response) => {
        res.render('clientes/adicionar_cliente');
    })
    .post(async (req: Request, res: Response) => {
        const cliente = req.body;
        await clienteController.adicionarCliente(cliente);
        res.redirect('/clientes');
    });

router.route('/deletar_cliente')
    .get(async (req: Request, res: Response) => {
        const clientes = await clienteController.buscarClientes();
        res.render('clientes/deletar_cliente', { data: clientes });
    })
    .post(async (req: Request, res: Response) => {
        const { clienteID } = req.body; // Change to use body instead of params
        await clienteController.deletarCliente(parseInt(clienteID)); // Assuming a deletarCliente method exists in ClienteController
        res.redirect('/clientes');
    });

//////////////////////////////////////////////////////////////////////////////

// VENDAS

router.get('/vendas', async (req: Request, res: Response) => {
    const vendas = await vendasController.buscarVendas();
    res.render('vendas/vendas', { data: vendas });
});

router.route('/realizar_venda')
    .get(async (req: Request, res: Response) => {
        const produtos = await produtoController.pegarProdutos();
        const clientes = await clienteController.buscarClientes();
        res.render('vendas/realizar_venda', { produtos: produtos, clientes: clientes });
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

router.route('/deletar_venda')
    .get(async (req: Request, res: Response) => {
        const vendas = await vendasController.buscarVendas();
        res.render('vendas/deletar_venda', { data: vendas });
    })
    .post(async (req: Request, res: Response) => {
        const { VendaID } = req.body; // Change to use body instead of params
        await vendasController.deletarVenda(parseInt(VendaID)); // Assuming a deletarVenda method exists in VendasController
        res.redirect('/vendas');
    });

//////////////////////////////////////////////////////////////////////////////

export default router;
