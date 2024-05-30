import { ClienteService } from "../../service/cliente/clienteService";
import { clienteType } from '../../interfaces/clienteInterface'

const clienteService = new ClienteService();

export class ClienteController {

    async buscarClientes() {
        try {
            const clientes = await clienteService.buscarClientes();
            
            if (clientes.length === 0) {
                return 'Nenhum cliente cadastrado'                
            } else {
                return clientes
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    async adicionarCliente(cliente: clienteType) {
        try {
            await clienteService.adicionarCliente(cliente);
        } catch (error) {
            console.error(error);
        }
    }
}