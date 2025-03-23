"use client"

import * as React from "react"
import {useMemo} from "react"
import Image from "next/image"
import {Heart, Minus, Plus, Star} from "lucide-react"

import {Button} from "@/components/ui/button"
import {ProductModel} from "@/src/models/product";
import useCartStore from "@/src/stores/cart";

interface IProps {
    product: ProductModel
}


export default function ProductDetail({product}: IProps) {
    const [isWishlisted, setIsWishlisted] = React.useState(false)

    const {cart, addItem, removeItem, updateQuantity} = useCartStore();

    const cartItem = useMemo(() => {
        return cart.items.find(item => item.product.id === product.id);
    }, [cart.total]);


    const [timeLeft, setTimeLeft] = React.useState({
        days: 2,
        hours: 12,
        minutes: 45,
        seconds: 5,
    })

    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft.seconds > 0) {
                setTimeLeft({...timeLeft, seconds: timeLeft.seconds - 1})
            } else if (timeLeft.minutes > 0) {
                setTimeLeft({...timeLeft, minutes: timeLeft.minutes - 1, seconds: 59})
            } else if (timeLeft.hours > 0) {
                setTimeLeft({...timeLeft, hours: timeLeft.hours - 1, minutes: 59, seconds: 59})
            } else if (timeLeft.days > 0) {
                setTimeLeft({...timeLeft, days: timeLeft.days - 1, hours: 23, minutes: 59, seconds: 59})
            }
        }, 1000)

        return () => clearTimeout(timer)
    }, [timeLeft])


    // Toggle wishlist
    const toggleWishlist = () => {
        setIsWishlisted(!isWishlisted)
    }

    return (
        <main className="container pb-16 pt-4 mx-auto">
            <div className="grid gap-8 md:grid-cols-2">
                <div className="relative">
                    <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
                        <Image
                            src={product.image || "/images/placeholder.svg"}
                            alt={product.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-1">
                        {Array.from({length: 5}).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
                        ))}
                        <span
                            className="ml-1 text-sm text-muted-foreground">{product.rating.rate} Reviews({product.rating.count})</span>
                    </div>

                    <h1 className="mt-2 text-3xl font-bold">{product.title}</h1>

                    <p className="mt-4 text-muted-foreground">{product.description}</p>

                    <div className="mt-6 flex items-center gap-2">
                        <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                    </div>

                    <div className="mt-6">
                        <p className="text-sm text-muted-foreground">Offer expires in:</p>
                        <div className="mt-2 flex gap-2">
                            <div className="flex flex-col items-center">
                                <div
                                    className="flex h-12 w-12 items-center justify-center rounded bg-muted text-xl font-semibold">
                                    {String(timeLeft.days).padStart(2, "0")}
                                </div>
                                <span className="mt-1 text-xs text-muted-foreground">Days</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div
                                    className="flex h-12 w-12 items-center justify-center rounded bg-muted text-xl font-semibold">
                                    {String(timeLeft.hours).padStart(2, "0")}
                                </div>
                                <span className="mt-1 text-xs text-muted-foreground">Hours</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div
                                    className="flex h-12 w-12 items-center justify-center rounded bg-muted text-xl font-semibold">
                                    {String(timeLeft.minutes).padStart(2, "0")}
                                </div>
                                <span className="mt-1 text-xs text-muted-foreground">Minutes</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <div
                                    className="flex h-12 w-12 items-center justify-center rounded bg-muted text-xl font-semibold">
                                    {String(timeLeft.seconds).padStart(2, "0")}
                                </div>
                                <span className="mt-1 text-xs text-muted-foreground">Seconds</span>
                            </div>
                        </div>
                    </div>


                    {/* Quantity and Actions */}
                    <div className="mt-8 flex flex-wrap gap-4">
                        <div className="flex items-center">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-10 w-10 rounded-none"
                                onClick={() => {
                                    if (!cartItem) {
                                        return addItem(product, 1);
                                    }
                                    if (cartItem.quantity > 1) {
                                        updateQuantity(cartItem.product.id, cartItem.quantity - 1)
                                    }
                                }}
                                disabled={cartItem && cartItem?.quantity <= 1}

                            >
                                <Minus className="h-3 w-3"/>
                                <span className="sr-only">Decrease</span>
                            </Button>
                            <div
                                className="flex h-10 w-10 items-center justify-center border border-l-0 border-r-0">
                                {cartItem?.quantity ?? 0}
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-10 w-10 rounded-none"
                                onClick={() => {
                                    if (!cartItem) {
                                        return;
                                    }
                                    if (cartItem.quantity >= 1) {
                                        updateQuantity(cartItem.product.id, cartItem.quantity + 1)
                                    }
                                }}
                                disabled={!cartItem}

                            >
                                <Plus className="h-3 w-3"/>
                                <span className="sr-only">Increase</span>
                            </Button>
                        </div>
                        <Button variant="outline" className="h-10 flex-1 border-black" onClick={toggleWishlist}>
                            <Heart className={`mr-2 h-4 w-4 ${isWishlisted ? "fill-black" : ""}`}/>
                            Wishlist
                        </Button>
                        <Button
                            variant={cartItem ? 'destructive' : 'outline'}
                            className="h-10 flex-1" onClick={() => {
                            if (!cartItem) {
                                addItem(product, 1);
                            } else {
                                removeItem(product.id)
                            }
                        }}>{cartItem ? 'Remove from cart' : 'Add to Cart'}</Button>
                    </div>

                    <div className="mt-8 space-y-2 text-sm">
                        <div className="flex">
                            <span className="w-20 text-muted-foreground">CATEGORY</span>
                            <span>{product.category}</span>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    )
}

