export interface VendaItemType {
    ProdutoID: number;
    Quantidade: number; // Corrigido para number
    PrecoUnitario?: number; // Corrigido para number
}

export interface VendaType {
    cliente: number; // Removed the initializer
    produtos: VendaItemType[];
    total?: number; // Campo opcional para armazenar o preço total
}
export interface AtualizarVenda {
    ClienteID: number;
    DataVenda: string;
    itens: { ProdutoID: number; Quantidade: number }[];
    VendaID: number;
    ValorTotal?: number;
}