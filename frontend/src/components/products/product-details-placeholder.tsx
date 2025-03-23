import React from 'react';
import {Skeleton} from "@/src/components/ui/skeleton";

function ProductDetailsPlaceholder() {
    return (
        <div className={"container"}>
            <div className="space-y-4">
                <div className="space-y-4">
                    <Skeleton className="h-8 w-1/2 rounded"/>
                    <Skeleton className="h-64 rounded"/>
                    <Skeleton className="h-4 w-3/4 rounded"/>
                    <Skeleton className="h-4 w-1/2 rounded"/>
                    <Skeleton className="h-4 w-1/4 rounded"/>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailsPlaceholder;