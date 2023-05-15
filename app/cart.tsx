import React from 'react';

export type CartItem = {
    id: number,
    name: string,
    price: number,
    quantity: number,
}

type CartProps = {
    items: CartItem[],
}

export function Cart(props:CartProps) {
    return (
        <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Cart</h2>
            <div className="mt-6">
                {props.items.map((item) => (
                    <li className='text-black'>{item.name} x {item.quantity} = ${(item.quantity * item.price).toFixed(2)}</li>
                ))}
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Checkout
            </button>
        </div>
    )
}