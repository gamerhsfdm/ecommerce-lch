// src/app/help-center/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
  HelpCircle,
  Mail,
  Truck,
  RotateCcw,
  Search,
  MessageSquare,
  ChevronDown,
} from "lucide-react";

// Componentes shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

// --- Dados Mock ---

// 2. Links de Suporte Rápido
const quickSupportLinks = [
  {
    title: "FAQ - Perguntas Frequentes",
    description: "Encontre respostas imediatas para suas dúvidas.",
    icon: HelpCircle,
    href: "#faq-section",
    color: "text-purple-600",
  },
  {
    title: "Rastrear Meu Pedido",
    description: "Saiba onde sua encomenda se encontra agora.",
    icon: Truck,
    href: "/track-order",
    color: "text-orange-500",
  },
  {
    title: "Trocas e Devoluções",
    description: "Política completa e como iniciar o processo.",
    icon: RotateCcw,
    href: "/returns",
    color: "text-green-600",
  },
  {
    title: "Fale Conosco",
    description: "Entre em contato por e-mail, telefone ou chat.",
    icon: Mail,
    href: "/contact-form",
    color: "text-red-500",
  },
];

// 3. FAQ Destaque
const featuredFaqs = [
  {
    value: "item-1",
    question: "Qual o prazo de entrega para minha região?",
    answer: "O prazo de entrega é calculado na página do carrinho, dependendo do CEP e da modalidade de frete escolhida (PAC ou Sedex). Pedidos são despachados em até 2 dias úteis após a confirmação do pagamento.",
  },
  {
    value: "item-2",
    question: "Como faço para alterar ou cancelar um pedido?",
    answer: "Se o seu pedido ainda não foi embalado, você pode solicitar o cancelamento imediatamente através do nosso chat. Após a emissão da nota fiscal, o pedido não pode mais ser alterado ou cancelado.",
  },
  {
    value: "item-3",
    question: "Quais são as formas de pagamento aceitas?",
    answer: "Aceitamos Pix, Cartão de Crédito (Visa, Mastercard, Elo) em até 6x sem juros, e Boleto Bancário (com prazo de compensação de até 2 dias úteis).",
  },
  {
    value: "item-4",
    question: "Posso trocar um produto se ele não me agradar?",
    answer: "Sim. Você tem até 7 dias corridos após o recebimento do produto para solicitar a troca ou devolução, desde que o item esteja sem sinais de uso e na embalagem original. Consulte nossa política completa na seção 'Trocas e Devoluções'.",
  },
];

// --- Componente Principal ---
export default function HelpCenterPage() {
  const primaryColor = "#030a7f"; // Roxo/Azul Escuro

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. CABEÇALHO E BUSCA (HERO) */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-4 text-gray-900">
            Central de Ajuda
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Como podemos te ajudar hoje? Encontre respostas rápidas ou fale com nossa equipe.
          </p>
          
          {/* Campo de Busca de FAQ */}
          <div className="flex w-full max-w-lg mx-auto space-x-2">
            <Input
              type="search"
              placeholder="Ex: 'Prazo de entrega' ou 'Como trocar'"
              className="h-12 text-base border-gray-300 focus-visible:ring-2 focus-visible:ring-pink-500"
            />
            <Button 
              type="submit" 
              className="h-12 bg-pink-500 hover:bg-pink-600"
            >
              <Search size={20} className="mr-2" />
              Buscar
            </Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        
        {/* 2. LINKS DE SUPORTE RÁPIDO (4 Cartões Modernos) */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Acesso Rápido
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickSupportLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link key={index} href={link.href} className="group block h-full">
                  <Card 
                    className={`
                      shadow-lg hover:shadow-xl transition-all duration-300 
                      hover:scale-[1.02] border-t-4 border-transparent hover:border-purple-300 h-full
                    `}
                  >
                    <CardHeader className="flex flex-row items-center space-y-0 p-4">
                      <Icon size={24} className={`${link.color} transition-colors`} />
                      <ChevronDown size={18} className="ml-auto text-gray-400 group-hover:translate-x-1 transition" />
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <CardTitle className={`text-lg font-semibold mb-1 ${link.color}`}>
                        {link.title}
                      </CardTitle>
                      <p className="text-sm text-gray-500">
                        {link.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        <Separator className="mb-16" />

        {/* 3. FAQ Destaque (Accordion Elegante) */}
        <section id="faq-section" className="max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">
              Dúvidas Mais Comuns
            </span>
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {featuredFaqs.map((faq) => (
              <AccordionItem key={faq.value} value={faq.value} className="border-b-gray-200">
                <AccordionTrigger className="text-lg hover:no-underline text-gray-800 hover:text-purple-600 transition-colors">
                  <MessageSquare size={18} className="mr-3 text-purple-400" />
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-gray-50 border-l-4 border-purple-300 text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="text-center mt-10">
              <Link href="/faq-completo" passHref>
                  <Button 
                    variant="outline" 
                    className="h-10 px-6 border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
                      Ver todos os Tópicos de FAQ
                  </Button>
              </Link>
          </div>
        </section>
        
        <Separator className="mt-16" />

        {/* CHAMADA FINAL PARA SUPORTE PERSONALIZADO */}
        <section className="mt-16 text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Não encontrou o que procurava?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
                Nossa equipe de suporte está pronta para te ajudar.
            </p>
            <Link href="/contact-form" passHref>
                <Button 
                    size="lg"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                >
                    <Mail size={20} className="mr-3" />
                    Abrir um Ticket de Suporte
                </Button>
            </Link>
        </section>

      </main>
    </div>
  );
}