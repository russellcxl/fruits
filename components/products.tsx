import React from 'react';
import { ProductsProps } from '../types/types';
import { useRouter } from 'next/navigation'


export function Products(props: ProductsProps) {
	const router = useRouter()
	return (
		<div>
			<div className="flex justify-between">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">Fruits</h2>
				<button
					className="rounded-md bg-blue-500 hover:bg-blue-700 px-3 py-1.5 text-2xl font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					onClick={() => router.push("/purchases")}
				>
					Purchases
				</button>
			</div>
			<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
				{props.products.map((x) => (
					<div key={x.id} className="group relative">
						<div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
							<img
								src={x.image_url == "" ? "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930" : x.image_url}
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
							<h3 className="text-sm text-gray-700">Stock: {x.stock}</h3>
						</div>
						<div>
							<button
								onClick={() => props.handleAddToCart({ id: x.id, name: x.name, price: x.price, image_url: x.image_url, stock: x.stock })}
								className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900">
								Add to Cart
							</button>
						</div>
					</div>
				))}


				<div className="group relative">
					<div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
						<img
							src={"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/1200px-Plus_symbol.svg.png"}
							className="h-full w-full object-cover object-center lg:h-full lg:w-full hover:bg-gray-300 hover:cursor-pointer"
							onClick={() => router.push("/fruits")}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}