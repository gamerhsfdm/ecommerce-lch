import React from 'react';
import Link from 'next/link';
import { Zap, Gift, Backpack } from 'lucide-react';

// Estrutura de dados para o menu: Categoria Principal + Subcategorias
const menuStructure = [
  {
    title: 'Cadernos',
    icon: '📓', // Cadernos
    subcategories: [
      'Universitários',
      'Executivos',
      'Minimalistas',
      'Bullet Journal',
    ],
    href: '/cadernos',
  },
  {
    title: 'Canetas',
    icon: '✏️', // Canetas
    subcategories: [
      'Gel',
      'Esferográfica',
      'Marcadores',
      'Pastel',
    ],
    href: '/canetas',
  },
  {
    title: 'Planners',
    icon: '📅', // Planners
    subcategories: [
      'Mensais',
      'Semanais',
      'Diários',
      'Executivos',
    ],
    href: '/planners',
  },
  {
    title: 'Papel',
    icon: '📄', // Papel
    subcategories: [
      'Post-its',
      'Craft',
      'Scrapbook',
      'Washi Tape',
    ],
    href: '/papel',
  },
  {
    title: 'Kits',
    icon: '🎁', // Kits
    subcategories: [
      'Completos',
      'Estudante',
      'Escritório',
      'Presente',
    ],
    href: '/kits',
  },
];

// Estrutura de dados para os boxes de destaque na parte inferior
const highlightBoxes = [
  {
    name: 'Especial',
    label: 'Volta às Aulas',
    bgColor: 'bg-pink-100', // Corrigido para as cores da imagem
    icon: Backpack,
    iconColor: 'text-pink-500',
    href: '/volta-as-aulas',
  },
  {
    name: 'Ofertas',
    label: 'Até 50% OFF',
    bgColor: 'bg-purple-100', // Corrigido para as cores da imagem
    icon: Zap,
    iconColor: 'text-purple-500',
    href: '/ofertas',
  },
  {
    name: 'Novidade',
    label: 'Kits Presentes',
    bgColor: 'bg-yellow-100', // Corrigido para as cores da imagem
    icon: Gift,
    iconColor: 'text-yellow-700',
    href: '/kits-presentes',
  },
];

export function Categories() {
  return (
    // Container principal do menu dropdown
    <div className="flex flex-col gap-6 p-4">

      {/* 1. SEÇÃO DE CATEGORIAS (Grid de 5 Colunas) */}
      <div className="grid grid-cols-5 gap-8">
        {menuStructure.map((category, index) => (
          <div key={index} className="flex flex-col">
            {/* Título da Categoria Principal */}
            <Link href={category.href} className="flex items-center gap-2 mb-3 hover:text-purple-600 transition-colors">
              <span className="text-xl">{category.icon}</span>
              <h4 className="text-lg font-semibold text-gray-800">{category.title}</h4>
            </Link>
            
            {/* Lista de Subcategorias */}
            <nav className="flex flex-col gap-1">
              {category.subcategories.map((sub, subIndex) => (
                <Link
                  key={subIndex}
                  href={`${category.href}/${sub.toLowerCase().replace(/\s/g, '-')}`}
                  className="text-sm text-gray-600 hover:text-purple-600 transition-colors py-1"
                >
                  {sub}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* 2. SEÇÃO DE DESTAQUES (Três Boxes na parte de baixo) */}
      <div className="flex justify-between gap-6 pt-4 border-t border-gray-100">
        {highlightBoxes.map((box, index) => (
          <Link
            key={index}
            href={box.href}
            className={`flex flex-1 items-center p-6 rounded-xl transition-all duration-200 shadow-sm hover:shadow-lg ${box.bgColor}`}
          >
            {/* Ícone e Emoji */}
            <div className={`mr-4 p-3 rounded-xl bg-white/50 ${box.iconColor}`}>
              <box.icon size={24} />
            </div>
            
            {/* Texto de Destaque */}
            <div>
              <p className="text-xs font-medium text-gray-600 mb-1">{box.name}</p>
              <h5 className="text-lg font-bold text-gray-800">{box.label}</h5>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}