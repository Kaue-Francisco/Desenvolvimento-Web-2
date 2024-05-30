import { VendasService } from '../../service/vendas/vendasService';

const vendasService = new VendasService();

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
    
}