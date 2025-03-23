import {useQuery} from "@tanstack/react-query";
import {ProductModel} from "@/src/models/product";

async function getProduct(id: number): Promise<ProductModel> {
    return fetch(
        `https://fakestoreapi.com/products/${id}`)
        .then((response) => response.json());
}

function useLoadProduct(id: number) {

    const {data, isLoading, error} = useQuery<ProductModel | undefined>({
        queryFn: async () => await getProduct(id),
        queryKey: ["products", id],
        retry: 3,
    });

    return {data, isLoading, error};
}

export default useLoadProduct;