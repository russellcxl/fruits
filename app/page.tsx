"use client"

import { useEffect, useState } from 'react';
import { Cart, CartItem } from './cart';
import { Products, Product } from './products';

export default function Home() {
  const [data, setData] = useState<{ id: number, name: string, price: number, image_url: string }[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchResponse = async () => {
      const res = await fetch('/api/get-fruits');
      const data = await res.json();
      setData(data);
    };
    fetchResponse();
  }, []);

  const handleAddToCart = (fruit:Product) => {
    const existingCartItem = cart.find(item => item.id === fruit.id);
    if (existingCartItem) {
      setCart(prevCart => prevCart.map(item => item.id === fruit.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart(prevCart => [...prevCart, { id: fruit.id, name: fruit.name, price: fruit.price, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (fruitId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== fruitId));
  };

  return (
    <div className="bg-white mx-auto grid grid-cols-12 gap-4 p-1">

      <div className="col-span-12 rounded-lg bg-white p-32 sm:col-span-8">
        <Products 
        products={data} 
        handleAddToCart={handleAddToCart} />
      </div>

      <div className="col-span-12 rounded-lg border border-gray-400 bg-gray-200 p-16 sm:col-span-4">
        <Cart items={cart} />
      </div>

    </div>

  )
}
