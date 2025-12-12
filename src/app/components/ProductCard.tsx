"use client";

import React, { useState } from "react";
import { Product } from "../../types/product";
import { useCartStore } from "../../store/cartStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingBag, Star, Heart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product & { rating?: number };
}

const FALLBACK_IMAGE_URL =
  "https://via.placeholder.com/600x400?text=Sem+Foto";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartStore();
  const [isFavorite, setIsFavorite] = useState(false);

  const isOutOfStock = false;
  const rating = product.rating || 4;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isOutOfStock) addToCart(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card
      className="
        flex flex-col h-full overflow-hidden 
        shadow-md border border-gray-200 
        transition-all duration-300 
        hover:shadow-xl 
        hover:border-[#030a7f]/70
        hover:-translate-y-1
        group
      "
    >
      <Link
        href={`/product/${product.id}`}
        passHref
        className="flex flex-col flex-grow relative"
      >
        {/* Imagem */}
        <div className="relative overflow-hidden h-48 rounded-t-xl">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMAGE_URL;
            }}
          />

          {/* Selo */}
          <div
            className="
              absolute top-3 left-3 
              bg-[#030a7f] text-white 
              text-[11px] font-bold px-3 py-1 
              rounded-full shadow-md
            "
          >
            ⚡ Melhor Venda
          </div>

          {/* Favoritar */}
          <button
            onClick={handleToggleFavorite}
            className="
              absolute top-3 right-3 
              p-1 rounded-full 
              bg-white/90 hover:bg-white 
              shadow-md transition
            "
          >
            <Heart
              size={20}
              className={cn(
                "transition-colors",
                isFavorite
                  ? "fill-[#f36915] text-[#f36915]"
                  : "fill-gray-300 text-gray-300"
              )}
            />
          </button>

          {/* Esgotado */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center">
              <span className="text-white text-lg font-extrabold p-2 bg-red-600 rounded-full animate-pulse">
                ESGOTADO
              </span>
            </div>
          )}
        </div>

        {/* Infos */}
        <CardContent className="p-4 pb-3 flex-grow">
          <h3
            className="
              text-lg font-bold line-clamp-2 min-h-[50px] 
              text-gray-800 
              group-hover:text-[#030a7f] 
              transition-colors duration-300
            "
          >
            {product.name}
          </h3>

          <p className="text-sm text-gray-500 mt-1">{product.category}</p>

          {/* Rating */}
          <div className="flex items-center mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < rating
                    ? "fill-[#f36915] text-[#f36915]"
                    : "fill-gray-300 text-gray-300"
                }
              />
            ))}
            <span className="ml-2 text-xs text-gray-500">
              ({rating}.0)
            </span>
          </div>
        </CardContent>
      </Link>

      {/* Preço + Carrinho */}
      <CardFooter className="p-4 pt-0">
        <div className="w-full flex flex-col sm:flex-row items-end justify-between gap-3">
          <div
            className="
              text-3xl font-extrabold 
              text-[#030a7f] 
              group-hover:text-[#f36915]
              transition-colors
            "
          >
            {formatCurrency(product.price)}
          </div>

          <Button
            size="lg"
            className="
              bg-[#030a7f] 
              hover:bg-[#f36915] 
              text-white font-semibold 
              w-full sm:w-auto
              transition-all
              shadow-md hover:shadow-lg
            "
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            <ShoppingBag size={20} className="mr-2" />
            Adicionar
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
