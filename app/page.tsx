"use client"

import { useEffect, useState } from 'react';
import { Cart } from './cart';
import { Products } from './products';
import { CartItem, Product, PurchasedItem } from './types';
import { log } from 'console';

export default function Home() {
	const [data, setData] = useState<{ id: number, name: string, price: number, image_url: string }[]>([]);
	const [cart, setCart] = useState<CartItem[]>([]);

	useEffect(() => {
		const res = async () => {
			const res = await fetch('/api/get-fruits')
			const data = await res.json()
			setData(data)
		};
		res();
	}, []);

	const handleAddToCart = (fruit: Product) => {
		const existingCartItem = cart.find(item => item.id === fruit.id);
		if (existingCartItem) {
			setCart(prevCart => prevCart.map(item => item.id === fruit.id ? { ...item, quantity: item.quantity + 1 } : item));
		} else {
			setCart(prevCart => [...prevCart, { id: fruit.id, name: fruit.name, price: fruit.price, quantity: 1 }]);
		}
	};

	const handleRemoveFromCart = (fruitId: number) => {
		setCart(prevCart => prevCart.filter(item => item.id !== fruitId))
	}

	const handleCheckout = async () => {
		try {
			const sum = cart.map((item) => {
				return (item.price * item.quantity)
			}).reduce((a, b) => {
				return a + b
			}, 0)
			const purchasedItems:PurchasedItem[] = cart.map((item) => {
				return {
					name: item.name,
					quantity: item.quantity,
				}
			})
			console.log(`adding purchase: ${purchasedItems}`);
			const res = await fetch('/api/add-purchase', {
				method: 'POST',
				body: JSON.stringify({
					purchase_date: new Date(),
					purchase_value: sum,
					purchased_items: JSON.stringify(purchasedItems),
				})
			});
			console.log('Successfully added purchase!');
		} catch (e) {
			console.error(e);
			throw e
		}
	};

	return (
		<div className="bg-white mx-auto grid grid-cols-12 gap-4 p-1">

			<div className="col-span-12 rounded-lg bg-white p-32 sm:col-span-8">
				<Products
					products={data}
					handleAddToCart={handleAddToCart} />
			</div>
			<div className="col-span-12 rounded-lg border border-gray-400 bg-gray-200 p-16 sm:col-span-4">
				<Cart items={cart} handleCheckout={handleCheckout} />
			</div>

		</div>
	)
}
