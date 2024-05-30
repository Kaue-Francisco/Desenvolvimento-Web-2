import { ProdutoService } from "../../service/produto/produtoService";
import { produtoType } from "../../interfaces/produtoInterface";

const produtoService = new ProdutoService();

export class ProdutoController {

    async pegarProdutos() {
        try {
            const produtos = await produtoService.pegarProdutos();
            
            if (produtos.length === 0) {
                return 'Nenhum produto cadastrado'                
            } else {
                return produtos
            }
        } catch (error) {
            console.error(error);
        }
    }

    async adicionarProduto(produto: produtoType) {

        try {
            await produtoService.adicionarProduto(produto);
        } catch (error) {
            console.error(error);
        }
    }

    async pegarPrecoProduto(produtoID: number) {
        try {
            const preco = await produtoService.pegarPrecoProduto(produtoID);
            return preco;
        } catch (error) {
            console.error(error);
            return 0
        }
    }
}