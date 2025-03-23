import React, {JSX} from 'react';
import {ProductModel} from "@/src/models/product";
import useLoadProducts from "@/components/products/hooks/use-load-products";
import ProductItem from "@/components/products/product-item";
import DataLoader from "@/components/data/data-loader";
import ErrorDataLoader from "@/components/data/error-data-loader";
import ProductListPlaceholder from "@/components/products/product-list-placeholder";
import useCartStore from "@/src/stores/cart";
import {cartContains} from "@/src/models/cart";

interface IProps {
    viewMode: "grid" | "compact" | "list";
    addCart?: (product: ProductModel) => void;
}

function ProductList({viewMode}: IProps): JSX.Element {

    const {data, isLoading, error} = useLoadProducts();
    const {cart, addItem, removeItem} = useCartStore();

    return (
        <DataLoader
            data={data}
            error={error}
            isLoading={isLoading}
            loadingBuilder={<ProductListPlaceholder viewMode={viewMode}/>}
            errorBuilder={(error) => <ErrorDataLoader error={error} title={"Ops something went wrong"}/>}
            builder={(products: ProductModel[]) => {
                return (
                    <div
                        className={`grid gap-4 ${
                            viewMode === "grid"
                                ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                                : viewMode === "compact"
                                    ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                                    : "grid-cols-1"
                        }`}
                    >

                        {products.map((product) => {
                            const isInCart = cartContains(cart, product.id);
                            return (
                                <ProductItem
                                    key={product.id}
                                    product={product}
                                    toggleCart={() => {
                                        if (isInCart) {
                                            removeItem(product.id);
                                        } else {
                                            addItem(product, 1);
                                        }
                                    }}
                                    isInCart={isInCart}/>
                            );
                        })}
                    </div>
                );
            }}
        />
    );
}

export default ProductList;