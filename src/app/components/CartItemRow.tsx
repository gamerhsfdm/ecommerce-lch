// src/components/CartItemRow.tsx
import React from 'react';
import { CartItem } from '../types/cart';

// Helper para formatar moeda (importado ou definido localmente)
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

interface CartItemRowProps {
  item: CartItem;
}

/**
 * Componente simples para exibir um item no resumo do carrinho (Checkout).
 * Focado na exibição, sem controles de edição.
 */
const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const subtotal = item.price * item.quantity;

  return (
    <div className="flex justify-between items-start py-2 text-sm border-b last:border-b-0 border-gray-100">
      
      {/* Nome e Quantidade */}
      <div className="flex items-center space-x-3">
        {/* Imagem pequena (opcional) */}
        <img
          src={item.imageUrl || "https://via.placeholder.com/32x32?text=P"}
          alt={item.name}
          className="w-8 h-8 object-cover rounded-md flex-shrink-0 border border-gray-100 hidden sm:block"
        />
        <span className="text-gray-700 max-w-xs">
          {item.name}
          <span className="ml-2 text-xs font-semibold text-pink-500">
            x{item.quantity}
          </span>
        </span>
      </div>
      
      {/* Preço Total (Subtotal do item) */}
      <span className="font-semibold text-gray-900 flex-shrink-0 ml-4">
        {formatCurrency(subtotal)}
      </span>
    </div>
  );
};

export default CartItemRow;