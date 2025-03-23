import React, {JSX} from 'react';
import {Checkbox} from "@/components/ui/checkbox";
import useLoadCategories from "@/components/categories/hooks/use-load-categories";
import {Button} from "@/components/ui/button";
import DataLoader from "@/components/data/data-loader";
import CategoryListPlaceholder from "@/components/categories/category-list-placeholder";
import ErrorDataLoader from "@/components/data/error-data-loader";

interface IProps {
    selectedCategory?: string | null;
    setCategories: (categories: string | null) => void;
    clearButtonEnabled?: boolean
}

function CategoryList({selectedCategory, setCategories, clearButtonEnabled}: IProps): JSX.Element {

    const {data: categories, isLoading, error} = useLoadCategories();

    return (
        <div className={"space-y-4"}>
            <h3 className="mb-4 text-lg font-semibold">CATEGORIES</h3>
            <DataLoader
                data={categories}
                error={error}
                isLoading={isLoading}
                loadingBuilder={<CategoryListPlaceholder/>}
                errorBuilder={(error) => <ErrorDataLoader error={error} title={"Ops something went wrong"}/>}
                builder={(categories: string[]) => (
                    <div className={"space-y-2"}>
                        {
                            categories?.map((category) => (
                                <div key={category} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`category-${category}`}
                                        checked={category === selectedCategory}
                                        onCheckedChange={() => setCategories(category)}
                                    />
                                    <label
                                        htmlFor={`category-${category}`}
                                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {category}
                                    </label>
                                </div>
                            ))
                        }
                    </div>
                )}
            />

            <div className="space-y-4">
                {
                    selectedCategory && clearButtonEnabled ?
                        <Button onClick={() => {
                            setCategories(null)
                        }}>Clear</Button> : undefined
                }
            </div>
        </div>
    );
}

export default CategoryList;