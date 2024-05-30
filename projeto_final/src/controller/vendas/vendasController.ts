import { VendasService } from '../../service/vendas/vendasService';
import { ProdutoController } from '../produto/produtoController';
import { VendaType } from '../../interfaces/vendasInterface';

const vendasService = new VendasService();
const produtoController = new ProdutoController();

export class VendasController {
    async buscarVendas() {
        try {
            const vendas = await vendasService.buscarVendas();

            if (vendas.length === 0) {
                return 'Nenhuma venda cadastrada';
            } else {
                return vendas;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async realizarVenda(venda: VendaType) {
        try {
            venda.total = await this.precoTotalVenda(venda);
            await vendasService.realizarVenda(venda);
        } catch (error) {
            console.error(error);
        }
    }

    async precoTotalVenda(venda: VendaType): Promise<number> {
        let total = 0;
        for (const item of venda.produtos) {
            const preco = await produtoController.pegarPrecoProduto(item.ProdutoID);
            total += preco * item.Quantidade;
            item.PrecoUnitario = preco;
        }

        return total;
    }
}
