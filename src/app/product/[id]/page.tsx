"use client";

import React, { useState } from 'react';
import { ShoppingBag, Heart, Star, Minus, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Product } from '../../../types/product';
import { useCartStore } from '../../../store/cartStore'; 
import Footer from '../../components/Footer';
import NavBar from '../../components/Navbar';


const DUMMY_PRODUCT: Product & { rating: number; oldPrice?: number, longDescription: string, variations: { label: string; value: string }[] } = {
    id: "prod_001",
    name: "LAPIS DE COR 12C C/BLOCO EXCLUSIVO",
    description: "Este conjunto premium de lápis de cor oferece pigmentos vibrantes e durabilidade superior. Inclui 12 cores clássicas e um bloco de desenho exclusivo.",
    longDescription: "Detalhe do produto: Nosso conjunto de 12 lápis de cor foi desenvolvido para atender às necessidades de artistas profissionais e entusiastas. A mina de 3.8mm é resistente à quebra, proporcionando uma experiência de desenho ininterrupta. O bloco de desenho incluso apresenta papel de 150g/m² perfeito para suportar múltiplas camadas de cor. Ideal para ilustrações, esboços e projetos escolares avançados. Garanta cores vivas e misturáveis em cada uso.",
    price: 76.66,
    oldPrice: 99.99,
    category: "Materiais Escolares",
    imageUrl: "https://via.placeholder.com/600x600?text=LAPIS+DE+COR+12C",
    stock: 50,
    rating: 4.8,
    variations: [
        { label: "Padrão", value: "standard" },
        { label: "Edição Especial", value: "special" },
    ]
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const RELATED_PRODUCTS: Product[] = [
    { id: "rel_002", name: "Caneta Gel Ponta Fina", description: "Conjunto de 5 canetas gel.", price: 19.90, category: "Canetas", imageUrl: "https://via.placeholder.com/300x300?text=CANETA+GEL", stock: 100 },
    { id: "rel_003", name: "Caderno Espiral A4", description: "Caderno com capa dura, 200 folhas.", price: 35.50, category: "Cadernos", imageUrl: "https://via.placeholder.com/300x300?text=CADERNO+A4", stock: 80 },
    { id: "rel_004", name: "Borracha Profissional", description: "Borracha macia e sem resíduos.", price: 4.99, category: "Acessórios", imageUrl: "https://via.placeholder.com/300x300?text=BORRACHA", stock: 120 },
    { id: "rel_005", name: "Estojo Escolar Grande", description: "Estojo de tecido, alta capacidade.", price: 45.00, category: "Acessórios", imageUrl: "https://via.placeholder.com/300x300?text=ESTOJO", stock: 60 },
];

interface MockProductCardProps {
    product: Product;
}

const MockProductCard: React.FC<MockProductCardProps> = ({ product }) => {
    return (
        <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="w-full h-40 object-cover"
            />
            <div className="p-4 space-y-2">
                <h4 className="text-sm font-semibold truncate text-gray-800">{product.name}</h4>
                <p className="text-xs text-gray-500">{product.category}</p>
                <p className="text-lg font-bold text-pink-600">{formatCurrency(product.price)}</p>
                <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-700">
                    Ver Detalhes
                </Button>
            </div>
        </div>
    );
};

const RelatedProductsSection: React.FC = () => {
    const products = RELATED_PRODUCTS; 

    return (
        <div className="mt-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3">
                Também dê uma olhadinha:
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <MockProductCard key={product.id} product={product} /> 
                ))}
            </div>
        </div>
    );
};

const ProductDetailPage = ({ params }: { params: { id: string } }) => {
    const product = DUMMY_PRODUCT; 

    const { addToCart } = useCartStore();
    const [quantity, setQuantity] = useState(1);
    const [selectedVariation, setSelectedVariation] = useState(product.variations[0].value);
    const [isFavorite, setIsFavorite] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const isOutOfStock = product.stock <= 0; 
    
    const handleAddToCart = () => {
        if (!isOutOfStock) {
            addToCart(product, quantity); 
            setAddedToCart(true); 
            setTimeout(() => {
                setAddedToCart(false);
            }, 500);
        }
    };

    const handleToggleFavorite = () => {
        setIsFavorite(prev => !prev);
    };

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col">
                <NavBar />
                <div className="text-center py-20 flex-grow">Produto não encontrado.</div>
                <Footer />
            </div>
        );
    }
    
    // Rating display
    const stars = Array.from({ length: 5 }).map((_, i) => (
        <Star
            key={i}
            size={18}
            className={cn(
                "transition-colors",
                i < Math.floor(product.rating) ? "fill-yellow-500 text-yellow-500" : "fill-gray-300 text-gray-300"
            )}
        />
    ));

    return (
        <div className="min-h-screen flex flex-col">
            <NavBar /> {/* ⬅️ Navbar/Header importado */}

            <main className="flex-grow">
                <div className="container mx-auto p-4 md:p-8">
                    
                    {/* BLOCo PRINCIPAL: Imagem e Compra (CÓDIGO ANTERIOR) */}
                    <div className="flex flex-col lg:flex-row gap-10 bg-white shadow-xl rounded-lg overflow-hidden">
                        {/* 1. Galeria de Imagens */}
                        <div className="lg:w-1/2 p-6 flex flex-col items-center">
                            <div className="relative w-full max-w-lg">
                                <img 
                                    src={product.imageUrl} 
                                    alt={product.name} 
                                    className="w-full h-auto object-cover rounded-lg shadow-lg" 
                                />
                                {/* Botão de Favorito */}
                                <button
                                    onClick={handleToggleFavorite}
                                    className={cn(
                                        "absolute top-4 right-4 p-2 rounded-full transition-all duration-300 shadow-lg",
                                        isFavorite 
                                            ? "bg-red-500 text-white hover:bg-red-600" 
                                            : "bg-white text-gray-400 hover:bg-red-50 hover:text-red-500"
                                    )}
                                    aria-label="Adicionar aos favoritos"
                                >
                                    <Heart size={24} className={isFavorite ? "fill-current" : "fill-none stroke-current"} />
                                </button>
                            </div>
                        </div>

                        {/* 2. Detalhes e Ações */}
                        <div className="lg:w-1/2 p-6 space-y-6">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{product.name}</h1>
                            
                            {/* Rating */}
                            <div className="flex items-center space-x-2">
                                <div className="flex">{stars}</div>
                                <span className="text-sm font-semibold text-gray-600">
                                    {product.rating.toFixed(1)} / 5.0 
                                </span>
                                <span className="text-sm text-gray-400">(15 Avaliações)</span>
                            </div>

                            <p className="text-lg text-gray-500 border-b pb-4">{product.category}</p>

                            {/* Preços */}
                            <div className='flex items-baseline space-x-3'>
                                {product.oldPrice && product.oldPrice > product.price && (
                                    <span className="text-xl text-gray-400 line-through">
                                        {formatCurrency(product.oldPrice)}
                                    </span>
                                )}
                                <span className="text-4xl font-extrabold text-pink-600">
                                    {formatCurrency(product.price)}
                                </span>
                                {product.oldPrice && product.oldPrice > product.price && (
                                    <span className="text-lg font-bold text-red-500">
                                        {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                                    </span>
                                )}
                            </div>
                            
                            {/* Descrição Curta */}
                            <p className="text-gray-700 leading-relaxed pt-4 border-y py-4">
                                {product.description}
                            </p>

                            {/* Variações (Simuladas) */}
                            <div className="space-y-3">
                                <h3 className="text-md font-semibold text-gray-800">Selecione a Variação:</h3>
                                <div className="flex gap-3">
                                    {product.variations.map(v => (
                                        <Button 
                                            key={v.value}
                                            variant={selectedVariation === v.value ? "default" : "outline"}
                                            onClick={() => setSelectedVariation(v.value)}
                                            className={cn(
                                                "transition-colors",
                                                selectedVariation === v.value ? "bg-teal-700 hover:bg-teal-800" : "border-gray-300 hover:bg-gray-50"
                                            )}
                                        >
                                            {v.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Quantidade e CTA */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 pt-4">
                                {/* Controle de Quantidade */}
                                <div className="flex items-center border border-gray-300 rounded-md p-1">
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    >
                                        <Minus size={18} />
                                    </Button>
                                    <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                                    <Button 
                                        variant="ghost" 
                                        size="icon"
                                        onClick={() => setQuantity(q => q + 1)}
                                    >
                                        <Plus size={18} />
                                    </Button>
                                </div>
                                
                                {/* Botão Adicionar ao Carrinho */}
                                <Button
                                    size="lg"
                                    className={cn(
                                        "flex-grow sm:flex-grow-0 font-semibold transition-all duration-300",
                                        addedToCart ? "bg-green-600 hover:bg-green-700" : "bg-teal-700 hover:bg-teal-800"
                                    )}
                                    onClick={handleAddToCart}
                                    disabled={isOutOfStock}
                                >
                                    {isOutOfStock ? (
                                        "Esgotado"
                                    ) : addedToCart ? (
                                        <><Check size={20} className="mr-2" /> Adicionado!</>
                                    ) : (
                                        <><ShoppingBag size={20} className="mr-2" /> Adicionar {quantity} {quantity > 1 ? 'itens' : 'item'}</>
                                    )}
                                </Button>
                            </div>
                            
                            {/* Estoque e Prazo de Entrega (Mock) */}
                            <div className="text-sm text-gray-500 pt-2">
                                <p>📦 **Estoque:** {product.stock > 0 ? `${product.stock} unidades disponíveis` : 'Esgotado'}</p>
                                <p>🚚 **Previsão de Entrega:** 5-7 dias úteis</p>
                            </div>

                        </div>
                    </div>
                    
                    {/* SEÇÃO DE DESCRIÇÃO COMPLETA E DETALHES TÉCNICOS */}
                    <div className="mt-12 p-6 bg-white shadow-xl rounded-lg">
                        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">
                            Descrição Completa e Especificações
                        </h2>
                        <div className="prose max-w-none text-gray-600">
                            <p>{product.longDescription}</p>
                            
                            <h3 className="mt-6 text-xl font-semibold">Ficha Técnica</h3>
                            <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                                <li>**Nome:** {product.name}</li>
                                <li>**Categoria:** {product.category}</li>
                                <li>**Material:** Madeira de reflorestamento, Pigmentos atóxicos (Simulado)</li>
                                <li>**Conteúdo:** 12 Lápis de cor e 1 Bloco de Desenho (Simulado)</li>
                            </ul>
                        </div>
                    </div>

                    {/* ⬅️ NOVO: SEÇÃO DE PRODUTOS RELACIONADOS ABAIXO DA DESCRIÇÃO COMPLETA */}
                    <RelatedProductsSection />


                </div>
            </main>

            <Footer /> {/* ⬅️ Rodapé importado */}
        </div>
    );
};

export default ProductDetailPage;