import React from 'react';
import Link from "next/link";

function Hero() {
    return (
        <section className="relative bg-muted/30"
                 style={{
                     backgroundImage: 'url(/images/banner.png)',
                     backgroundSize: 'cover',
                     backgroundPosition: 'center'
                 }}

        >
            <div className="container py-16 md:py-24">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-6 flex items-center gap-2 text-sm">
                        <Link href="/" className="text-muted-foreground hover:text-foreground">
                            Home
                        </Link>
                        <span className="text-muted-foreground">/</span>
                        <span>Shop</span>
                    </div>
                    <h1 className="mb-4 text-4xl font-bold md:text-4xl">Shop Page</h1>
                    <p className="max-w-[600px] text-muted-foreground">Lets design the place you always imagined.</p>
                </div>
            </div>
        </section>
    );
}

export default Hero;