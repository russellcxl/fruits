"use client"

import { useEffect, useState } from 'react';
import { Cart, CartItem } from './cart';

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

  const handleAddToCart = (fruit: { id: number, name: string, price: number }) => {
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
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Fruits</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((x) => (
            <div key={x.id} className="group relative">
              <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={x.image_url}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    {x.name}
                  </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">${x.price}</p>
              </div>
              <div>
                <button onClick={() => handleAddToCart({ id: x.id, name: x.name, price: x.price })} className="bg-gray-800 text-white px-4 py-2 rounded-md">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-12 rounded-lg border border-gray-400 bg-gray-200 p-16 sm:col-span-4">
        <Cart items={cart} />
      </div>

    </div>

  )
}
