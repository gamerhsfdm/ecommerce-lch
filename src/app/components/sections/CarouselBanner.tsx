"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Banner {
  id: number;
  alt: string;
  imageUrl: string;
  linkUrl: string;
  bgColor: string;
  title: string;
  description: string;
}

const CAROUSEL_BANNERS: Banner[] = [
  {
    id: 1,
    title: "MEGA SALDÃO DE VERÃO",
    description: "Até 50% OFF em itens selecionados. Aproveite!",
    imageUrl: "/images/1.png",
    linkUrl: "/promocoes/verao",
    alt: "Mega Saldão de Verão",
    bgColor: "#0A1A2F",
  },
  {
    id: 2,
    title: "NOVOS LANÇAMENTOS",
    description: "Confira as últimas novidades em eletrônicos e gadgets.",
    imageUrl: "/images/2.png",
    linkUrl: "/novidades",
    alt: "Novos Lançamentos",
    bgColor: "#0A1A2F",
  },
  {
    id: 3,
    title: "FRETE GRÁTIS ACIMA DE R$ 199",
    description: "Válido para todo o Sudeste.",
    imageUrl: "/images/3.png",
    linkUrl: "/frete",
    alt: "Frete Grátis",
    bgColor: "#0A1A2F",
  },
];

const OPTIONS: EmblaOptionsType = { loop: true, duration: 30 };

const CarouselButton = ({ onClick, icon, disabled, className }: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "absolute top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-all z-10",
      "bg-white/90 text-[#0A1A2F] hover:bg-white disabled:opacity-40",
      className
    )}
  >
    {icon}
  </button>
);

export const CarouselBanner: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback((embla: any) => {
    setPrevBtnDisabled(!embla.canScrollPrev());
    setNextBtnDisabled(!embla.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("select", onSelect);

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl mt-10">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {CAROUSEL_BANNERS.map((banner) => (
            <div key={banner.id} className="embla__slide flex-shrink-0 w-full">
              <a href={banner.linkUrl} className="block relative h-96 md:h-[450px] group overflow-hidden">

                <img
                  src={banner.imageUrl}
                  alt={banner.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.style.backgroundColor = banner.bgColor;
                  }}
                />

                {/* Texto sobreposto */}
                <div className="absolute inset-0 bg-[#0A1A2F]/60 flex flex-col justify-center items-center text-center p-4">
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-xl">
                    {banner.title}
                  </h2>
                  <p className="text-xl mt-2 text-white/80 max-w-xl">
                    {banner.description}
                  </p>

                  <button
                    className="mt-6 px-8 py-3 rounded-full text-lg font-bold shadow-xl transition-all
                    bg-[#FF6A00] hover:bg-[#e05800]"
                  >
                    VER OFERTAS
                  </button>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Botões laterais */}
      <CarouselButton
        onClick={scrollPrev}
        disabled={prevBtnDisabled}
        icon={<ChevronLeft size={26} />}
        className="left-4"
      />

      <CarouselButton
        onClick={scrollNext}
        disabled={nextBtnDisabled}
        icon={<ChevronRight size={26} />}
        className="right-4"
      />

      {/* Dots */}
      <div className="absolute bottom-5 w-full flex justify-center gap-2">
        {CAROUSEL_BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={cn(
              "w-3 h-3 rounded-full transition-all",
              "bg-white/40 hover:bg-white/90",
              emblaApi && i === emblaApi.selectedScrollSnap() ? "bg-[#FF6A00] scale-125" : ""
            )}
          />
        ))}
      </div>
    </div>
  );
};
