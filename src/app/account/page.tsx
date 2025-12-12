"use client";

import { useState } from 'react'; // Mantemos useState para o mock, mas o estado primário será a URL
import { useSearchParams } from 'next/navigation'; // ⬅️ NOVO: Para ler o parâmetro 'tab'
import Link from 'next/link';
import {
  User,
  MapPin,
  Heart,
  History,
  Package,
  Key,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';

import { ProfileEditForm } from "./ProfileEditForm"; 
import { AddressesList } from "./AddressesList";
import { OrdersList } from "./OrdersList";
import { HistoryList } from "./HistoryList";
import { FavoritesList } from "./FavoritesList";
import { PasswordChangeForm } from "./PasswordChangeForm";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// --- Mapeamento do Menu para Componentes ---
const navItems = [
  // Mantenha os mesmos nomes de 'key' (que serão os nomes dos tabs na URL)
  { name: "Perfil", icon: User, key: "profile-edit", component: ProfileEditForm },
  { name: "Endereços", icon: MapPin, key: "addresses", component: AddressesList },
  { name: "Pedidos", icon: Package, key: "orders", component: OrdersList },
  { name: "Histórico de Compras", icon: History, key: "history", component: HistoryList },
  { name: "Favoritos", icon: Heart, key: "favorites", component: FavoritesList }, // ⬅️ key: "favorites"
  { name: "Alterar Senha", icon: Key, key: "password", component: PasswordChangeForm },
];

// --- Dashboard Principal ---
const AccountDashboard: React.FC = () => {
  const searchParams = useSearchParams();
  
  // ⬅️ MUDANÇA: Lê o 'tab' da URL. Se não existir, usa 'profile-edit' como padrão.
  const activeSection = searchParams.get('tab') || 'profile-edit'; 
  
  const userName = "Maria Souza"; 
  const userEmail = "maria.souza@email.com"; 
  
  // Encontra o componente ativo para renderizar
  const ActiveComponent = navItems.find(item => item.key === activeSection)?.component || ProfileEditForm;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Link para Voltar */}
        <Link href="/" passHref legacyBehavior>
            <Button
                variant="link"
                className="
                    mb-6 text-gray-600 hover:text-purple-600 
                    p-0 h-auto font-medium transition-colors
                "
            >
                <ArrowLeft size={20} className="mr-2" />
                Voltar para a Loja
            </Button>
        </Link>
        
        {/* Título Principal da Dashboard */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
          Minha Conta
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* 1. MENU LATERAL (Sidebar) */}
          <div className="w-full lg:w-64">
            <Card className="shadow-lg border-gray-100">
              <CardHeader className="p-4 bg-gray-50 border-b border-gray-100">
                <CardTitle className="text-lg font-semibold text-gray-800">
                  {userName}
                </CardTitle>
                <p className="text-sm text-gray-500">{userEmail}</p>
              </CardHeader>
              
              <CardContent className="p-0">
                <nav className="flex flex-col p-2">
                  {navItems.map((item) => {
                    const isActive = item.key === activeSection;
                    
                    // ⬅️ MUDANÇA: O clique muda a URL (search param)
                    return (
                      <Link
                        key={item.key}
                        href={`/account?tab=${item.key}`} // MUDANÇA AQUI
                        passHref
                        legacyBehavior
                      >
                        <Button
                          variant="ghost"
                          className={`
                            justify-start gap-3 h-12 text-base rounded-lg w-full
                            ${isActive
                              ? 'bg-purple-50 text-purple-700 font-semibold hover:bg-purple-100'
                              : 'text-gray-600 hover:bg-gray-100'
                            }
                            transition-colors duration-200
                          `}
                        >
                          <item.icon size={20} />
                          {item.name}
                          {isActive && <ChevronRight size={18} className="ml-auto" />}
                        </Button>
                      </Link>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* 2. ÁREA DE CONTEÚDO (Main Content) */}
          <div className="flex-1">
            <Card className="shadow-lg border-gray-100 p-6">
              <CardContent className="p-0">
                {/* Renderiza dinamicamente o componente selecionado */}
                <ActiveComponent />
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}; 

export default AccountDashboard;