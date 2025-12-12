// src/app/track-order/[orderId]/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Package,
  CheckCircle,
  Clock,
  Truck,
  Home,
  ArrowLeft,
} from "lucide-react";

// Componentes shadcn/ui
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- Dados Mock do Pedido (Simulação) ---
interface OrderStatus {
  step: number;
  label: string;
  date: string;
  isCurrent: boolean;
  isCompleted: boolean;
  icon: React.ElementType;
}

const mockOrderData = {
  orderId: "PKR-78901234",
  status: "Em Transporte",
  estimatedDelivery: "25 de Dezembro",
  customerName: "Maria Souza",
};

const mockTimeline: OrderStatus[] = [
  {
    step: 1,
    label: "Pagamento Confirmado",
    date: "10 de Dezembro, 14:30h",
    isCurrent: false,
    isCompleted: true,
    icon: CheckCircle,
  },
  {
    step: 2,
    label: "Preparando o Pedido",
    date: "10 de Dezembro, 16:00h",
    isCurrent: false,
    isCompleted: true,
    icon: Package,
  },
  {
    step: 3,
    label: "Em Transporte",
    date: "11 de Dezembro, 09:00h",
    isCurrent: true,
    isCompleted: false,
    icon: Truck,
  },
  {
    step: 4,
    label: "Saiu para Entrega",
    date: "24 de Dezembro (Previsão)",
    isCurrent: false,
    isCompleted: false,
    icon: Clock,
  },
  {
    step: 5,
    label: "Entregue",
    date: "25 de Dezembro (Previsão)",
    isCurrent: false,
    isCompleted: false,
    icon: Home,
  },
];

// --- Componente da Linha do Tempo ---
interface TimelineItemProps {
  status: OrderStatus;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ status }) => {
  const Icon = status.icon;
  
  // Cores baseadas no status
  const iconColor = status.isCompleted 
    ? "text-purple-600" 
    : status.isCurrent 
    ? "text-orange-500" 
    : "text-gray-400";

  const ringClass = status.isCompleted
    ? "ring-purple-600"
    : status.isCurrent
    ? "ring-orange-500"
    : "ring-gray-300";

  return (
    <li className="mb-8 flex items-start">
      {/* Círculo do Ícone */}
      <div className="flex flex-col items-center mr-4">
        <div 
          className={`
            w-10 h-10 rounded-full flex items-center justify-center 
            bg-white ring-2 ${ringClass}
            transition-all duration-300 shadow-md
          `}
        >
          <Icon size={20} className={`${iconColor} transition-colors`} />
        </div>
        {/* Linha Vertical (se não for o último) */}
        {status.step < mockTimeline.length && (
          <div 
            className={`
              h-full w-0.5 mt-1 mb-1
              ${status.isCompleted ? 'bg-purple-300' : 'bg-gray-200'}
            `}
          ></div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col pt-1 flex-grow">
        <h3 className={`text-lg font-semibold ${status.isCurrent ? 'text-gray-900' : 'text-gray-600'}`}>
          {status.label}
        </h3>
        <p className={`text-sm ${status.isCurrent ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>
          {status.date}
        </p>
        {status.isCurrent && (
          <p className="text-xs mt-1 text-gray-500">
            Seu pedido está a caminho.
          </p>
        )}
      </div>
    </li>
  );
};


// --- Componente Principal da Página ---
export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params.orderId || mockOrderData.orderId; // Usa o ID da URL ou mock

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* BOTÃO VOLTAR */}
        <Link href="/account?tab=orders" passHref>
          <Button variant="link" className="mb-8 text-gray-600 hover:text-purple-600 p-0 h-auto">
            <ArrowLeft size={18} className="mr-2" />
            Voltar para Meus Pedidos
          </Button>
        </Link>
        
        {/* CABEÇALHO */}
        <Card className="shadow-xl mb-10 border-none">
          <CardHeader className="p-6 md:p-8 bg-purple-50/70 rounded-t-xl">
            <div className="flex justify-between items-start">
              <CardTitle className="text-3xl font-extrabold text-purple-800">
                Rastrear Pedido
              </CardTitle>
              <Badge 
                className="text-white text-md font-semibold px-4 py-1.5" 
                style={{ backgroundColor: "#030a7f" }} // Azul Escuro da identidade
              >
                #{orderId}
              </Badge>
            </div>
            <CardDescription className="text-lg text-purple-700 mt-2">
              Olá, **{mockOrderData.customerName}**! Seu pedido está com a previsão de entrega para **{mockOrderData.estimatedDelivery}**.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8 bg-white">
            
            {/* INFORMAÇÕES RESUMO */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <p className="text-sm font-medium text-gray-500">Status Atual:</p>
                    <h4 className="text-xl font-bold text-orange-500">
                        {mockOrderData.status}
                    </h4>
                </div>
                <Button 
                    variant="outline" 
                    className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                    Precisa de Ajuda?
                </Button>
            </div>

            <Separator className="my-6" />

            {/* LINHA DO TEMPO */}
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Truck size={24} className="mr-3 text-purple-600" />
                Linha do Tempo da Entrega
            </h3>

            <ul className="list-none p-0 ml-4">
              {mockTimeline.map((status) => (
                <TimelineItem key={status.step} status={status} />
              ))}
            </ul>

          </CardContent>
        </Card>
        
        {/* CALL TO ACTION ADICIONAL */}
        <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
                Receba atualizações por e-mail e SMS ativando as notificações.
            </p>
            <Link href="/account/settings" passHref>
                <Button 
                    className="px-8 bg-pink-500 hover:bg-pink-600"
                >
                    Gerenciar Notificações
                </Button>
            </Link>
        </div>
      </div>
    </div>
  );
}