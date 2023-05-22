export type CartItem = {
    id: number,
    name: string,
    price: number,
    quantity: number,
}

export type CartProps = {
    items: CartItem[],
    handleCheckout: () => void,
    handleRemoveFromCart: (item:CartItem) => void,
}

export type Product = {
    id: number,
    name: string,
    price: number,
    image_url: string,
    stock: number,
}

// marshalled into JSON and stored in purchase table
export type PurchasedItem = {
    id: number,
    name: string,
    quantity: number,
}

export type ProductsProps = {
    products: Product[],
    handleAddToCart: (product:Product) => void,
}

export type Purchase = {
    purchase_date: Date,
    purchase_value: number,
    purchased_items: PurchasedItem[],
}

export type PurchaseProps = {
    purchases: Purchase[],
}