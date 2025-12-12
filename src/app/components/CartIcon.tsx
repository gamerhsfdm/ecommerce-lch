"use client";

import React, { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import CartSidebar from "./CartSidebar";

const CartIcon: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { items } = useCartStore();

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Ícone do Carrinho */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="
          flex flex-col items-center gap-0.5 relative 
          text-gray-700 hover:text-purple-600 
          p-1 transition-colors group
        "
        aria-label={`Abrir carrinho, ${totalItemsCount} itens no carrinho`}
      >
        {/* Ícone */}
        <ShoppingBag size={22} className="group-hover:text-purple-600" />
        
        {/* Texto do Ícone (Adicionado para padronizar com os demais ícones da Navbar) */}
        <span className="text-xs">Carrinho</span>

        {/* Contador de Itens */}
        {totalItemsCount > 0 && (
          <span
            className="
              absolute top-0 right-0 
              transform -translate-y-2 translate-x-1
              h-4 w-4
              bg-[#f36915] text-white 
              text-[10px] font-bold 
              rounded-full 
              flex items-center justify-center 
              border border-white 
            "
          >
            {totalItemsCount > 9 ? "9+" : totalItemsCount}
          </span>
        )}
      </button>

      {/* Sidebar do Carrinho */}
      <CartSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </>
  );
};

export default CartIcon;