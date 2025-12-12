// src/store/cartStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // Para persistência no localStorage
// 💡 Ajuste o caminho de importação se sua estrutura de tipos for diferente:
import { CartState, CartItem } from '../types/cart'; 
import { Product } from '../types/product'; 

// Cria o store do Zustand com persistência no localStorage
export const useCartStore = create<CartState>()(
    // O 'persist' salva o estado no localStorage para que ele não se perca ao recarregar
    persist(
        (set, get) => ({
            items: [], // Estado inicial: carrinho vazio

            // --- AÇÕES ---

            addToCart: (product: Product, quantity: number = 1) => {
                set((state) => {
                    // Tenta encontrar o produto no carrinho
                    const existingItemIndex = state.items.findIndex(
                        item => item.id === product.id
                    );

                    if (existingItemIndex > -1) {
                        // 1. Produto já existe: atualiza a quantidade
                        const newItems = state.items.map((item, index) =>
                            index === existingItemIndex
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        );
                        return { items: newItems };
                    } else {
                        // 2. Produto novo: adiciona
                        const newItem: CartItem = { ...product, quantity };
                        return { items: [...state.items, newItem] };
                    }
                });
            },

            removeFromCart: (productId: string) => {
                // Remove o item que corresponde ao ID
                set((state) => ({
                    items: state.items.filter(item => item.id !== productId),
                }));
            },

            updateQuantity: (productId: string, newQuantity: number) => {
                if (newQuantity <= 0) {
                    // Se a quantidade for zero ou negativa, remove o item
                    get().removeFromCart(productId);
                    return;
                }
                
                // Atualiza a quantidade do item correspondente ao ID
                set((state) => ({
                    items: state.items.map(item =>
                        item.id === productId
                            ? { ...item, quantity: newQuantity }
                            : item
                    ),
                }));
            },

            clearCart: () => set({ items: [] }),

            // --- GETTERS (Dados Derivados) ---
            // São funções que calculam dados baseados no estado 'items'

            getTotalItems: () => {
                // Calcula o número total de itens (unidades) no carrinho
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                // Calcula o preço total dos itens
                return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
            },
        }),
        {
            name: 'papelaria-cart-storage', // Nome da chave no localStorage
        }
    )
);