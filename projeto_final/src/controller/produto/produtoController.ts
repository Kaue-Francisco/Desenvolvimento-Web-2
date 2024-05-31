import { ProdutoService } from "../../service/produto/produtoService";
import { produtoType } from "../../interfaces/produtoInterface";

const produtoService = new ProdutoService();

export class ProdutoController {

    async pegarProdutos() {
        try {
            const produtos = await produtoService.pegarProdutos();
            if (produtos.length === 0) {
                return 'Nenhum produto cadastrado';
            } else {
                return produtos;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async adicionarProduto(produto: produtoType) {
        try {
            await produtoService.adicionarProduto(produto);
        } catch (error: any) { 
            if (error.code === 'P2002' && error.meta?.target === 'Produto_Nome_key') {
                console.log('Produto com mesmo nome já cadastrado:', produto.Nome);
            } else {
                console.log('Erro ao adicionar produto', error);
            }
        }
    }

    async pegarPrecoProduto(produtoID: number) {
        try {
            const preco = await produtoService.pegarPrecoProduto(produtoID);
            return preco;
        } catch (error) {
            console.error(error);
            return 0;
        }
    }

    async deletarProduto(produtoID: number) {
        try {
            await produtoService.deletarProduto(produtoID);
        } catch (error) {
            console.error(error);
        }
    }

    async pegarProdutoUnico(produtoID: number) {
        try {
            const produto = await produtoService.pegarProdutoUnico(produtoID);
            return produto;
        } catch (error) {
            //console.error(error);
        }
    }

    async atualizarProduto(produto: produtoType) {
        try {
            await produtoService.atualizarProduto(produto);
        } catch (error) {
            console.error(error);
        }
    }
}
