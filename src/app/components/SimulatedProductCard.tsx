// src/components/SimulatedProductCard.tsx
import React from "react";
import Link from "next/link";
import { Product } from "../../types/product"; // Ajuste o caminho se necessário
import { Button } from "@/components/ui/button";

interface SimulatedProductCardProps {
  product: Product;
}

const fmt = (v: number) => `R$ ${v.toFixed(2).replace(".", ",")}`;

/**
 * Cartão de Produto Simulado ou de Miniatura.
 * Usado para a pré-visualização rápida no Carrossel Principal.
 */
const SimulatedProductCard: React.FC<SimulatedProductCardProps> = ({ product }) => {
  return (
    <Link 
      href={`/product/${product.id}`} 
      className="block"
      aria-label={`Ver detalhes do produto: ${product.name}`}
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-sm flex gap-4 p-3 hover:bg-gray-50 transition border hover:border-pink-300">
        
        {/* Imagem da Miniatura */}
        <img 
          src={product.imageUrl} 
          alt={`Miniatura de ${product.name}`} 
          className="w-28 h-28 object-cover rounded-lg flex-shrink-0" 
        />
        
        <div className="flex-1 py-1">
          {/* Nome e Categoria */}
          <div className="font-semibold text-base line-clamp-1">{product.name}</div>
          <div className="text-sm text-gray-500 mt-1 line-clamp-1">{product.category}</div>
          
          {/* Preço */}
          <div className="mt-2 font-bold text-pink-500">{fmt(product.price)}</div>
          
          {/* Botão de Ação */}
          <Button 
            variant="link" 
            size="sm" 
            className="p-0 h-auto mt-1 text-teal-700 hover:text-teal-500"
          >
            Ver Detalhes →
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default SimulatedProductCard;