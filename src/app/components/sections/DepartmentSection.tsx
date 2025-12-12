"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Feather,
  Sparkles,
  Truck,
  Box,
  BookOpen,
  ChevronsRight, // Novo ícone opcional para o título
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const categories = [
  { name: "Cadernos", icon: BookOpen, slug: "cadernos" },
  { name: "Canetas", icon: Feather, slug: "canetas" },
  { name: "Planners", icon: Sparkles, slug: "planners" },
  { name: "Artes", icon: Award, slug: "artes" },
  { name: "Organização", icon: Box, slug: "organizacao" },
  { name: "Acessórios", icon: Truck, slug: "acessorios" },
];

export function DepartmentsSection() {
  // Cores de destaque: Roxo e Rosa, que são mais suaves e criativas
  const primaryColor = "text-purple-600";
  const hoverColor = "hover:text-pink-500";
  const ringColor = "ring-pink-300";

  return (
    // ⬅️ MUDANÇA: Fundo branco/claro para sutileza
    <section
      id="departamentos"
      className="bg-white py-12 px-4 sm:px-6 lg:px-8" 
    >
      {/* ⬅️ MUDANÇA: Título mais sutil, usando gradiente e ícones */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-10">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
            Explore Nossos Departamentos
          </span>
          <ChevronsRight size={24} className="inline-block ml-2 text-gray-400" />
        </h2>

        {/* MENU ORGANIZADO */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {categories.map(({ icon: Icon, name, slug }) => (
            <Link key={slug} href={`/category/${slug}`}>
              {/* ⬅️ MUDANÇA: Cartão de link mais elegante e com efeito de foco */}
              <div
                className={`
                  bg-white rounded-xl p-4 h-full
                  flex flex-col items-center justify-center
                  shadow-lg border border-gray-100 cursor-pointer
                  transition-all duration-300 
                  hover:shadow-xl hover:ring-2 ${ringColor}
                  transform hover:-translate-y-1 group
                `}
              >
                {/* ⬅️ MUDANÇA: Círculo de ícone mais sutil (roxo claro) */}
                <div
                  className={`
                    p-3 mb-3 rounded-full 
                    bg-purple-100 transition-colors duration-300
                    group-hover:bg-pink-100
                  `}
                >
                  <Icon
                    size={24}
                    className={`text-purple-600 group-hover:text-pink-600 transition-colors`}
                  />
                </div>

                {/* ⬅️ MUDANÇA: Texto com cor primária e efeito hover elegante */}
                <span className={`text-sm font-semibold ${primaryColor} ${hoverColor} transition-colors text-center`}>
                  {name}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* ⬅️ MUDANÇA: Separador mais suave (cinza claro) */}
        <Separator className="mt-12 bg-gray-200" />
      </div>
    </section>
  );
}