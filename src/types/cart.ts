// Conteúdo esperado para ../types/cart.ts

import { Product } from "./product";

// Tipo para um item individual dentro do carrinho
export interface CartItem extends Product {
    quantity: number;
}

// Tipo para o estado global do carrinho
export interface CartState {
    items: CartItem[];
    
    // Ações (Métodos)
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    
    // Dados Derivados (Getters)
    getTotalItems: () => number;
    getTotalPrice: () => number;
}