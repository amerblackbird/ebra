import React, {ReactNode} from 'react';

interface DataLoaderProps<T> {
    error: any;// eslint-disable-line
    isLoading: boolean;
    data: T | null | undefined;
    builder: (data: T) => ReactNode;
    loadingBuilder?: ReactNode;
    errorBuilder?: (error: any) => ReactNode; // eslint-disable-line
}

function DataLoader<T>({
                           error,
                           isLoading,
                           data,
                           builder,
                           loadingBuilder,
                           errorBuilder
                       }: DataLoaderProps<T>): ReactNode {

    if (isLoading) {
        return loadingBuilder ? loadingBuilder : <div>Loading...</div>;
    }

    if (error) {
        return errorBuilder ? errorBuilder(error) : <div>Error: {error.message}</div>;
    }

    if (data) {
        return builder(data);
    }

    return <div>Loading...</div>;
}

export default DataLoader;