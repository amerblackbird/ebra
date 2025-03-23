import React, {useCallback} from 'react';
import Image from 'next/image';
import {handleError} from "@/lib/error";
import {cn} from "@/lib/utils";

interface IProp extends React.HTMLAttributes<HTMLDivElement> {
    error: any // eslint-disable-line
    title: string;
}

function ErrorDataLoader({title, error, className, ...props}: IProp) {
    const getMessage = useCallback(() => {
        return handleError(error);
    }, [error]);
    return (
        <div className={cn('text-center', className)}  {...props} >
            <Image src="/images/errors.svg" alt="Error" width={"200"} height={"200"}/>
            <h1 className={"text-lg font-bold"}>{title}</h1>
            <p >{getMessage()}</p>
        </div>
    );
}

export default ErrorDataLoader;