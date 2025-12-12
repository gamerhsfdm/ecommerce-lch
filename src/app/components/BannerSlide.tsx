import React from 'react';

interface BannerSlideProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  theme?: 'dark' | 'light';
  isActive: boolean;
}

const BannerSlide: React.FC<BannerSlideProps> = ({
  title,
  subtitle,
  backgroundImage,
  theme = 'light',
  isActive,
}) => {

  const textColor = theme === 'light' ? 'text-white' : 'text-gray-900';

  // Animação leve de zoom para o slide ativo
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'transform 1.2s ease, opacity 0.8s ease',
    transform: isActive ? 'scale(1.05)' : 'scale(1)',
    opacity: isActive ? 1 : 0.85,
  };

  return (
    <div className="relative w-full h-full flex items-center p-8 md:p-16 overflow-hidden">

      {/* Imagem de fundo */}
      <div
        className="absolute inset-0 z-0 transition-all duration-1000"
        style={backgroundStyle}
        aria-hidden="true"
      ></div>

      {/* Conteúdo */}
      <div
        className={`
          relative z-20 max-w-6xl mx-auto w-full ${textColor}
          transition-all duration-700
          ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <div className="max-w-xl space-y-4 drop-shadow-[0_3px_8px_rgba(0,0,0,0.45)]">

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            {title}
          </h1>

          <p className="text-lg md:text-xl font-medium opacity-95">
            {subtitle}
          </p>

        </div>
      </div>
    </div>
  );
};

export default BannerSlide;
