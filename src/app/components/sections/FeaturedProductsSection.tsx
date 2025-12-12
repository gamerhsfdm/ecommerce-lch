// src/components/sections/FeaturedProductsSection.tsx
import React from "react";
import { Product } from "../../../types/product";
import Link from "next/link";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

import ProductCard from "../ProductCard";
import SimulatedProductCard from "../SimulatedProductCard";

interface FeaturedProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  query: string;
  filteredProducts: Product[];
  setQuery: (query: string) => void;
}

const fmt = (v: number) => `R$ ${v.toFixed(2).replace(".", ",")}`;

const FeaturedLoadingSkeleton = () => (
  <div className="text-center p-8 bg-gray-50 rounded-lg">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mt-4">
      <div className="md:col-span-2 animate-pulse bg-gray-200 rounded-2xl h-96" />
      <div className="space-y-4">
        <div className="animate-pulse bg-gray-200 rounded-xl h-32" />
        <div className="animate-pulse bg-gray-200 rounded-xl h-32" />
      </div>
    </div>
  </div>
);

// Produto grande do carrossel
const ProductCarouselItem = ({
  product,
  next
}: {
  product: Product;
  next?: Product | undefined;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

      {/* CARD DE DESTAQUE */}
      <div className="md:col-span-2 bg-white rounded-2xl overflow-hidden shadow-lg border">
        <img
          src={product.imageUrl}
          alt={product.name ?? "Produto em destaque"}
          className="object-cover w-full h-80"
        />

        <div className="p-6">
          <Badge className="bg-[#030a7f] text-white hover:bg-[#f36915]">
            Destaque da Semana
          </Badge>

          <h3 className="text-2xl font-bold mt-2 text-[#030a7f]">
            {product.name ?? "Produto em destaque"}
          </h3>

          <p className="mt-2 text-gray-600 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-2xl font-extrabold text-[#f36915]">
              {fmt(product.price)}
            </div>

            <Button
              onClick={() => alert("Adicionar ao carrinho!")}
              className="bg-[#030a7f] hover:bg-[#f36915] text-white"
            >
              Comprar
            </Button>
          </div>
        </div>
      </div>

      {/* SIDE MINI CARDS */}
      <div className="space-y-4 hidden md:block">
        {next ? <SimulatedProductCard product={next} /> : null}

        <div className="bg-[#030a7f0e] rounded-xl p-4 border border-[#030a7f30]">
          <h4 className="font-bold text-[#030a7f]">Veja mais!</h4>
          <p className="text-sm text-[#030a7f] mt-1 opacity-80">
            Navegue para o lado e descubra outros lançamentos.
          </p>

          <Link href="/products">
            <Button
              variant="link"
              className="p-0 h-auto mt-2 text-[#f36915]"
            >
              Ver todos os produtos →
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
};

export function FeaturedProductsSection({
  products,
  loading,
  error,
  query,
  filteredProducts,
  setQuery
}: FeaturedProps) {
  return (
    <section id="produtos" className="mt-12 mb-16">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-extrabold text-[#030a7f]">
          Produtos em Destaque
        </h2>

        {/* MOBILE SEARCH */}
        <div className="flex items-center gap-2 md:hidden">
          <Input
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-32 border-[#030a7f]"
          />
          <Search size={18} className="text-[#030a7f]" />
        </div>
      </div>

      {loading && <FeaturedLoadingSkeleton />}

      {error && !loading && (
        <div className="text-center p-8 bg-red-50 text-red-700 border border-red-200 rounded-lg">
          ❌ {error}
        </div>
      )}

      {/* CARROSSEL */}
      {!loading && products.length > 0 && (
        <>
          <Carousel
            opts={{ align: "start", loop: true, dragFree: false }}
            className="w-full"
          >
            <CarouselContent>
              {products.map((p, index) => {
                const nextProduct = products[(index + 1) % products.length];

                return (
                  <CarouselItem
                    key={p.id}
                    className="md:basis-full lg:basis-full"
                  >
                    <ProductCarouselItem
                      product={p}
                      next={nextProduct}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <div className="flex gap-2 justify-center mt-4">
              <CarouselPrevious
                className="bg-[#030a7f] hover:bg-[#f36915] text-white"
              />
              <CarouselNext
                className="bg-[#030a7f] hover:bg-[#f36915] text-white"
              />
            </div>
          </Carousel>

          {/* GRID RESULTADOS */}
          <h3 className="text-2xl font-bold mt-12 mb-6 text-[#030a7f]">
            Mais Opções {query && `para "${query}"`}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}

            {query && filteredProducts.length === 0 && (
              <div className="col-span-4 text-center p-8 text-gray-500">
                Nenhum resultado encontrado para <b>{query}</b>.
              </div>
            )}
          </div>
        </>
      )}

      <Separator className="mt-12" />
    </section>
  );
}
