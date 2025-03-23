import * as React from "react"

import Header from "@/src/components/header";
import Hero from "@/src/components/hero";
import Footer from "@/src/components/footer";
import Shops from "@/src/components/shops";


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

