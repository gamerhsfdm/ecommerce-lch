// src/components/Footer.tsx
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#030a7f] text-white p-12 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Coluna 1: Logo e Descrição */}
        <div>
          <h3 className="text-2xl font-extrabold text-[#f36915] mb-4">ShopSphere</h3>
          <p className="text-sm text-gray-300">
            Sua loja de papelaria fina, inspirando criatividade e organização desde 2026.
          </p>
        </div>
        
        {/* Coluna 2: Navegação */}
        <div>
          <h4 className="text-lg font-semibold mb-4 border-b border-[#f36915] pb-1">Navegue</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-[#f36915] transition text-gray-200">Loja Completa</Link></li>
            <li><Link href="/category/planners" className="hover:text-[#f36915] transition text-gray-200">Planners</Link></li>
            <li><Link href="/category/artes" className="hover:text-[#f36915] transition text-gray-200">Materiais de Arte</Link></li>
            <li><Link href="/contact" className="hover:text-[#f36915] transition text-gray-200">Ajuda e FAQ</Link></li>
          </ul>
        </div>
        
        {/* Coluna 3: Empresa */}
        <div>
          <h4 className="text-lg font-semibold mb-4 border-b border-[#f36915] pb-1">Empresa</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-[#f36915] transition text-gray-200">Sobre Nós</Link></li>
            <li><Link href="/terms" className="hover:text-[#f36915] transition text-gray-200">Termos de Uso</Link></li>
            <li><Link href="/privacy" className="hover:text-[#f36915] transition text-gray-200">Política de Privacidade</Link></li>
          </ul>
        </div>

        {/* Coluna 4: Contato */}
        <div>
          <h4 className="text-lg font-semibold mb-4 border-b border-[#f36915] pb-1">Fale Conosco</h4>
          <p className="text-sm text-gray-300">
            Email: contato@shopsphere.com<br/>
            (11) 99999-9999
          </p>
        </div>
        
      </div>

      <div className="mt-10 pt-6 border-t border-[#f36915] text-center text-xs text-gray-300">
        © 2026 ShopSphere. Todos os direitos reservados.
      </div>
    </footer>
  );
}
