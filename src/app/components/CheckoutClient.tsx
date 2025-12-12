// src/app/checkout/CheckoutClient.tsx
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { CreditCard, ShoppingBag, Loader2, CheckCircle, Truck } from "lucide-react"; // Adicionado Truck
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import CartItemRow from "../components/CartItemRow";
import { useCartStore } from "../../store/cartStore";

const DARK_BLUE = "#0A2540";
const ORANGE = "#FF7A00";

// Helper de moeda
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

// NOVO HELPER: Gerar ID de Pedido
const generateRandomOrderId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let orderId = 'PKR-';
  for (let i = 0; i < 8; i++) {
    orderId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return orderId;
};


export default function CheckoutClient() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  // NOVO ESTADO: Para armazenar o ID do pedido gerado
  const [confirmedOrderId, setConfirmedOrderId] = useState(''); 

  // Estados de validação de inputs
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));

    // Validação simples
    if (!value || value.trim() === "") {
      setErrors((prev: any) => ({ ...prev, [field]: "Campo obrigatório" }));
    } else {
      setErrors((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

  const totals = useMemo(() => {
    const subtotal = getTotalPrice();
    const shipping = subtotal >= 199 ? 0 : 25;
    const total = subtotal + shipping;
    const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return { subtotal, shipping, total, totalItemsCount };
  }, [items, getTotalPrice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verificação de campos vazios/inválidos
    const requiredFields = ['nome', 'email', 'telefone', 'cpf', 'cep', 'rua', 'numero', 'bairro', 'cidade', 'cartao', 'nomeCartao', 'validade', 'cvv'];
    let formIncomplete = false;
    const newErrors: any = {};

    requiredFields.forEach((field) => {
        if (!formData[field] || formData[field].trim() === "") {
            newErrors[field] = "Campo obrigatório";
            formIncomplete = true;
        }
    });

    if (formIncomplete || Object.values(errors).some(e => e)) {
        setErrors(newErrors);
        return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      // LÓGICA CORRIGIDA: Geração do ID e transição para sucesso
      const newOrderId = generateRandomOrderId();
      setConfirmedOrderId(newOrderId); 

      clearCart();
      setIsProcessing(false);
      setIsCompleted(true);
    }, 1500);
  };

  // Estilo dos inputs dinamicamente
  const inputClass = (field: string) => `
    transition-all duration-300 
    ${errors[field] ? "border-red-500 ring-red-300" : formData[field] ? "border-blue-600 ring-blue-300" : ""}
    ${errors[field] ? "animate-shake" : ""}
  `;

  // Sucesso
  if (isCompleted) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-10 rounded-2xl bg-white shadow-lg border text-center">
        <CheckCircle size={70} className="text-emerald-600 mx-auto mb-4" />

        <h2 className="text-3xl font-bold">Pedido Confirmado!</h2>
        <p className="text-gray-600 mt-2 mb-3">
          Seu pedido **#{confirmedOrderId}** foi processado com sucesso. Você receberá um e-mail de confirmação.
        </p>
        
        <p className="text-gray-500 mb-6 text-sm">
            Acompanhe o status e todos os detalhes do seu pedido:
        </p>

        <div className="flex justify-center space-x-4">
            {/* NOVO CTA 1: Leva para o Histórico de Compras */}
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/account?tab=orders">
                    <ShoppingBag size={18} className="mr-2" />
                    Ver Histórico de Pedidos
                </Link>
            </Button>
            
            {/* NOVO CTA 2: Botão para Rastrear */}
            <Button asChild variant="outline">
                <Link href={`/track-order/${confirmedOrderId}`}>
                    <Truck size={18} className="mr-2" />
                    Rastrear Pedido
                </Link>
            </Button>
        </div>
      </div>
    );
  }

  // Carrinho vazio
  if (items.length === 0 && !isProcessing) {
    return (
      <div className="max-w-xl mx-auto mt-24 p-10 rounded-xl bg-white shadow border text-center">
        <ShoppingBag size={70} className="text-gray-300 mx-auto mb-6" />
        <h3 className="text-2xl font-semibold text-gray-800">Seu carrinho está vazio</h3>

        <p className="text-gray-500 mt-2 mb-6">Adicione produtos para finalizar sua compra.</p>

        <Button asChild>
          <Link href="/products">Ver produtos</Link>
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto py-10"
    >
      <style>
        {`
          .animate-shake {
            animation: shake 0.3s ease-in-out;
          }
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            50% { transform: translateX(4px); }
            75% { transform: translateX(-4px); }
            100% { transform: translateX(0); }
          }
        `}
      </style>

      {/* COLUNA ESQUERDA */}
      <div className="lg:col-span-2 space-y-6">

        {/* Dados pessoais */}
        <Card>
          <CardHeader>
            <CardTitle>1. Detalhes Pessoais</CardTitle>
            <CardDescription>Informações para nota fiscal e contato.</CardDescription>
          </CardHeader>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Nome */}
            <div>
              <Label>Nome Completo</Label>
              <Input
                className={inputClass("nome")}
                placeholder="Maria da Silva"
                onChange={(e) => handleChange("nome", e.target.value)}
                required
              />
              {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
            </div>

            {/* Email */}
            <div>
              <Label>E-mail</Label>
              <Input
                className={inputClass("email")}
                type="email"
                placeholder="contato@exemplo.com"
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            {/* Telefone */}
            <div>
              <Label>Telefone</Label>
              <Input
                className={inputClass("telefone")}
                placeholder="(99) 99999-9999"
                onChange={(e) => handleChange("telefone", e.target.value)}
                required
              />
              {errors.telefone && <p className="text-red-500 text-sm">{errors.telefone}</p>}
            </div>

            {/* CPF */}
            <div>
              <Label>CPF</Label>
              <Input
                className={inputClass("cpf")}
                placeholder="000.000.000-00"
                onChange={(e) => handleChange("cpf", e.target.value)}
                required
              />
              {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf}</p>}
            </div>

          </CardContent>
        </Card>

        {/* Endereço */}
        <Card>
          <CardHeader>
            <CardTitle>2. Endereço de Entrega</CardTitle>
            <CardDescription>Local onde você receberá seu pedido.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>CEP</Label>
                <Input
                  className={inputClass("cep")}
                  placeholder="00000-000"
                  onChange={(e) => handleChange("cep", e.target.value)}
                  required
                />
                {errors.cep && <p className="text-red-500 text-sm">{errors.cep}</p>}
              </div>

              <div className="md:col-span-2">
                <Label>Rua / Avenida</Label>
                <Input
                  className={inputClass("rua")}
                  placeholder="Rua Exemplo"
                  onChange={(e) => handleChange("rua", e.target.value)}
                  required
                />
                {errors.rua && <p className="text-red-500 text-sm">{errors.rua}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Número</Label>
                <Input
                  className={inputClass("numero")}
                  placeholder="123"
                  onChange={(e) => handleChange("numero", e.target.value)}
                  required
                />
                {errors.numero && <p className="text-red-500 text-sm">{errors.numero}</p>}
              </div>

              <div className="md:col-span-2">
                <Label>Complemento</Label>
                <Input
                  className={inputClass("complemento")}
                  placeholder="Apto, bloco..."
                  onChange={(e) => handleChange("complemento", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Bairro</Label>
                <Input
                  className={inputClass("bairro")}
                  placeholder="Seu bairro"
                  onChange={(e) => handleChange("bairro", e.target.value)}
                  required
                />
                {errors.bairro && <p className="text-red-500 text-sm">{errors.bairro}</p>}
              </div>

              <div>
                <Label>Cidade / Estado</Label>
                <Input
                  className={inputClass("cidade")}
                  placeholder="São Paulo / SP"
                  onChange={(e) => handleChange("cidade", e.target.value)}
                  required
                />
                {errors.cidade && <p className="text-red-500 text-sm">{errors.cidade}</p>}
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Pagamento */}
        <Card>
          <CardHeader>
            <CardTitle>3. Pagamento</CardTitle>
            <CardDescription>Selecione sua forma de pagamento.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">

            {/* Crédito */}
            <div className="rounded-lg border p-4 space-y-4">
              <div className="flex items-center gap-2">
                <input type="radio" name="payment" defaultChecked />
                <CreditCard size={20} />
                <span className="font-medium">Cartão de Crédito</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="md:col-span-2">
                  <Label>Número do Cartão</Label>
                  <Input
                    className={inputClass("cartao")}
                    placeholder="XXXX XXXX XXXX XXXX"
                    onChange={(e) => handleChange("cartao", e.target.value)}
                    required
                  />
                  {errors.cartao && <p className="text-red-500 text-sm">{errors.cartao}</p>}
                </div>

                <div>
                  <Label>Nome no Cartão</Label>
                  <Input
                    className={inputClass("nomeCartao")}
                    placeholder="Nome impresso"
                    onChange={(e) => handleChange("nomeCartao", e.target.value)}
                    required
                  />
                  {errors.nomeCartao && <p className="text-red-500 text-sm">{errors.nomeCartao}</p>}
                </div>

                <div>
                  <Label>Validade</Label>
                  <Input
                    className={inputClass("validade")}
                    placeholder="MM/AA"
                    onChange={(e) => handleChange("validade", e.target.value)}
                    required
                  />
                  {errors.validade && <p className="text-red-500 text-sm">{errors.validade}</p>}
                </div>

                <div>
                  <Label>CVV</Label>
                  <Input
                    className={inputClass("cvv")}
                    placeholder="123"
                    onChange={(e) => handleChange("cvv", e.target.value)}
                    required
                  />
                  {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                </div>

                <div className="md:col-span-2">
                  <Label>Parcelamento</Label>
                  <Input placeholder="1x sem juros" />
                </div>

              </div>
            </div>

            {/* PIX */}
            <div className="rounded-lg border p-4 hover:bg-gray-50 transition cursor-pointer">
              <div className="flex items-center gap-2">
                <input type="radio" name="payment" />
                <span className="font-medium">Pix (pagamento instantâneo)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* COLUNA DIREITA – RESUMO */}
      <div>
        <Card className="sticky top-10">
          <CardHeader>
            <CardTitle>Resumo do Pedido</CardTitle>
            <CardDescription>
              {totals.totalItemsCount} itens no carrinho.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">

            <ScrollArea className="max-h-56 pr-2">
              <div className="space-y-2">
                {items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>

            <Separator />

            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatCurrency(totals.subtotal)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Frete</span>
              <span className={totals.shipping === 0 ? "text-emerald-600 font-semibold" : ""}>
                {totals.shipping === 0 ? "Grátis" : formatCurrency(totals.shipping)}
              </span>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-orange-600 font-bold text-xl">
                {formatCurrency(totals.total)}
              </span>
            </div>

            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full h-11 bg-[#FF7A00] hover:bg-[#d96500]"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                <>Pagar Agora – {formatCurrency(totals.total)}</>
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center flex justify-center items-center gap-1">
              <CheckCircle size={14} className="text-emerald-600" />
              Checkout 100% seguro
            </p>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}