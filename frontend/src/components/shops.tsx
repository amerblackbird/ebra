"use client"

import * as React from "react"

import {Button} from "@/src/components/ui/button"
import {Separator} from "@/src/components/ui/separator"
import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/src/components/ui/sheet"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/src/components/ui/dropdown-menu"
import CategoryList from "@/src/components/categories/category-list";
import {useQueryState} from "nuqs";
import ProductList from "@/src/components/products/product-list";
import PriceRange from "@/src/components/price-range/price-range";


export default function Shops() {
    // View mode: grid, compact, list
    const [viewMode, setViewMode] = React.useState<"grid" | "compact" | "list">("grid")

    // Mobile filters
    const [mobileFiltersOpen, setMobileFiltersOpen] = React.useState(false)

    // Filters
    const [selectedPriceRange, setSelectedPriceRange] = useQueryState("priceRange")

    // Categories
    // const [selectedCategory, setSelectedCategory] = React.useState<string | undefined>()

    const [selectedCategory, setSelectedCategory] = useQueryState('category')


    return (
        <>
            <section className="container px-2 py-8 md:py-12 md:px-0 mx-auto">
                <div className="flex items-center justify-between">
                    <Button variant="outline" size="sm" className="md:hidden"
                            onClick={() => setMobileFiltersOpen(true)}>
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
                            className="mr-2 h-4 w-4"
                        >
                            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>
                        </svg>
                        Filter
                    </Button>
                    <div className="hidden md:block">
                        <h2 className="text-xl font-semibold">Living Room</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="flex gap-1">
                                    Sort by
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
                                        className="h-4 w-4"
                                    >
                                        <path d="m6 9 6 6 6-6"/>
                                    </svg>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Newest</DropdownMenuItem>
                                <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                                <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                                <DropdownMenuItem>Best Selling</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div className="hidden items-center gap-1 md:flex">
                            <Button
                                variant={viewMode === "grid" ? "default" : "ghost"}
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setViewMode("grid")}
                            >
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
                                    className="h-4 w-4"
                                >
                                    <rect width="7" height="7" x="3" y="3" rx="1"/>
                                    <rect width="7" height="7" x="14" y="3" rx="1"/>
                                    <rect width="7" height="7" x="14" y="14" rx="1"/>
                                    <rect width="7" height="7" x="3" y="14" rx="1"/>
                                </svg>
                                <span className="sr-only">Grid view</span>
                            </Button>
                            <Button
                                variant={viewMode === "compact" ? "default" : "ghost"}
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setViewMode("compact")}
                            >
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
                                    className="h-4 w-4"
                                >
                                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                                    <line x1="3" x2="21" y1="9" y2="9"/>
                                    <line x1="3" x2="21" y1="15" y2="15"/>
                                    <line x1="9" x2="9" y1="3" y2="21"/>
                                    <line x1="15" x2="15" y1="3" y2="21"/>
                                </svg>
                                <span className="sr-only">Compact view</span>
                            </Button>
                            <Button
                                variant={viewMode === "list" ? "default" : "ghost"}
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setViewMode("list")}
                            >
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
                                    className="h-4 w-4"
                                >
                                    <line x1="8" x2="21" y1="6" y2="6"/>
                                    <line x1="8" x2="21" y1="12" y2="12"/>
                                    <line x1="8" x2="21" y1="18" y2="18"/>
                                    <line x1="3" x2="3.01" y1="6" y2="6"/>
                                    <line x1="3" x2="3.01" y1="12" y2="12"/>
                                    <line x1="3" x2="3.01" y1="18" y2="18"/>
                                </svg>
                                <span className="sr-only">List view</span>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
                    <div className="hidden md:block">
                        <div className="space-y-6">
                            <CategoryList setCategories={setSelectedCategory}
                                          selectedCategory={selectedCategory}
                                          clearButtonEnabled={true}/>
                            <Separator/>
                            <PriceRange selectedPriceRange={selectedPriceRange}
                                        setSelectedPriceRange={(range) => setSelectedPriceRange(range)}
                                        setMobileFiltersOpen={setMobileFiltersOpen
                                        }/>
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <ProductList viewMode={viewMode}/>
                        {/*<div className="mt-8 flex justify-center">*/}
                        {/*    <Button variant="outline">Show more</Button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </section>

            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6 space-y-6 p-4">
                        <CategoryList setCategories={setSelectedCategory} selectedCategory={selectedCategory}/>
                        <Separator/>
                    </div>
                    <div className="flex justify-end gap-2 px-2">
                        <Button variant="outline" onClick={() => setMobileFiltersOpen(false)}>
                            Close
                        </Button>
                        {
                            selectedCategory &&
                            <Button variant={"destructive"} onClick={() => {
                                setMobileFiltersOpen(false);
                                setSelectedCategory(null);
                            }}>Clear</Button>
                        }

                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}

