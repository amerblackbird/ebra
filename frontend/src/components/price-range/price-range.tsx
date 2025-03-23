import React, {JSX} from 'react';
import {Checkbox} from "@/src/components/ui/checkbox";

const priceRanges = [
    {id: "all", name: "All Price"},
    {id: "0-99", name: "$0.00 - $9.99"},
    {id: "100-199", name: "$100.00 - 199.99"},
    {id: "200-299", name: "$200.00 - 299.99"},
    {id: "300-399", name: "$300.00 - 399.99"},
    {id: "400+", name: "$400.00+"},
]

interface IProps {
    selectedPriceRange: string | null | undefined;
    setSelectedPriceRange: (range: string) => void;
    setMobileFiltersOpen: (open: boolean) => void;
}

function PriceRange({selectedPriceRange, setSelectedPriceRange, setMobileFiltersOpen}: IProps): JSX.Element {
    return (
        <div>
            <h3 className="mb-4 text-lg font-semibold">PRICE</h3>
            <div className="space-y-3">
                {priceRanges.map((range) => (
                    <div key={range.id} className="flex items-center space-x-2">
                        <Checkbox
                            id={`mobile-price-${range.id}`}
                            checked={selectedPriceRange === range.id}
                            onCheckedChange={() => {
                                setSelectedPriceRange(range.id)
                                setMobileFiltersOpen(false)
                            }}
                        />
                        <label
                            htmlFor={`mobile-price-${range.id}`}
                            className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {range.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PriceRange;