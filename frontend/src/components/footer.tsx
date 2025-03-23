import React from 'react';
import Link from "next/link";
import {Button} from "@/src/components/ui/button";

function Footer() {
    return (
        <footer className="border-t bg-black text-white">
            <div className="container py-8 md:py-12 mx-auto px-4">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Link href="/" className="mb-4 inline-block text-xl font-bold">
                            Ebra
                        </Link>
                        <p className="text-sm text-gray-400">Gift & Decoration Store</p>
                    </div>
                    <div className="space-y-4 md:col-span-3 lg:col-span-2">
                        <div className="flex flex-wrap gap-8">
                            <div>
                                <Link href="/" className="text-sm hover:underline">
                                    Home
                                </Link>
                            </div>
                            <div>
                                <Link href="/shop" className="text-sm hover:underline">
                                    Shop
                                </Link>
                            </div>
                            <div>
                                <Link href="/product" className="text-sm hover:underline">
                                    Product
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4 md:justify-end">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                            >
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                            </svg>
                            <span className="sr-only">Facebook</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                            >
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                            </svg>
                            <span className="sr-only">Instagram</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                            >
                                <path
                                    d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                            </svg>
                            <span className="sr-only">Twitter</span>
                        </Button>
                    </div>
                </div>
                <div className="mt-8 flex flex-col justify-between gap-4 border-t border-gray-800 pt-8 md:flex-row">
                    <p className="text-xs text-gray-400">Copyright © 2025 ebra. All rights reserved</p>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="text-xs text-gray-400 hover:underline">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-xs text-gray-400 hover:underline">
                            Terms of Use
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;