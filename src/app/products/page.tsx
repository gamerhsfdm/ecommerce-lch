// src/app/products/page.tsx
"use client";

import React, { useState } from "react";
// Importe o seu tipo Product (assumindo que o caminho está correto)
import { Product } from "../../types/product";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  ListFilter,
  LayoutGrid,
  SlidersHorizontal,
  ChevronDown,
  ShoppingCart,
} from "lucide-react";

// Componentes de Interface (shadcn)
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
// Importação de todos os componentes de paginação, inclusive o Ellipsis
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

// --- Dados Mockados (Substitua pela sua lógica de API) ---
const mockProducts: Product[] = Array.from({ length: 15 }).map((_, i) => ({
  id: String(i + 1),
  name: `Caderno Inteligente PRO ${i + 1}`,
  description: "Ideal para notas diárias e projetos complexos.",
  price: 49.9 + i * 5,
  imageUrl: `/images/product-${(i % 4) + 1}.jpg`,
  rating: (i % 5) + 1,
  category: i % 2 === 0 ? "Escrita" : "Design",
}));

const categories = ["Escrita", "Design", "Tecnologia", "Papelaria"];
const brands = ["ShopSphere", "Fabrica", "Premium"];

// --- 2. Componentes de UI ---

// Componente para um único Produto no Grid
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Lógica simples para formatar preço e rating
  const formattedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(product.price);

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl group">
      <Link
        href={`/product/${product.id}`}
        className="relative block overflow-hidden h-48"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badge de Destaque */}
        <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
          Novo
        </div>
      </Link>

      <CardHeader className="p-4 pb-0 flex-grow">
        <h3 className="text-lg font-semibold line-clamp-2">
          <Link
            href={`/product/${product.id}`}
            className="hover:text-teal-700 transition-colors"
          >
            {product.name}
          </Link>
        </h3>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <p className="text-2xl font-bold text-teal-700 mb-2">
          {formattedPrice}
        </p>

        {/* Área para Rating (simplificado) */}
        <div className="flex items-center text-yellow-500 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={cn(
                "w-4 h-4",
                i < product.rating ? "fill-yellow-500" : "fill-gray-300"
              )}
              viewBox="0 0 24 24"
            >
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.62L12 2L9.19 8.62L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
            </svg>
          ))}
          <span className="ml-2 text-gray-500 text-xs">
            ({product.rating}.0)
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-pink-500 hover:bg-pink-600 transition-colors gap-2">
          <ShoppingCart size={18} />
          Adicionar
        </Button>
      </CardFooter>
    </Card>
  );
};

// Componente de Filtro Expansível na Sidebar
interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
}

const FilterGroup: React.FC<FilterGroupProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="py-4 border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-lg font-semibold text-gray-800 hover:text-teal-700 transition-colors"
      >
        {title}
        <ChevronDown
          size={20}
          className={cn(
            "transition-transform",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </button>
      <div
        className={cn(
          "mt-3 overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96" : "max-h-0"
        )}
      >
        {children}
      </div>
    </div>
  );
};

// --- 3. Página Principal (Layout e Filtros) ---

export default function ProductListingPage() {
  // Tipagem correta para o Slider: um array de dois números.
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 300]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Simulação da lista filtrada e paginada
  const productsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockProducts.length / productsPerPage);

  const paginatedProducts = mockProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Função para renderizar os botões de página (com melhor lógica de exibição)
  const renderPaginationItems = () => {
    const pageItems = [];
    // Lógica de Paginação simples: apenas mostra todas as páginas
    for (let i = 1; i <= totalPages; i++) {
      pageItems.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => setCurrentPage(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pageItems;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-10 md:py-16">
        {/* Título e Controles */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Resultados da Busca
          </h1>
          <p className="text-gray-500 mt-1">
            Exibindo {paginatedProducts.length} de {mockProducts.length}{" "}
            produtos.
          </p>
        </div>

        {/* Layout Principal: Sidebar + Conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* --- Sidebar de Filtros (Coluna 1) --- */}
          <aside className="lg:col-span-1 p-6 bg-white rounded-xl shadow-lg border">
            <div className="flex items-center text-xl font-bold text-teal-700 mb-4">
              <SlidersHorizontal size={24} className="mr-2" />
              Filtros
            </div>
            <Separator />

            {/* Filtro de Categoria */}
            <FilterGroup title="Categorias">
              <div className="space-y-3 text-sm">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cat-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                      className="data-[state=checked]:bg-teal-700"
                    />
                    <label
                      htmlFor={`cat-${category}`}
                      className="text-gray-700 hover:text-gray-900 cursor-pointer"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </FilterGroup>

            {/* Filtro de Preço */}
            <FilterGroup title="Preço (R$)">
              <div className="px-1">
                {/* CORREÇÃO 1: Tipagem do onValueChange */}
                <Slider
                  min={0}
                  max={500}
                  step={10}
                  defaultValue={[50, 300]}
                  value={priceRange}
                  onValueChange={(value: number[]) =>
                    setPriceRange(value as [number, number])
                  } // Tipagem corrigida
                  className="my-4"
                />
                <div className="flex justify-between text-sm font-medium text-gray-700">
                  <span>R${priceRange[0]},00</span>
                  <span>R${priceRange[1]},00</span>
                </div>
              </div>
            </FilterGroup>

            {/* Filtro de Marca */}
            <FilterGroup title="Marca">
              <div className="space-y-3 text-sm">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      className="data-[state=checked]:bg-teal-700"
                    />
                    <label
                      htmlFor={`brand-${brand}`}
                      className="text-gray-700 hover:text-gray-900 cursor-pointer"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </FilterGroup>

            {/* Botão de Limpar Filtros */}
            <div className="mt-6">
              <Button
                variant="outline"
                className="w-full border-teal-700 text-teal-700 hover:bg-teal-50"
              >
                Limpar Filtros
              </Button>
            </div>
          </aside>

          {/* --- Área de Produtos (Colunas 2-4) --- */}
          <div className="lg:col-span-3">
            {/* Barra de Ordenação e Visualização */}
            <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm border">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <ListFilter size={18} className="text-gray-400" />
                <label>Ordenar por:</label>
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Relevância" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevância</SelectItem>
                    <SelectItem value="price-asc">
                      Preço: Menor para Maior
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Preço: Maior para Menor
                    </SelectItem>
                    <SelectItem value="newest">Mais Recentes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Controles de Visualização (Grid/Lista) */}
              <div className="hidden md:flex items-center space-x-2">
                <Button size="icon" variant="ghost" className="text-teal-700">
                  <LayoutGrid size={20} />
                </Button>
                {/* Implementar a visualização em lista aqui se necessário */}
              </div>
            </div>

            {/* Grid de Produtos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Paginação */}
            {totalPages > 1 && ( // Só mostra a paginação se houver mais de 1 página
              <div className="mt-10">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        // CORREÇÃO 2: Adiciona a propriedade 'disabled' para estilização visual e lógica
                        disabled={currentPage === 1}
                        // A propriedade aria-disabled deve ser passada como string "true" ou "false" para HTML/Aria
                        aria-disabled={currentPage === 1 ? "true" : "false"}
                      />
                    </PaginationItem>

                    {/* Mapeamento dos botões de página */}
                    {renderPaginationItems()}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1)
                          )
                        }
                        // CORREÇÃO 2: Adiciona a propriedade 'disabled' para estilização visual e lógica
                        disabled={currentPage === totalPages}
                        aria-disabled={
                          currentPage === totalPages ? "true" : "false"
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
