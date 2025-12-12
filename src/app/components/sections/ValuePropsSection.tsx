// src/components/sections/ValuePropsSection.tsx
"use client";

import React from "react";
import { Zap, Truck, Box } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Cores oficiais
const ORANGE = "#FF6A00";
const BLUE = "#0A1A2F";

const valuePropositions = [
  {
    icon: <Zap size={20} style={{ color: ORANGE }} />,
    title: "Entrega Expressa",
    description: "Envio em até 24h úteis para capitais.",
  },
  {
    icon: <Truck size={20} style={{ color: ORANGE }} />,
    title: "Frete Grátis",
    description: "Acima de R$199 — renove seu material.",
  },
  {
    icon: <Box size={20} style={{ color: ORANGE }} />,
    title: "Embalagem Segura",
    description: "Itens protegidos para chegar impecáveis.",
  },
];

export function ValuePropsSection() {
  return (
    <section className="mt-12 mb-12 grid md:grid-cols-3 gap-6">
      {valuePropositions.map((v, i) => (
        <Card
          key={i}
          className="shadow-lg border border-white hover:shadow-2xl hover:border-[#FF6A00] transition-all duration-300 rounded-xl"
        >
          <CardContent className="py-6 flex items-center gap-4">
            {/* Ícone */}
            <div className="p-3 rounded-full bg-[#FF6A00]/10">{v.icon}</div>

            {/* Textos */}
            <div>
              <h4 className="font-bold text-[#0A1A2F]">{v.title}</h4>
              <p className="text-sm text-[#0A1A2F]/70 mt-1">
                {v.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
