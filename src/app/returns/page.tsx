// src/app/returns/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import {
  RotateCcw,
  Package,
  Mail,
  Truck,
  CheckCircle,
  Clock,
  BookOpen,
  XCircle,
  AlertTriangle,
  Send,
  HelpCircle, // Importado para uso no FAQ
} from "lucide-react";

// Componentes shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// --- Dados Mock ---

// 2. Passos de Devolução
const returnSteps = [
  {
    step: 1,
    title: "Solicitação Online",
    description: "Entre em sua conta ou utilize o link de rastreio para iniciar o pedido de troca ou devolução em até 7 dias corridos após o recebimento.",
    icon: Mail,
  },
  {
    step: 2,
    title: "Embalagem e Etiqueta",
    description: "Você receberá uma etiqueta de postagem reversa por e-mail. Embale o produto na caixa original e leve-o a uma agência dos Correios.",
    icon: Package,
  },
  {
    step: 3,
    title: "Análise do Produto",
    description: "Assim que o produto chegar ao nosso Centro de Distribuição, ele passará por uma análise de qualidade em até 3 dias úteis.",
    icon: Clock,
  },
  {
    step: 4,
    title: "Reembolso/Crédito",
    description: "Após aprovação, o reembolso será processado no mesmo método de pagamento ou um vale-compras será emitido.",
    icon: CheckCircle,
  },
];

// 3. FAQ de Devolução
const returnFaqs = [
  {
    value: "faq-1",
    question: "Qual é o prazo para solicitar uma devolução?",
    answer: "Você tem até **7 dias corridos** a partir da data de entrega para solicitar a desistência por arrependimento, conforme o Código de Defesa do Consumidor.",
  },
  {
    value: "faq-2",
    question: "O frete da devolução é por conta da loja?",
    answer: "Sim, para a primeira troca ou devolução por arrependimento, a etiqueta de frete reverso é por nossa conta.",
  },
  {
    value: "faq-3",
    question: "Quando o valor será estornado?",
    answer: "O estorno é processado em até 10 dias úteis após a aprovação da análise do produto. O prazo para o valor aparecer em sua fatura ou conta varia conforme a operadora de cartão ou banco.",
  },
];

// --- Componente Principal ---
export default function ReturnsPage() {
  const primaryColor = "text-purple-600";
  const accentColor = "bg-orange-500 hover:bg-orange-600";

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* 1. CABEÇALHO E RESUMO */}
        <Card className="shadow-2xl mb-12 border-none border-t-8 border-purple-600">
          <CardHeader className="p-6 md:p-10 bg-white">
            <div className="flex items-center mb-4">
              <RotateCcw size={32} className="text-purple-600 mr-4" />
              <CardTitle className="text-4xl font-extrabold text-gray-900">
                Trocas e Devoluções
              </CardTitle>
            </div>
            <p className="text-xl text-gray-700">
              Nossa política visa garantir sua satisfação. Você tem **7 dias** para solicitar a troca ou devolução por arrependimento.
            </p>
            <div className="mt-4">
              <Badge 
                className="bg-orange-100 text-orange-700 px-3 py-1 text-sm font-semibold"
              >
                <AlertTriangle size={14} className="mr-1" />
                Produtos personalizados não são elegíveis.
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* 2. PASSOS DE DEVOLUÇÃO (Linha do Tempo Horizontal) */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Como Iniciar o Processo
          </h2>
          
          <div className="flex flex-col md:flex-row justify-between relative">
            {/* Linha de conexão (Apenas para desktop) */}
            {/* Ajustei as classes de posicionamento para ter certeza que as linhas corretas aparecem entre os ícones */}
            <div className="hidden md:block absolute top-6 left-[12.5%] w-[75%] h-0.5 bg-purple-200 z-0"></div>

            {returnSteps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="flex flex-col items-center text-center md:w-1/4 mb-8 md:mb-0 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white ring-4 ring-purple-600 flex items-center justify-center shadow-lg mb-4">
                    <Icon size={24} className="text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {item.step}. {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 px-2 max-w-[200px]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link href="/account?tab=orders" passHref>
              <Button size="lg" className={`${accentColor} text-white font-semibold`}>
                <Send size={20} className="mr-3" />
                Iniciar Solicitação de Troca
              </Button>
            </Link>
          </div>
        </section>

        <Separator className="my-16" />

        {/* 3. CONDIÇÕES DETALHADAS (Tabela/Lista) */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Regras e Condições Importantes
          </h2>

          <Card className="shadow-lg border-t-4 border-purple-400">
            <CardContent className="p-6 md:p-8 space-y-4">
                
              <div className="flex items-start gap-4 p-3 rounded-lg bg-green-50">
                <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold text-gray-800">Elegibilidade</h4>
                    <p className="text-sm text-gray-600">O produto deve estar em perfeitas condições, sem sinais de uso, e na embalagem original com todos os acessórios e manuais.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-3 rounded-lg bg-red-50">
                <XCircle size={20} className="text-red-600 mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold text-gray-800">Itens Não Elegíveis</h4>
                    <p className="text-sm text-gray-600">Produtos personalizados (nomes, datas), itens de uso íntimo ou produtos comprados em saldo/promoção final.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 rounded-lg bg-blue-50">
                <BookOpen size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-semibold text-gray-800">Documentação</h4>
                    <p className="text-sm text-gray-600">É obrigatória a apresentação da Nota Fiscal (DANFE) ou a Declaração de Conteúdo junto ao produto.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-16" />

        {/* 4. FAQ DE DEVOLUÇÃO (Accordion) */}
        <section className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
                Dúvidas sobre Reembolso
            </h2>

            <Accordion type="single" collapsible className="w-full">
                {returnFaqs.map((faq) => (
                <AccordionItem key={faq.value} value={faq.value} className="border-b-gray-200">
                    <AccordionTrigger className="text-lg hover:no-underline text-gray-800 hover:text-orange-600 transition-colors">
                        <HelpCircle size={18} className="mr-3 text-orange-400" />
                        {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="p-4 bg-gray-50 border-l-4 border-orange-300 text-gray-700">
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
                ))}
            </Accordion>
        </section>
      </div>
    </div>
  );
}