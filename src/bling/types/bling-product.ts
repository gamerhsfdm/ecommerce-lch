// src/bling/types/bling-product.ts

// 1. Tipagem do objeto de estoque dentro do produto
export interface BlingStock {
  quantidade: number;
}

// 2. Tipagem do item de produto conforme o Bling envia
export interface BlingProductItem {
  id: number;
  nome: string; // Nome do produto
  codigo: string; // Código/SKU
  preco: number; // Preço de venda
  situacao: string; // 'Ativo', 'Inativo'
  estoque: BlingStock;
  // Outros campos do Bling (como imagens, descrição) podem ser adicionados aqui
}

// 3. Tipagem da resposta completa da API
export interface BlingResponse {
  data: BlingProductItem[];
  // O Bling também tem campos como 'erros', 'pagina'
}