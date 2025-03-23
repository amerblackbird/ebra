import {useQuery} from "@tanstack/react-query";

async function getCategories() {
    return fetch(
        "https://fakestoreapi.com/products/categories")
        .then((response) => response.json())
        .catch((err) => console.error(err));
}

function useLoadCategories() {
    const {data, isLoading, error} = useQuery<string[]>({
        queryFn: async () => await getCategories(),
        queryKey: ["categories"],
        retry: 3,
    });

    return {data, isLoading, error};
}

export default useLoadCategories;