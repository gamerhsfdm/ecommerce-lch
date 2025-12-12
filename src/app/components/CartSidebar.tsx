"use client";

import React from "react";
import Link from "next/link";
import { X, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useCartStore } from "../../store/cartStore";
import { CartItem } from "../../types/cart";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartStore();

  const handleUpdateQuantity = (qtd: number) => {
    updateQuantity(item.id, qtd);
  };

  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-100">
      <img
        src={item.imageUrl || "https://via.placeholder.com/64x64?text=Produto"}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-lg border border-gray-100 shadow-sm"
      />

      <div className="flex-grow min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2">
          {item.name}
        </h4>

        {/* PREÇO UNITÁRIO */}
        <p
          className="text-xs font-medium mt-1"
          style={{ color: "#030a7f" }}
        >
          {formatCurrency(item.price)}
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex flex-col items-center">
          <div className="flex items-center border border-gray-300 rounded-full h-7 mb-1">
            <button
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="p-1 text-gray-600 hover:bg-gray-200 disabled:opacity-30 rounded-l-full"
            >
              <Minus size={12} />
            </button>

            <span className="px-2 text-xs font-bold text-gray-700 w-6 text-center">
              {item.quantity}
            </span>

            <button
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              className="p-1 text-gray-600 hover:bg-gray-200 rounded-r-full"
            >
              <Plus size={12} />
            </button>
          </div>

          {/* PREÇO TOTAL */}
          <p className="text-xs font-medium whitespace-nowrap" style={{ color: "#f36915" }}>
            {formatCurrency(item.price * item.quantity)}
          </p>
        </div>

        {/* BOTÃO REMOVER */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose }) => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const total = getTotalPrice();
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
          className="
            fixed top-0 right-0 h-screen 
            w-[380px] max-w-full bg-white shadow-2xl
            z-[100] flex flex-col
          "
        >
          {/* HEADER */}
          <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-2xl font-extrabold text-gray-900 flex items-center">
              <ShoppingBag size={28} className="mr-3" style={{ color: "#030a7f" }} />
              Seu Carrinho
              <span className="ml-2 text-sm font-semibold text-gray-500">
                ({totalItemsCount} {totalItemsCount === 1 ? "item" : "itens"})
              </span>
            </h2>

            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          {/* LISTA */}
          <div className="flex-grow overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <ShoppingBag size={64} className="mx-auto mb-4 text-gray-300" />

                <p className="text-lg font-semibold mb-2">
                  Seu carrinho está esperando!
                </p>

                <p className="text-sm">
                  Navegue na loja e adicione seus produtos favoritos.
                </p>

                <button
                  onClick={onClose}
                  className="mt-6 font-medium flex items-center mx-auto transition"
                  style={{ color: "#030a7f" }}
                >
                  <Plus size={18} className="mr-1" /> Começar a Comprar
                </button>
              </div>
            ) : (
              items.map((item) => <CartItemRow key={item.id} item={item} />)
            )}
          </div>

          {/* FOOTER */}
          <div className="p-5 border-t border-gray-200 bg-white shadow-xl">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="w-full text-center text-sm mb-3 flex items-center justify-center"
                style={{ color: "#030a7f" }}
              >
                <Trash2 size={16} className="mr-1" /> Limpar Carrinho
              </button>
            )}

            {/* TOTAL */}
            <div className="flex justify-between font-bold text-xl mb-4 text-gray-900">
              <span>Total:</span>
              <span style={{ color: "#f36915" }}>
                {formatCurrency(total)}
              </span>
            </div>

            {/* BOTÃO DE CHECKOUT */}
            <Link
              href="/checkout"
              onClick={items.length > 0 ? onClose : (e) => e.preventDefault()}
              className={`block w-full text-center py-4 rounded-xl font-extrabold text-lg shadow-md transition
                ${
                  items.length === 0
                    ? "bg-gray-400 text-gray-700 opacity-70 cursor-not-allowed"
                    : ""
                }
              `}
              style={
                items.length === 0
                  ? {}
                  : {
                      backgroundColor: "#030a7f",
                      color: "white",
                    }
              }
            >
              Ir para o Checkout
            </Link>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
