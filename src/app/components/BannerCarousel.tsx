// src/components/BannerCarousel.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import BannerSlide from './BannerSlide';

interface BannerData {
  id: number;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  theme?: 'dark' | 'light';
}

interface BannerCarouselProps {
  banners: BannerData[];
  interval?: number;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners, interval = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = banners.length;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  useEffect(() => {
    if (totalSlides < 2) return;

    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [nextSlide, interval, totalSlides]);

  if (totalSlides === 0) return null;

  return (
    <div className="relative w-full h-[650px] md:h-[750px] overflow-hidden"> {/* MAIOR, SEM BORDA */}
      
      {/* Slides */}
      <div className="w-full h-full transition-opacity duration-1000 ease-in-out">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            <BannerSlide {...banner} isActive={index === currentSlide} />
          </div>
        ))}
      </div>

      {/* Botões de Navegação */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-6 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full transition z-30"
            aria-label="Anterior"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-6 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full transition z-30"
            aria-label="Próximo"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      {/* Indicadores (bolinhas) */}
      {totalSlides > 1 && (
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-30">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-pink-500 w-4 h-4"
                  : "bg-white/60 hover:bg-white w-3 h-3"
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            >
              <Circle size={1} className="opacity-0" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerCarousel;
