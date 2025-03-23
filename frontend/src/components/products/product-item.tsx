import React from 'react';
import {Card, CardContent, CardFooter} from "@/src/components/ui/card";
import {Button} from "@/src/components/ui/button";
import {Heart} from "lucide-react";
import {ProductModel} from "@/src/models/product";
import Link from "next/link";

interface IProps {
    product: ProductModel,
    isInCart: boolean;
    toggleCart: () => void;
}

function ProductItem({product, isInCart, toggleCart}: IProps) {
    return (
        <Link href={"/product/" + product.id}>
            <Card key={product.id} className="overflow-hidden border">
                <div className="relative">
                    <div className="aspect-square overflow-hidden">
                        <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.title}
                            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 text-foreground shadow-sm backdrop-blur-sm hover:bg-white/70"
                    >
                        <Heart className="h-4 w-4"/>
                        <span className="sr-only">Add to wishlist</span>
                    </Button>
                </div>
                <CardContent className="p-4">
                    <div className="mb-1 flex">
                        {Array.from({length: 5}).map((_, i) => (
                            <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-4 w-4 text-yellow-400"
                            >
                                <polygon
                                    points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                        ))}
                    </div>
                    <h3 className="font-medium">{product.title}</h3>
                    <div className="mt-1 flex items-center gap-2">
                        <span className="font-medium">${product.price.toFixed(2)}</span>
                        {product.price && (
                            <span className="text-sm text-muted-foreground line-through">
                          ${product.price.toFixed(2)}
                        </span>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    <Button className="w-full"
                            variant={isInCart ? 'destructive' : 'outline'}
                            onClick={(e) => {
                                e.preventDefault();
                                toggleCart();
                            }}>
                        {isInCart ? 'Remove from cart' : 'Add to cart'}
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}

export default ProductItem;