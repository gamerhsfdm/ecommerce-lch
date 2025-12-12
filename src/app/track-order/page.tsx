// src/app/track-order/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Truck, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function TrackOrderInputPage() {
    const [orderId, setOrderId] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (orderId.trim()) {
            // Redireciona para a página dinâmica de rastreamento
            router.push(`/track-order/${orderId.trim()}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
            <Card className="w-full max-w-lg shadow-2xl border-t-4 border-[#030a7f]">
                <CardHeader className="text-center pb-4">
                    <Truck size={36} className="mx-auto text-[#030a7f] mb-2" />
                    <CardTitle className="text-3xl font-bold text-gray-900">
                        Rastrear Pedido
                    </CardTitle>
                    <p className="text-gray-500 mt-2">
                        Insira o número do seu pedido ou CPF.
                    </p>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            type="text"
                            placeholder="Ex: PKR-78901234 ou CPF"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            required
                            className="h-12 text-base border-gray-300 focus-visible:ring-2 focus-visible:ring-[#030a7f]"
                        />
                        <Button
                            type="submit"
                            className="w-full h-12 text-lg font-semibold bg-[#030a7f] hover:bg-[#020866] transition"
                            disabled={!orderId.trim()}
                        >
                            <Search size={20} className="mr-2" />
                            Buscar Pedido
                        </Button>
                    </form>
                    <div className="text-center mt-6">
                        <p className="text-sm text-gray-500">
                            Se você tem uma conta, veja seus pedidos em:
                        </p>
                        <Link href="/account/orders" passHref>
                            <Button variant="link" className="text-[#030a7f] hover:text-[#f36915]">
                                Minha Conta
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}