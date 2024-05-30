import { ProdutoService } from "../../service/produto/produtoService";

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
}