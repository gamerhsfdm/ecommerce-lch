// src/components/Banner.tsx
import React from 'react';

interface BannerProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  theme?: 'dark' | 'light';
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  backgroundImage,
  theme = 'light',
}) => {

  const textColor = theme === 'light' ? 'text-white' : 'text-gray-900';

  return (
    <div
      className="
        group
        relative w-full 
        h-[70vh] md:h-[75vh]
        rounded-2xl overflow-hidden
        flex items-center 
        p-8 md:p-20
      "
    >
      {/* Imagem com zoom no hover */}
      <div
        className="
          absolute inset-0 
          bg-cover bg-center 
          transition-transform duration-700 
          group-hover:scale-105
        "
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>

      {/* Conteúdo */}
      <div className={`relative z-10 max-w-2xl ${textColor} space-y-6`}>
        
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
          {title}
        </h1>

        <p className="text-xl md:text-2xl font-medium max-w-xl drop-shadow">
          {subtitle}
        </p>

      </div>
    </div>
  );
};

export default Banner;
