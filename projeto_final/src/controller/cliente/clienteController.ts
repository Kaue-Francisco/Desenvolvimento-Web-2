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
        } catch (error: any) { // Add type annotation to 'error' parameter
            if (error.code === 'P2002' && error.meta?.target === 'Cliente_Email_key') {
                console.log('Não foi possível cadastrar pois há um cliente com mesmo email já cadastrado.');
            } 
            else if (error.code === 'P2002' && error.meta?.target === 'Cliente_Telefone_key') {
                console.log('Não foi possível cadastrar pois há um cliente com mesmo telefone já cadastrado.');
            } else {
                console.log('Erro ao cadastrar cliente.', error);
            }
        }
    }

    async deletarCliente(clienteID: number) {
        try {
            await clienteService.deletarCliente(clienteID);
        } catch (error) {
            console.error(error);
        }
    }
}