"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Search, Menu, User, Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import CartIcon from "./CartIcon";
import { Categories } from "../components/Categories";

interface NavBarProps {
  query: string;
  setQuery: (query: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ query, setQuery }) => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  // Ref para armazenar o ID do timer de fechamento
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const moreMenuItems = [
    "Mais vendidos",
    "Novidades",
    "Promoções",
    "Volta às Aulas",
    "Kits Presentes",
    "Blog",
  ];

  // Função para abrir o menu e limpar o timer de fechamento
  const handleMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setCategoriesOpen(true);
  };

  // Função para iniciar o timer de fechamento do menu (delay de 300ms)
  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setCategoriesOpen(false);
    }, 300); // 300ms de delay
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      {/* TOP BAR */}
      <div className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              🚚 Frete grátis acima de R$ 99
            </span>
            <span className="flex items-center gap-1">
              ✨ Novidades toda semana
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/track-order" className="hover:underline">
              Rastrear Pedido
            </Link>
            <Link href="/help-center" className="hover:underline">
              Atendimento
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* DESKTOP NAVBAR */}
        <div className="hidden md:flex items-center justify-between h-24">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 p-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-300 to-pink-300 rounded-2xl flex items-center justify-center shadow">
              <svg width="26" height="26" fill="none">
                <path
                  d="M12 2L4 7V17L12 22L20 17V7L12 2Z"
                  fill="white"
                  opacity="0.9"
                />
              </svg>
            </div>
            <span className="text-[22px] font-semibold text-gray-900">
              Papelaria Criativa
            </span>
          </Link>

          {/* CATEGORIAS BUTTON - Aplicando os manipuladores de mouse */}
          <div
            className="hidden lg:flex relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Button
              variant="outline"
              className="rounded-full bg-white border-purple-300 text-purple-700 shadow-sm hover:bg-purple-50"
            >
              <Menu size={20} className="mr-2" />
              Categorias
            </Button>
          </div>

          {/* SEARCH BAR */}
          <div className="flex flex-1 justify-center px-6">
            <div className="flex items-center w-full max-w-xl bg-gray-100 rounded-full px-5 py-3 shadow-inner">
              <Input
                placeholder="Buscar produtos, categorias..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-0 bg-transparent shadow-none focus-visible:ring-0"
              />
              <Button className="rounded-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow hover:opacity-90">
                <Search size={20} />
              </Button>
            </div>
          </div>

          {/* ICONS */}
          <div className="flex items-center gap-6">
            <Link
              href="/account"
              className="flex flex-col items-center text-gray-700 hover:text-purple-600"
            >
              <User size={22} />
              <span className="text-xs">Conta</span>
            </Link>
            <Link
              href="/account?tab=favorites"
              className="flex flex-col items-center text-gray-700 hover:text-purple-600"
            >
              <Heart size={22} />
              <span className="text-xs">Favoritos</span>
            </Link>
            <CartIcon />
          </div>
        </div>
      </div>

      {/* CONTAINER PARA O MENU ADICIONAL E CATEGORIAS DROPDOWN */}
      <div className="relative">
        {/* MENU MAIS (MENU ADICIONAL) */}
        <div className="hidden lg:flex justify-center gap-5 p-2 text-gray-700 text-sm font-medium">
          {moreMenuItems.map((item) => (
            <Link
              key={item}
              href="#"
              className="hover:text-purple-600 transition-colors px-2 py-1"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CATEGORIES DROPDOWN - Aplicando os manipuladores de mouse */}
        {categoriesOpen && (
          <div
            className="absolute top-full left-0 w-full bg-white shadow-xl z-50 border-t border-gray-100"
            onMouseEnter={handleMouseEnter} // MANTÉM ABERTO SE ENTRAR AQUI
            onMouseLeave={handleMouseLeave} // INICIA O TIMER DE FECHAMENTO SE SAIR DAQUI
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <Categories />
            </div>
          </div>
        )}
      </div>

      {/* MOBILE NAVBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:hidden flex items-center justify-between h-20">
          {/* LOGO MOBILE */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-300 to-pink-300 rounded-2xl flex items-center justify-center shadow">
              <svg width="22" height="22" fill="none">
                <path
                  d="M12 2L4 7V17L12 22L20 17V7L12 2Z"
                  fill="white"
                  opacity="0.9"
                />
              </svg>
            </div>
            <span className="text-xl font-semibold">Criativa</span>
          </Link>

          {/* MENU MOBILE */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost">
                <Menu size={26} className="text-gray-900" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <div className="p-4">
                {/* Busca mobile */}
                <div className="flex items-center bg-gray-100 rounded-lg pr-2 gap-2 border mb-4">
                  <Input
                    placeholder="Buscar produtos..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border-0 bg-transparent shadow-none"
                  />
                  <Search size={18} className="text-gray-500" />
                </div>

                <Separator className="my-4" />

                {/* Menu */}
                <nav className="flex flex-col gap-2">
                  <Link
                    href="/"
                    className="text-lg py-2 hover:bg-gray-50 rounded-md"
                  >
                    Home
                  </Link>
                  <Link
                    href="/products"
                    className="text-lg py-2 hover:bg-gray-50 rounded-md"
                  >
                    Produtos
                  </Link>
                  <Link
                    href="/account/favorites"
                    className="text-lg py-2 hover:bg-gray-50 rounded-md"
                  >
                    Favoritos
                  </Link>
                  <Link
                    href="/contact"
                    className="text-lg py-2 hover:bg-gray-50 rounded-md"
                  >
                    Contato
                  </Link>
                  <Separator className="my-2" />
                  {moreMenuItems.map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="text-lg py-2 hover:bg-gray-50 rounded-md"
                    >
                      {item}
                    </Link>
                  ))}
                  <Separator className="my-2" />
                  <Categories />
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
