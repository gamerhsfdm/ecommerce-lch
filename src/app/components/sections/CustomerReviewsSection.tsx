"use client";

import React, { useState } from "react";
import { useMediaQuery } from "../../../hooks/use-media-query";
import { Quote, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// CORES OFICIAIS
const BLUE = "#030a7f";
const ORANGE = "#f36915";

// --- Tipo e Dados Mockados ---
interface Review {
  id: number;
  customerName: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  product?: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    customerName: "Mariana S.",
    avatarUrl: "/avatars/mariana.jpg",
    rating: 5,
    comment:
      "O Caderno de Disco é revolucionário! A qualidade é incrível e o sistema me ajudou demais. Entrega super rápida.",
    product: "Caderno Inteligente PRO",
  },
  {
    id: 2,
    customerName: "Ricardo F.",
    avatarUrl: "/avatars/ricardo.jpg",
    rating: 5,
    comment:
      "Melhor caneta técnica que já usei. Ponta precisa e tinta impecável. Atendimento excelente!",
    product: "Caneta Design Premium",
  },
  {
    id: 3,
    customerName: "Lúcia G.",
    avatarUrl: "/avatars/lucia.jpg",
    rating: 4,
    comment:
      "Recebi tudo muito bem embalado. A luminária é linda! Só atrasou 1 dia.",
    product: "Luminária LED Flex",
  },
  {
    id: 4,
    customerName: "Pedro H.",
    avatarUrl: "/avatars/pedro.jpg",
    rating: 5,
    comment:
      "Marcadores vibrantes e não atravessam o papel. Compra garantida!",
    product: "Kit Marcadores Neon",
  },
];

// --- Componente de Avaliação ---
const ReviewCard: React.FC<Review> = ({
  customerName,
  avatarUrl,
  rating,
  comment,
  product,
}) => {
  return (
    <Card className="flex flex-col h-full bg-white transition-all duration-300 border border-[#030a7f20] hover:border-[#030a7f] hover:shadow-xl rounded-xl hover:-translate-y-1">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        {/* Estrelas */}
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={18}
              className={
                i < rating
                  ? "fill-yellow-500 text-yellow-500"
                  : "fill-gray-300 text-gray-300"
              }
            />
          ))}
        </div>

        <Quote size={28} className="text-gray-300" />
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-gray-700 italic mb-4">{comment}</p>

        <Separator className="my-3" />

        {/* Cliente */}
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={avatarUrl} alt={customerName} />
            <AvatarFallback
              style={{ backgroundColor: `${BLUE}10`, color: BLUE }}
            >
              {customerName[0]}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-base font-semibold text-[#030a7f]">
              {customerName}
            </p>
            {product && (
              <p className="text-xs text-gray-500 mt-0.5">
                Comprador verificado • {product}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// --- Seção Principal ---
export const CustomerReviewsSection: React.FC = () => {
  const [showAllMobile, setShowAllMobile] = useState(false);

  // detecta se está no desktop (>=1024px)
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // MOBILE → mostra 2 / clicar mostra todos
  // DESKTOP → mostra sempre 4
  const visibleReviews = isDesktop
    ? mockReviews
    : showAllMobile
    ? mockReviews
    : mockReviews.slice(0, 2);

  const totalReviews = mockReviews.length;
  const averageRating = (
    mockReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
  ).toFixed(1);

  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#030a7f05]">
      <div className="container mx-auto px-4">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-[#030a7f] mb-3">
            O que nossos clientes dizem
          </h2>

          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            A satisfação é nossa prioridade. Leia relatos reais!
          </p>

          <div className="flex justify-center items-center mt-6 gap-3">
            <div
              className="flex items-center text-3xl font-bold"
              style={{ color: ORANGE }}
            >
              {averageRating}
              <Star size={30} className="fill-yellow-500 ml-2" />
            </div>
            <p className="text-gray-600">
              Baseado em {totalReviews} avaliações
            </p>
          </div>
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleReviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>

        {/* Botão Ver Mais (somente no mobile) */}
        {!isDesktop && (
          <div className="text-center mt-12">
            {!showAllMobile ? (
              <Button
                className="text-lg py-6 px-8 font-semibold border-2 rounded-full transition"
                style={{
                  borderColor: BLUE,
                  color: BLUE,
                }}
                onClick={() => setShowAllMobile(true)}
              >
                Ver mais avaliações
              </Button>
            ) : (
              <Button
                className="text-lg py-6 px-8 font-semibold rounded-full transition"
                style={{
                  backgroundColor: ORANGE,
                  color: "white",
                }}
                onClick={() => setShowAllMobile(false)}
              >
                Mostrar menos
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
