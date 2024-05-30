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

router.get('/', async (req: Request, res: Response) => {
    res.render('home/home');
});

router.get('/produtos', async (req: Request, res: Response) => {
    const produtos = await produtoController.pegarProdutos();
    res.render('produtos/produtos', { data: produtos });
});

router.get('/vendas', async (req: Request, res: Response) => {
    const vendas = await vendasController.buscarVendas();
    res.render('vendas/vendas', { data: vendas });
});

router.get('/clientes', async (req: Request, res: Response) => {
    const clientes = await clienteController.buscarClientes();
    res.render('clientes/clientes', { data: clientes });
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

router.route('/adicionar_cliente')
    .get((req: Request, res: Response) => {
        res.render('clientes/adicionar_cliente');
    })
    .post(async (req: Request, res: Response) => {
        const cliente = req.body;
        await clienteController.adicionarCliente(cliente);
        res.redirect('/clientes');
    });

router.route('/realizar_venda')
    .get(async (req: Request, res: Response) => {
        const produtos = await produtoController.pegarProdutos();
        const clientes = await clienteController.buscarClientes();
        res.render('vendas/realizar_venda', { produtos: produtos, clientes: clientes });
    })

    .post(async (req: Request, res: Response) => {
        // Inicializando a variável 'venda' com as propriedades cliente e produtos
        let venda: VendaType = { cliente: 0, produtos: [] }; 
        const data = req.body;
        
        // Convertendo os valores para inteiros
        venda.cliente = parseInt(data.cliente);
        for (let i = 0; i < data.produtos.length; i++) {
            venda.produtos.push({
                ProdutoID: parseInt(data.produtos[i]),
                Quantidade: parseInt(data.quantidades[i]),
            });
        }

        await vendasController.realizarVenda(venda);
        res.redirect('/vendas');
    });


// router.delete('/deletar_produto/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     await deletarProduto(id);
//     res.status(204).send();
// });

// router.delete('/deletar_cliente/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     await deletarCliente(id);
//     res.status(204).send();
// });

// router.delete('/deletar_venda/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;
//     await deletarVenda(id);
//     res.status(204).send();
// });

export default router;
