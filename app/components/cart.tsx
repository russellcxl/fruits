import React from 'react';
import { CartProps } from './types';

export function Cart(props: CartProps) {
    const sum = props.items.map((item) => {
        return (item.price * item.quantity)
    }).reduce((a, b) => {
        return a + b
    }, 0).toFixed(2)
    return (
        <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Cart</h2>
            <div className="mt-6">
                {props.items.map((item) => (
                    <div key={item.id} className="flex items-center">
                        <li className="text-black">
                            {item.name} x {item.quantity} = ${(item.quantity * item.price).toFixed(2)}
                        </li>
                        <button onClick={() => props.handleRemoveFromCart(item)} className="ml-2 bg-red-200 rounded hover:bg-red-700 py-1 px-1 mt-1">remove</button>
                    </div>
                ))}
            </div>
            <div className="text-gray-900 mt-4 font-bold">Total cost = ${sum}</div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={() => props.handleCheckout()}>
                Checkout
            </button>
        </div>
    )
}