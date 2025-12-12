// tailwind.config.js
module.exports = {
  // ... outras configurações
  theme: {
    extend: {
      keyframes: {
        kenburns: { // Para o efeito suave no Hero
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
      },
      animation: {
        kenburns: 'kenburns 30s ease-out infinite alternate',
        // O 'animate-pulse' já é padrão no Tailwind.
        // Para 'slide-in-left', você pode usar bibliotecas como 'framer-motion' para animações no carregamento.
      }
    },
  },
  // ...
};