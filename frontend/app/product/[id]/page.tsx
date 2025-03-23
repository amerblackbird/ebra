import * as React from "react"


import {ProductModel} from "@/src/models/product";
import ProductDetail from "@/components/products/product-details";
import {notFound} from "next/navigation";
import Header from "@/components/header";
import Link from "next/link";
import Footer from "@/components/footer";

async function getProducts(id: number): Promise<ProductModel> {
    return fetch(
        `https://fakestoreapi.com/products/${id}`)
        .then((response) => response.json())
        .catch(() => undefined);
}


export default async function Page({params}: { params: Promise<{ id: number }> }) {
    const {id} = await params

    const product = await getProducts(id);

    if (!product) {
        return notFound();
    }

    return (
        <div className="flex min-h-screen flex-col">

            <Header/>

            <div className="container py-4 mx-auto">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-foreground">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/product" className="hover:text-foreground">
                        Product
                    </Link>
                    <span>/</span>
                    <span className="text-foreground"> {product.title}</span>
                </div>
            </div>

            <ProductDetail product={product}/>

            <Footer/>
        </div>
    )
}

