import React from 'react';
import Link from "next/link";
import {Button} from "@/src/components/ui/button";
import {Menu, Search, User} from "lucide-react";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/src/components/ui/sheet";
import CartIcon from "@/src/components/cart/cart-icon";

function Header() {

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background ">
            <div className="container flex h-16 items-center mx-auto px-4 md:px-2 lg:px-0">
                <div className="flex items-center gap-6 md:gap-10">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold">Ebra</span>
                    </Link>
                    <nav className="hidden gap-6 md:flex">
                        <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                            Home
                        </Link>
                        <Link href="/product" className="text-sm font-medium transition-colors hover:text-primary">
                            Product
                        </Link>
                    </nav>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="hidden md:flex">
                        <Search className="h-5 w-5"/>
                        <span className="sr-only">Search</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="hidden md:flex">
                        <User className="h-5 w-5"/>
                        <span className="sr-only">Account</span>
                    </Button>
                    <Button variant="ghost" size="icon" asChild={true} className={"relative"}>
                        <Link href={"/cart"}>
                            <CartIcon/>
                        </Link>
                    </Button>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5"/>
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <SheetHeader>
                                <SheetTitle>Ebra</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col gap-4 pt-4 px-4">
                                <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
                                    Home
                                </Link>
                                <Link href="/product"
                                      className="text-sm font-medium transition-colors hover:text-primary">
                                    Product
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}

export default Header;