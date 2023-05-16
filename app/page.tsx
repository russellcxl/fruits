"use client"

import { useEffect, useState } from 'react';
import { Cart } from './components/cart';
import { Products } from './components/products';
import { CartItem, Product, PurchasedItem } from './components/types';

export default function Home() {
	const [products, setProducts] = useState<Product[]>([]);
	const [cart, setCart] = useState<CartItem[]>([]);

	useEffect(() => {
		const res = async () => {
			const res = await fetch('/api/get-fruits')
			const data = await res.json()
			setProducts(data)
		};
		res();
	}, []);

	const handleAddToCart = (fruit: Product) => {

		// reduce stock value for product
		for (let i = 0; i < products.length; i++) {
			const p = products[i]
			if (fruit.id === p.id) {
				if (p.stock === 0) { return }
				p.stock--
				break
			}
		}
		setProducts(products)

		// add items to cart panel
		const existingCartItem = cart.find(item => item.id === fruit.id)
		if (existingCartItem) {
			setCart(prevCart => prevCart.map(item => item.id === fruit.id ? { ...item, quantity: item.quantity + 1 } : item))
		} else {
			setCart(prevCart => [...prevCart, { id: fruit.id, name: fruit.name, price: fruit.price, quantity: 1 }])
		}

	}

	const handleRemoveFromCart = (item:CartItem) => {
		setCart(cart => cart.filter(i => i.id !== item.id))
		const newProducts = products.map((p)=> {
			if (p.id === item.id) {
				p.stock += item.quantity
			}
			return p
		})
		setProducts(newProducts)
	}

	const handleCheckout = async () => {
		try {
			const sum = cart.map((item) => {
				return (item.price * item.quantity)
			}).reduce((a, b) => {
				return a + b
			}, 0)
			const purchasedItems: PurchasedItem[] = cart.map((item) => {
				return {
					id: item.id,
					name: item.name,
					quantity: item.quantity,
				}
			})
			setCart([])
			const res = await fetch('/api/add-purchase', {
				method: 'POST',
				body: JSON.stringify({
					purchase_date: new Date(),
					purchase_value: sum,
					purchased_items: purchasedItems,
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
					products={products}
					handleAddToCart={handleAddToCart} />
			</div>
			<div className="col-span-12 rounded-lg border border-gray-400 bg-gray-200 p-16 sm:col-span-4">
				<Cart
					items={cart}
					handleCheckout={handleCheckout}
					handleRemoveFromCart={handleRemoveFromCart} />
			</div>

		</div>
	)
}
