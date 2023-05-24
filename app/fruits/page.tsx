"use client"

import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function Example() {
	const [fruitName, setFruitName] = useState('');
	const [fruitPrice, setFruitPrice] = useState('');
	const [fruitImage, setFruitImage] = useState('');
	const [fruitStock, setFruitStock] = useState(0);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = { name: fruitName, price: Number(fruitPrice), image_url: fruitImage, stock: fruitStock }
		setFruitName('')
		setFruitPrice('')
		setFruitImage('')
		setFruitStock(0)
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fruits`, {
			method: 'POST',
			body: JSON.stringify(data)
		});
		if (response.ok) {
			toast.success('Added fruit to cart!', {
				autoClose: 1000,
				position: "top-center",
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
			});
		} else {
			toast.error('Error adding fruit!', {
				autoClose: 1000,
				position: "top-center",
				hideProgressBar: true,
				closeOnClick: true,
				pauseOnHover: true,
			});
		}
	};

	return (
		<div className="bg-white flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Add your fruit
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
					<div>
						<label className="block text-sm font-medium leading-6 text-gray-900">
							Name
						</label>
						<div className="mt-2">
							<input
								onChange={(e) => setFruitName(e.target.value)}
								type="text"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium leading-6 text-gray-900">
							Price
						</label>
						<div className="mt-2">
							<input
								onChange={(e) => setFruitPrice(e.target.value)}
								type="text"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium leading-6 text-gray-900">
							Image URL
						</label>
						<div className="mt-2">
							<input
								onChange={(e) => setFruitImage(e.target.value)}
								type="text"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>


					<div>
						<label className="block text-sm font-medium leading-6 text-gray-900">
							Stock
						</label>
						<div className="mt-2">
							<input
								onChange={(e) => setFruitStock(parseInt(e.target.value))}
								type="text"
								required
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							/>
						</div>
					</div>


					<div>
						<button
							type="submit"
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
			<ToastContainer />
		</div>
	)
}