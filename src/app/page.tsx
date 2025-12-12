"use client";

import React, { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Componentes principais
import NavBar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import BannerCarousel from "./components/BannerCarousel";
import { FeaturedProductsFetcher } from "./components/FeaturedProductsFetcher";
import { DepartmentsSection } from "./components/sections/DepartmentSection";

// shadcn/ui components
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

// Lazy components
const LazyValuePropsSection = dynamic(
  () =>
    import("./components/sections/ValuePropsSection").then(
      (mod) => mod.ValuePropsSection
    ),
  {
    loading: () => (
      <div className="h-40 bg-gray-100 rounded-lg animate-pulse my-12" />
    ),
  }
);

const LazyCustomerReviewsSection = dynamic(
  () =>
    import("./components/sections/CustomerReviewsSection").then(
      (mod) => mod.CustomerReviewsSection
    ),
  {
    loading: () => (
      <div className="h-64 bg-gray-100 rounded-lg animate-pulse my-12" />
    ),
  }
);

const Loader = () => (
  <div className="flex justify-center items-center h-40 my-12">
    <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
  </div>
);

// Dados mock do carrossel
const CAROUSEL_BANNERS = [
  { id: 1, backgroundImage: "/images/test.jpg" },
  { id: 2, backgroundImage: "/images/col3.jpg" },
];

export default function HomePageClient() {
  const [query, setQuery] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Obrigado! (Implementar envio para o backend)");
  };

  return (
    <div className="bg-white min-h-screen text-gray-800">

      {/* 1. NAVBAR (Fixo no Topo) */}
      <NavBar query={query} setQuery={setQuery} categories={[]} />

      {/* 2. CONTEÚDO PRINCIPAL: Adiciona margem superior para evitar sobreposição do Navbar */}
      {/* ⚠️ Nota: A classe 'mt-[128px]' é um palpite para a altura do seu NavBar.
         Ajuste este valor se o seu NavBar for mais alto ou mais baixo. */}
      <div className="pt-[128px] md:pt-[136px]"> 
        
        {/* BANNER CAROUSEL (DESTAQUE MÁXIMO) */}
        <div className="w-full">
          <BannerCarousel banners={CAROUSEL_BANNERS} interval={6000} />
        </div>

        {/* HERO SECTION (Mini Banners + Conteúdo Principal) */}
        {/* A HeroSection já deve ter o container, então não precisa de container aqui */}
        <HeroSection /> 

        <main className="container mx-auto px-4 pb-20">        

          {/* LAZY SECTIONS: VALUE PROPOSITIONS (Logo abaixo do Hero) */}
          <Suspense fallback={<Loader />}>
            <LazyValuePropsSection />
          </Suspense>

          {/* DEPARTAMENTOS (Geralmente antes ou depois dos Value Props) */}
          <DepartmentsSection />
          
          {/* PRODUTOS EM DESTAQUE */}
          <FeaturedProductsFetcher query={query} setQuery={setQuery} />

          {/* LAZY SECTIONS: CUSTOMER REVIEWS */}
          <Suspense fallback={<Loader />}>
            <LazyCustomerReviewsSection />
          </Suspense>

          <Separator className="mt-16" />

          {/* SOBRE */}
          <section id="sobre" className="mt-12 mb-16">
            <Card className="bg-gray-50 border-none shadow-none">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  
                  <div>
                    <h2
                      className="text-4xl font-extrabold mb-4 text-purple-700" // Ajuste de cor para #030a7f
                    >
                      Nossa Paixão NÃO é o Detalhe
                    </h2>

                    <p className="text-gray-600 mb-4 text-lg">
                      Nascemos da paixão por material de qualidade e design
                      funcional.
                    </p>

                    <p className="text-gray-600 mb-6">
                      Priorizamos fornecedores com práticas responsáveis.
                    </p>

                    <div className="flex gap-4 mt-4">
                      <Link href="/about">
                        <Button
                          className="px-6 text-white bg-purple-700 hover:bg-purple-800" // Ajuste de cor para #030a7f
                        >
                          Conheça a História
                        </Button>
                      </Link>

                      <Link href="/contact">
                        <Button
                          variant="outline"
                          className="border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                          Fale conosco
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-3xl overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-500">
                    <img
                      src="/images/1.png"
                      alt="Equipe ShopSphere"
                      className="object-cover w-full h-80"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          {/* NEWSLETTER (Ajuste de cores para tema criativo) */}
          <section
            id="contato"
            className="mt-12 mb-20 rounded-3xl p-10 md:p-16 text-white shadow-xl bg-purple-700" // Ajuste de cor para #030a7f
          >
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-4xl font-extrabold mb-2">Receba Inspiração e Ofertas</h3>

              <p className="opacity-80 mb-8 text-lg">
                Assine nossa newsletter para receber novidades.
              </p>

              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Input
                  type="email"
                  placeholder="Digite seu melhor e-mail..."
                  required
                  className="max-w-md bg-white/90 text-gray-800 h-12 text-base border-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-pink-500" // Ajuste de foco
                />

                <Button
                  type="submit"
                  className="h-12 text-base font-bold px-8 shadow-md text-white bg-pink-500 hover:bg-pink-600" // Ajuste de cor para #f36915
                >
                  Assinar
                </Button>
              </form>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}