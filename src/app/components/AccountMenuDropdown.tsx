// src/components/AccountMenuDropdown.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, User, Settings, LogOut, LayoutDashboard, ChevronRight } from 'lucide-react';

// Importações Shadcn UI
// OBSERVAÇÃO: Você precisará ter o DropdownMenu instalado no seu projeto: 
// npx shadcn-ui@latest add dropdown-menu
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


interface AccountMenuDropdownProps {
    userName: string;
    initials: string;
}

const navItems = [
    { name: "Dashboard", href: "/account", icon: LayoutDashboard },
    { name: "Histórico de Compras", href: "/account/history", icon: ShoppingBag },
    { name: "Meus Favoritos", href: "/account/favorites", icon: Heart },
];

const settingsItems = [
    { name: "Detalhes da Conta", href: "/account/profile", icon: User },
    { name: "Configurações", href: "/account/settings", icon: Settings },
];


const AccountMenuDropdown: React.FC<AccountMenuDropdownProps> = ({ userName, initials }) => {
    
    // Função simulada de logout
    const handleLogout = () => {
        alert("Simulando Logout. Redirecionar para página inicial ou de login.");
        // Implementar lógica de desautenticação real aqui.
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 border border-gray-300 hover:bg-gray-100">
                    {/* Simulação de Avatar do Usuário */}
                    <Avatar className="h-9 w-9 bg-teal-600 text-white font-semibold">
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" forceMount>
                
                {/* Informações do Usuário */}
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold leading-none">{userName}</p>
                        <p className="text-xs leading-none text-gray-500">
                            Bem-vindo(a)
                        </p>
                    </div>
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator />
                
                {/* Seção Principal (Histórico, Favoritos) */}
                <DropdownMenuGroup>
                    {navItems.map(item => {
                        const Icon = item.icon;
                        return (
                            <Link key={item.name} href={item.href} passHref legacyBehavior>
                                <DropdownMenuItem className='cursor-pointer flex justify-between items-center'>
                                    <div className='flex items-center'>
                                        <Icon className="w-4 h-4 mr-2 text-teal-600" />
                                        <span>{item.name}</span>
                                    </div>
                                    <ChevronRight className="w-3 h-3 text-gray-400" />
                                </DropdownMenuItem>
                            </Link>
                        );
                    })}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* Seção de Configurações */}
                <DropdownMenuGroup>
                    {settingsItems.map(item => {
                        const Icon = item.icon;
                        return (
                            <Link key={item.name} href={item.href} passHref legacyBehavior>
                                <DropdownMenuItem className='cursor-pointer flex justify-between items-center'>
                                    <div className='flex items-center'>
                                        <Icon className="w-4 h-4 mr-2 text-gray-500" />
                                        <span>{item.name}</span>
                                    </div>
                                    <ChevronRight className="w-3 h-3 text-gray-400" />
                                </DropdownMenuItem>
                            </Link>
                        );
                    })}
                </DropdownMenuGroup>
                
                <DropdownMenuSeparator />
                
                {/* Ação de Logout */}
                <DropdownMenuItem onClick={handleLogout} className='cursor-pointer text-red-600 hover:!bg-red-50 hover:text-red-600'>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default AccountMenuDropdown;