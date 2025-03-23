import React from 'react';
import Image from "next/image";
import {Minus, Plus, X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {CartItemModel} from "@/src/models/cart";

interface IProp {
    item: CartItemModel;
    remove: () => void;
    dec: () => void;
    inc: () => void;
}

function CartItem({item, dec, inc, remove}: IProp) {
    return (
        <div key={item.product.id} className="grid grid-cols-1 gap-4 border-b pb-6 md:grid-cols-4">
            <div className="flex items-center gap-4">
                <div className="h-20 w-20 overflow-hidden rounded-md border bg-muted">
                    <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.title}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div>
                    <h3 className="font-medium">{item.product.title}</h3>
                    <button
                        onClick={remove}
                        className="mt-1 flex items-center text-sm text-muted-foreground hover:text-foreground"
                    >
                        <X className="mr-1 h-3 w-3"/>
                        Remove
                    </button>
                </div>
            </div>
            <div className="flex items-center">
                <div className="flex items-center">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={dec}
                        disabled={item.quantity <= 1}
                    >
                        <Minus className="h-3 w-3"/>
                        <span className="sr-only">Decrease</span>
                    </Button>
                    <div className="flex h-8 w-8 items-center justify-center border border-l-0 border-r-0">
                        {item.quantity}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={inc}
                    >
                        <Plus className="h-3 w-3"/>
                        <span className="sr-only">Increase</span>
                    </Button>
                </div>
            </div>
            <div className="flex items-center">${item.product.price.toFixed(2)}</div>
            <div className="flex items-center font-medium">
                ${(item.product.price * item.quantity).toFixed(2)}
            </div>
        </div>
    );
}

export default CartItem;