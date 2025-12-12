"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, Truck, Box, Star, Feather, ArrowRight, Grid, Tag, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Array de imagens para o carrossel lateral
const heroCarouselImages = [
  { src: "/images/cola.jpg", alt: "Papelaria de design em destaque", rotation: "rotate-3" },
  { src: "/images/col2.jpg", alt: "Cadernos coloridos e canetas", rotation: "-rotate-2" },
  { src: "/images/test.jpg", alt: "Planner aberto e café", rotation: "rotate-1" },
];

// Configurações e Mini Banners
const miniBanners = [
  {
    title: "Caderno Inteligente",
    subtitle: "Modular e Sustentável.",
    link: "/category/cadernos",
    icon: <Grid size={24} className="text-[#030a7f]" />,
    bgClass: "bg-[#e8eaff]",
  },
  {
    title: "Descontos de 20%",
    subtitle: "Últimas unidades de Inverno.",
    link: "/sale",
    icon: <Tag size={24} className="text-[#f36915]" />,
    bgClass: "bg-[#fff1e7]",
  },
  {
    title: "Kits Presenteáveis",
    subtitle: "Monte seu kit personalizado.",
    link: "/kits",
    icon: <Gift size={24} className="text-[#030a7f]" />,
    bgClass: "bg-[#e8eaff]",
  },
];

const ThreeBannersSection: React.FC = () => (
  <section className="container mx-auto px-4 mt-8 mb-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {miniBanners.map((banner, index) => (
        <Link key={index} href={banner.link} className="group block">
          <Card className={`shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 ${banner.bgClass} border-none`}>
            <CardContent className="py-6 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white shadow-md group-hover:bg-gray-100 transition">
                {banner.icon}
              </div>
              <div>
                <h4 className="font-bold text-lg">{banner.title}</h4>
                <p className="text-gray-600 text-sm flex items-center">
                  {banner.subtitle}
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition" />
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  </section>
);

const HeroSection: React.FC = () => {
  // Estado para controlar a imagem atual do carrossel lateral
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Efeito para trocar a imagem automaticamente a cada 5 segundos (5000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroCarouselImages.length
      );
    }, 5000); // Troca a cada 5 segundos

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  const currentImage = heroCarouselImages[currentImageIndex];

  return (
    <>
      {/* 1. Mini Banners (ThreeBannersSection) */}
      <ThreeBannersSection />

      {/* 2. Hero Section Principal */}
      <header className="relative overflow-hidden bg-gray-50/50">
        <div className="container mx-auto px-4 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Texto */}
          <div className="max-w-xl">

            {/* Badge */}
            <Badge className="bg-[#e8eaff] text-[#030a7f] px-3 py-1 rounded-full text-sm font-semibold">
              ✨ Nova Coleção de Verão
            </Badge>

            <h1 className="mt-6 text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
              Tudo para sua criatividade — papéis, canetas e planners pensados para você
            </h1>

            <p className="mt-4 text-lg text-gray-600">
              Produtos selecionados com cuidado para estudantes, artistas e quem ama papelaria.
              Materiais que inspiram a próxima grande ideia.
            </p>

            {/* CTAs */}
            <div className="flex gap-3 mt-8">
              <Link href="#departamentos">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#030a7f] text-[#030a7f] hover:bg-[#e8eaff]"
                >
                  Confira
                </Button>
              </Link>
            </div>
            
          </div>

          {/* Imagem + Card Flutuante (CARROSSEL LATERAL) */}
          <div className="relative">
            {/* ⬅️ MUDANÇA: Aplicações de animação e transição */}
            <div 
              key={currentImageIndex} // Key muda para forçar a re-renderização/transição
              className={`
                rounded-3xl overflow-hidden shadow-2xl border border-gray-100 
                transform transition-all duration-1000 ease-in-out
                hover:rotate-0
                ${currentImage.rotation}
              `}
            >
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="object-cover w-full h-[450px] md:h-[500px]"
              />
            </div>
            
            {/* Card Flutuante (Mantido estático para sobrepor o carrossel) */}
            <Card className="absolute left-[-1rem] bottom-[-2rem] bg-white rounded-2xl shadow-xl p-5 w-72 border border-[#fff1e7] hover:shadow-[#f36915]/40 transition">
              <CardContent className="p-0">
                <div className="text-sm font-medium text-[#030a7f] flex items-center gap-1">
                  <Star size={14} className="text-[#f36915]" /> Lançamento Exclusivo
                </div>

                <div className="font-bold text-lg mt-1">Planner Minimalista 2026</div>

                <div className="text-gray-600 text-sm mt-2 flex items-center gap-1">
                  <Feather size={14} className="text-gray-400" /> Papel 120g, capa dura e sustentável.
                </div>

                <div className="mt-4">
                  <Link href="/products/planner-2026">
                    <Button size="sm" className="bg-[#030a7f] hover:bg-[#020866]">
                      Descobrir Coleção
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeroSection;