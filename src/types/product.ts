// src/types/product.ts

// Usamos Interface para a tipagem de objetos
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string; // O Next.js receberá isso como string da API
  updatedAt: string;
}

// Usamos Type para tipagem mais simples
export type OrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED';