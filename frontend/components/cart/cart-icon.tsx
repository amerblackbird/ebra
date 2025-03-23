"use client"

import React from 'react';
import {ShoppingCart} from "lucide-react";
import useCartStore from "@/src/stores/cart";

function CartIcon() {
    const {cart: {items}} = useCartStore();

    return (
        <>
            <ShoppingCart className="h-5 w-5"/>
            {items.length > 0 && (
                <span
                    className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                {items.length > 9 ? '+9' : items.length}
                            </span>
            )}
            <span className="sr-only">Cart</span>
        </>
    );
}

export default CartIcon;