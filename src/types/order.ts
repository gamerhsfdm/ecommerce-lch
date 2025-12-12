// types/order.ts (Se você usa types separados)
export type OrderStatus = 'PENDENTE' | 'PROCESSANDO' | 'ENVIADO' | 'ENTREGUE' | 'CANCELADO';

export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
}

export interface Order {
    id: string;
    date: string; // Ex: '2023-10-26'
    status: OrderStatus;
    total: number;
    items: OrderItem[];
    shippingAddress: string;
    trackingNumber: string;
    paymentMethod: string;
}

// MOCK DATA
const MOCK_ORDERS: Order[] = [
    {
        id: "ORD-20231026-1",
        date: "26 de Outubro de 2023",
        status: "ENTREGUE",
        total: 120.50,
        shippingAddress: "Rua das Flores, 100 - São Paulo, SP",
        trackingNumber: "BR123456789XX",
        paymentMethod: "Cartão de Crédito",
        items: [
            { id: "p1", name: "LAPIS DE COR 12C", quantity: 1, price: 76.66, imageUrl: "https://via.placeholder.com/50?text=Lapis" },
            { id: "p2", name: "Caneta Gel Azul", quantity: 2, price: 21.92, imageUrl: "https://via.placeholder.com/50?text=Caneta" },
        ],
    },
    {
        id: "ORD-20231201-2",
        date: "01 de Dezembro de 2023",
        status: "PROCESSANDO",
        total: 89.99,
        shippingAddress: "Av. Principal, 50 - Rio de Janeiro, RJ",
        trackingNumber: "Aguardando Envio",
        paymentMethod: "PIX",
        items: [
            { id: "p3", name: "Caderno Inteligente", quantity: 1, price: 89.99, imageUrl: "https://via.placeholder.com/50?text=Caderno" },
        ],
    },
    {
        id: "ORD-20230915-3",
        date: "15 de Setembro de 2023",
        status: "CANCELADO",
        total: 45.00,
        shippingAddress: "Rua X, 99 - Belo Horizonte, MG",
        trackingNumber: "N/A",
        paymentMethod: "Boleto",
        items: [
            { id: "p4", name: "Estojo Lona", quantity: 1, price: 45.00, imageUrl: "https://via.placeholder.com/50?text=Estojo" },
        ],
    },
];