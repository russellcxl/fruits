export type CartItem = {
    id: number,
    name: string,
    price: number,
    quantity: number,
}

export type CartProps = {
    items: CartItem[],
    handleCheckout: () => void,
}

export type Product = {
    id: number,
    name: string,
    price: number,
    image_url: string,
}

// marshalled into JSON and stored in purchase table
export type PurchasedItem = {
    name: string,
    quantity: number,
}

export type ProductsProps = {
    products: Product[],
    handleAddToCart: (product:Product) => void,
}
