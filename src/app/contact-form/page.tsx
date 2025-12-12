// src/app/contact-form/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, User, MessageSquare } from "lucide-react";

// Componentes shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// --- Dados Mock de Contato ---
const contactInfo = [
  {
    icon: Phone,
    title: "Telefone e WhatsApp",
    detail: "(99) 99999-9999",
    description: "Atendimento de segunda a sexta, das 9h às 18h.",
    color: "text-purple-600",
  },
  {
    icon: Clock,
    title: "Horário de Atendimento",
    detail: "Segunda a Sexta",
    description: "Das 09:00h às 18:00h (Exceto feriados).",
    color: "text-orange-500",
  },
  {
    icon: MapPin,
    title: "Endereço Físico",
    detail: "Rua Papel e Tinta, 123",
    description: "Cidade Criativa, Estado da Arte.",
    color: "text-red-500",
  },
];

// --- Componente Principal ---
export default function ContactFormPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulário Enviado:", formData);
    alert(`Mensagem enviada por ${formData.name}! (Implementar backend)`);
    // Limpar formulário após envio (simulado)
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* TÍTULO PRINCIPAL */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-2">
            Fale Conosco
          </h1>
          <p className="text-xl text-gray-600">
            Estamos aqui para ajudar! Envie-nos uma mensagem e retornaremos em até 24h úteis.
          </p>
        </div>

        {/* LAYOUT PRINCIPAL: 2 COLUNAS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* COLUNA 1: FORMULÁRIO */}
          <Card className="lg:col-span-2 shadow-2xl border-none">
            <CardHeader className="p-6 md:p-8 bg-white rounded-t-xl">
              <CardTitle className="text-2xl font-bold flex items-center text-purple-700">
                <MessageSquare size={24} className="mr-3" />
                Abrir um Chamado
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Nome e E-mail */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="name"
                    type="text"
                    placeholder="Seu Nome Completo"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12 border-gray-300 focus-visible:ring-2 focus-visible:ring-purple-500"
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Seu Melhor E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 border-gray-300 focus-visible:ring-2 focus-visible:ring-purple-500"
                  />
                </div>

                {/* Assunto */}
                <Input
                  name="subject"
                  type="text"
                  placeholder="Assunto (Ex: Dúvida sobre Frete, Troca, Parceria)"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="h-12 border-gray-300 focus-visible:ring-2 focus-visible:ring-purple-500"
                />

                {/* Mensagem */}
                <Textarea
                  name="message"
                  placeholder="Descreva sua solicitação em detalhes..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="border-gray-300 focus-visible:ring-2 focus-visible:ring-purple-500"
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-lg font-semibold bg-pink-500 hover:bg-pink-600 transition"
                  disabled={!formData.name || !formData.email || !formData.subject || !formData.message}
                >
                  <Send size={20} className="mr-3" />
                  Enviar Mensagem
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* COLUNA 2: INFORMAÇÕES DE CONTATO ALTERNATIVAS */}
          <div className="space-y-6">
            <Card className="shadow-lg bg-white border-t-4 border-orange-400">
              <CardHeader className="p-5">
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                    <Mail size={22} className="mr-2 text-orange-500" />
                    Contato Rápido
                </CardTitle>
                <p className="text-sm text-gray-500">
                    Prefere não usar o formulário? Utilize as opções abaixo:
                </p>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <Icon size={20} className={`mt-1 ${info.color}`} />
                      <div>
                        <h4 className="font-semibold text-gray-700">{info.title}</h4>
                        <p className="text-sm font-medium text-gray-900">{info.detail}</p>
                        <p className="text-xs text-gray-500">{info.description}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
            
            {/* CTA para FAQ */}
            <Card className="shadow-md bg-purple-50 border-none">
                <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold text-purple-700 mb-3">
                        Dúvidas Comuns
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        A resposta para sua pergunta pode estar em nossa Central de Ajuda.
                    </p>
                    <Link href="/help-center" passHref>
                        <Button 
                            variant="outline" 
                            className="w-full border-purple-600 text-purple-600 hover:bg-purple-100"
                        >
                            Ir para Central de Ajuda
                        </Button>
                    </Link>
                </CardContent>
            </Card>
          </div>
          
        </div>
      </div>
    </div>
  );
}