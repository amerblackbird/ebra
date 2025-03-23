import React from 'react';
import {Skeleton} from "@/components/ui/skeleton";

function CategoryListPlaceholder() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[24px] w-[250px] rounded-xl"/>
            <Skeleton className="h-[24px] w-[250px] rounded-xl"/>
            <Skeleton className="h-[24px] w-[250px] rounded-xl"/>
            <Skeleton className="h-[24px] w-[250px] rounded-xl"/>
            <Skeleton className="h-[24px] w-[250px] rounded-xl"/>
        </div>
    );
}

export default CategoryListPlaceholder;