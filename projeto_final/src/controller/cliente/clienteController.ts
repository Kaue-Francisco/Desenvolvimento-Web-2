import { ClienteService } from "../../service/cliente/clienteService";

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
    
}