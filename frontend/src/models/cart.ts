import {ProductModel} from "@/src/models/product";

export interface CartItemModel {
    product: ProductModel
    quantity: number
}

export interface CartModel {
    items: CartItemModel[]
    total: number
}

export function cartContains(cart: CartModel, productId: number): boolean {
    return cart.items.some(item => item.product.id === productId);
}

