import React from 'react';
import CheckoutClient from '../components/CheckoutClient';

const CheckoutPage = () => {
  return (
    
    <div className="min-h-screen bg-[#030a7f]/5 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-[#030a7f] mb-10 text-center">
        Finalizar Pedido
      </h1>

      <CheckoutClient />
    </div>
  );
};

export default CheckoutPage;
