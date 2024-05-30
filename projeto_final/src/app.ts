import { Express, Request, Response } from 'express';
import { gerarDados, pegarProdutos, buscarVendas, buscarClientes } from './server';
import bodyParser from 'body-parser';
import * as path from 'path';

///////////////////////////////////////////////////////////////////////////////////

// Define as variáveis para requisição
import express from 'express';
const app: Express = express();
const PORT: number = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', async (req: Request, res: Response) => {
    res.render('index');
});

app.get('/produtos', async (req: Request, res: Response) => {
    const produtos = await pegarProdutos();
    res.render('produtos', { data: produtos });
});

app.get('/vendas', async (req: Request, res: Response) => {
    const vendas = await buscarVendas();
    res.render('vendas', { data: vendas });
});

app.get('/clientes', async (req: Request, res: Response) => {
    const clientes = await buscarClientes();
    res.render('clientes', { data: clientes });
});

app.get('/cadastrar_clientes', async (req: Request, res: Response) => {
    const vendas = await buscarVendas();
    res.render('vendas', { data: vendas });
});

app.get('/realizar_venda', async (req: Request, res: Response) => {
    const vendas = await buscarVendas();
    res.render('vendas', { data: vendas });
});

app.get('/adicionar_produto', async (req: Request, res: Response) => {
    const vendas = await buscarVendas();
    res.render('vendas', { data: vendas });
});

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await gerarDados();
});