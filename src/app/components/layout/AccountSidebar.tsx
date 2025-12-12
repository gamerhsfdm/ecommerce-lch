// src/components/layout/AccountSidebar.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Heart, User, Settings, LogOut, ChevronRight } from 'lucide-react';

// Importações Shadcn UI
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Definição dos links de navegação
const navItems = [
    {
        name: "Dashboard",
        href: "/account",
        icon: LayoutDashboard,
    },
    {
        name: "Histórico de Compras",
        href: "/account/history",
        icon: ShoppingBag,
    },
    {
        name: "Meus Favoritos",
        href: "/account/favorites",
        icon: Heart,
    },
    {
        name: "Detalhes da Conta",
        href: "/account/profile",
        icon: User,
    },
    {
        name: "Configurações",
        href: "/account/settings",
        icon: Settings,
    },
];

interface AccountSidebarProps {
    userName?: string;
    userEmail?: string;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({ userName = "Nome do Usuário", userEmail = "usuario@email.com" }) => {
    const pathname = usePathname();

    return (
        <Card className="shadow-lg h-full lg:min-h-screen bg-white rounded-xl">
            <CardHeader className="py-4 border-b">
                <CardTitle className="text-xl font-bold text-teal-700">
                    Minha Conta
                </CardTitle>
                <p className="text-sm text-gray-500">{userEmail}</p>
            </CardHeader>

            <CardContent className="p-0">
                <nav className="space-y-1 p-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link key={item.name} href={item.href} passHref legacyBehavior>
                                <div
                                    className={cn(
                                        "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors duration-200",
                                        "text-gray-700 hover:bg-gray-100",
                                        isActive
                                            ? "bg-teal-50 text-teal-700 font-semibold border-l-4 border-teal-600"
                                            : "border-l-4 border-transparent"
                                    )}
                                >
                                    <div className="flex items-center">
                                        <Icon className="w-5 h-5 mr-3" />
                                        <span className='text-sm'>{item.name}</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <Separator className="my-2" />

                {/* Ação de Logout (Simulada) */}
                <div className="p-2 pt-0">
                    <button
                        onClick={() => alert("Simulando Logout...")}
                        className="flex items-center w-full p-3 rounded-lg transition-colors duration-200 text-red-600 hover:bg-red-50"
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        <span className='text-sm'>Sair da Conta</span>
                    </button>
                </div>
            </CardContent>
        </Card>
    );
};

export default AccountSidebar;