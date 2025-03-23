import React from 'react';
import {Skeleton} from "@/src/components/ui/skeleton";

interface IProps {
    viewMode: "grid" | "compact" | "list";
}

function ProductListPlaceholder({viewMode}: IProps) {
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
            <Skeleton className="h-[360px] rounded-xl"/>
            <Skeleton className="h-[360px] rounded-xl"/>
            <Skeleton className="h-[360px] rounded-xl"/>
            <Skeleton className="h-[360px] rounded-xl"/>
            <Skeleton className="h-[360px] rounded-xl"/>
            <Skeleton className="h-[360px] rounded-xl"/>
            <Skeleton className="h-[360px] rounded-xl"/>
            <Skeleton className="h-[360px] rounded-xl"/>
            <Skeleton className="h-[360px] rounded-xl"/>
            <Skeleton className="h-[360px] rounded-xl"/>
            <Skeleton className="h-[360px] rounded-xl"/>
        </div>
    );
}

export default ProductListPlaceholder;