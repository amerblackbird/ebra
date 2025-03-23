import {useQuery} from "@tanstack/react-query";
import {useQueryState} from "nuqs";
import {ProductModel} from "@/src/models/product";

async function getProducts(category?: string | null) {
    return fetch(
        `https://fakestoreapi.com/products${category ? `/category/${category}` : ""}`)
        .then((response) => response.json())
        .catch((err) => console.error(err));
}

function useLoadProducts() {
    const [category] = useQueryState('category')

    const {data, isLoading, error} = useQuery<ProductModel[]>({
        queryFn: async () => await getProducts(category),
        queryKey: ["products", category],
        retry: 3,
    });

    return {data, isLoading, error};
}

export default useLoadProducts;