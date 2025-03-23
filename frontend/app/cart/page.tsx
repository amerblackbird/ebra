"use client"

import * as React from "react"
import {useCallback} from "react"
import Link from "next/link"
import {ShoppingCart} from "lucide-react"

import {Button} from "@/src/components/ui/button"
import {RadioGroup, RadioGroupItem} from "@/src/components/ui/radio-group"
import {Label} from "@/src/components/ui/label"
import {Separator} from "@/src/components/ui/separator"
import Header from "@/src/components/header"
import Footer from "@/src/components/footer";
import useCartStore from "@/src/stores/cart";
import CartItem from "@/src/components/cart/cart-item";


export default function CartPage() {
    const [shippingMethod, setShippingMethod] = React.useState("free")
    const {cart, removeItem, updateQuantity} = useCartStore();

    // Calculate shipping cost
    const getShippingCost = () => {
        switch (shippingMethod) {
            case "express":
                return 15.0
            case "pickup":
                return 21.0
            default:
                return 0
        }
    }
    const getTotalCost = useCallback(() => {
        return cart.total + getShippingCost();
    }, [cart]);


    return (
        <div className="flex min-h-screen flex-col">
            {/* Header */}
            <Header/>

            <main className="flex-1">
                <div className="container py-10 mx-auto">
                    <h1 className="mb-8 text-center text-3xl font-bold md:text-4xl">Cart</h1>

                    {/* Checkout Steps */}
                    <div className="mb-12 flex justify-center">
                        <div className="flex w-full max-w-3xl items-center justify-between">
                            <div className="flex flex-1 flex-col items-center">
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">1
                                </div>
                                <span className="mt-2 text-sm font-medium">Shopping cart</span>
                                <div className="mt-2 h-1 w-full bg-black"></div>
                            </div>
                            <div className="flex flex-1 flex-col items-center">
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-gray-600">2
                                </div>
                                <span className="mt-2 text-sm text-gray-500">Checkout details</span>
                                <div className="mt-2 h-1 w-full bg-gray-200"></div>
                            </div>
                            <div className="flex flex-1 flex-col items-center">
                                <div
                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-gray-600">3
                                </div>
                                <span className="mt-2 text-sm text-gray-500">Order complete</span>
                            </div>
                        </div>
                    </div>

                    {cart.items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <ShoppingCart className="mb-4 h-16 w-16 text-muted-foreground"/>
                            <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
                            <p className="mb-8 text-center text-muted-foreground">
                                Looks like you havent added anything to your cart yet.
                            </p>
                            <Button asChild>
                                <Link href="/shop">Continue Shopping</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-3">
                            {/* Cart Items */}
                            <div className="md:col-span-2">
                                <div className="mb-4 hidden grid-cols-4 gap-4 border-b pb-2 md:grid">
                                    <div className="font-medium">Product</div>
                                    <div className="font-medium">Quantity</div>
                                    <div className="font-medium">Price</div>
                                    <div className="font-medium">Subtotal</div>
                                </div>

                                <div className="space-y-6">
                                    {cart.items.map((item) => (
                                        <CartItem key={item.product.id}
                                                  item={item}
                                                  dec={() => {
                                                      if (item.quantity > 1) {
                                                          updateQuantity(item.product.id, item.quantity - 1)
                                                      }
                                                  }}
                                                  inc={() => {
                                                      updateQuantity(item.product.id, item.quantity + 1)
                                                  }} remove={() => {
                                            removeItem(item.product.id)
                                        }}/>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="rounded-lg border p-6">
                                    <h3 className="mb-4 text-lg font-medium">Cart summary</h3>

                                    <RadioGroup
                                        defaultValue="free"
                                        value={shippingMethod}
                                        onValueChange={setShippingMethod}
                                        className="mb-6 space-y-3"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="free" id="free-shipping"/>
                                                <Label htmlFor="free-shipping">Free shipping</Label>
                                            </div>
                                            <span>$0.00</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="express" id="express-shipping"/>
                                                <Label htmlFor="express-shipping">Express shipping</Label>
                                            </div>
                                            <span>+$15.00</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="pickup" id="pickup"/>
                                                <Label htmlFor="pickup">Pick Up</Label>
                                            </div>
                                            <span>%21.00</span>
                                        </div>
                                    </RadioGroup>

                                    <Separator className="my-4"/>

                                    <div className="space-y-1.5">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span>${cart.total.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between font-medium">
                                            <span>Total</span>
                                            <span>${getTotalCost()}</span>
                                        </div>
                                    </div>

                                    <Button
                                        className="mt-6 w-full bg-black text-white hover:bg-black/90">Checkout</Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer/>
        </div>
    )
}

