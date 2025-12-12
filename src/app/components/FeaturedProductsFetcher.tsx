// src/app/components/FeaturedProductsFetcher.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../../types/product"; 
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FeaturedProductsSection } from "./sections/FeaturedProductsSection";

const INTERNAL_API_URL = "/api/products";

interface FeaturedProductsFetcherProps {
    query: string;
    setQuery: (query: string) => void;
}

export const FeaturedProductsFetcher: React.FC<FeaturedProductsFetcherProps> = ({ query, setQuery }) => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Lógica de Fetch de Dados
    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            try {
                const res = await axios.get<Product[]>(INTERNAL_API_URL);
                if (!mounted) return;
                
                const data = Array.isArray(res.data) && res.data.length ? res.data : [];
                setFeaturedProducts(data.slice(0, 8));
                setError(null);

                if (data.length === 0) {
                    setError("A API do Bling retornou 0 produtos. Verifique seu cadastro.");
                }
            } catch (err) {
                console.error("Erro ao carregar produtos:", err);
                setError("Não foi possível carregar produtos. Erro na comunicação com a API.");
                setFeaturedProducts([]); 
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    // Pesquisa (local)
    const filteredProducts = featuredProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            {/* PRODUTOS EM DESTAQUE */}
            <FeaturedProductsSection 
                products={featuredProducts} 
                loading={loading} 
                error={error} 
                query={query}
                filteredProducts={filteredProducts}
                setQuery={setQuery}
            />
            
            {/* Botão "Ver Mais Produtos" */}
            <div className="text-center mt-10 mb-20">
                <Link href="/products" passHref>
                    <Button
                        className="
                            text-lg py-6 px-10 shadow-lg 
                            transition-transform hover:scale-[1.02]
                            bg-[#030a7f] hover:bg-[#f36915] 
                            text-white
                        "
                    >
                        Ver Mais Produtos
                    </Button>
                </Link>
            </div>
        </>
    );
};
