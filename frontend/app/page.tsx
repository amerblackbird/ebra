import * as React from "react"

import Header from "@/components/header";
import Hero from "@/components/hero";
import Footer from "@/components/footer";
import Shops from "@/components/shops";


export default function ShopPage() {

    return (
        <div className="flex min-h-screen flex-col">
            <Header/>
            <Hero/>
            <Shops/>
            <Footer/>

        </div>
    )
}

