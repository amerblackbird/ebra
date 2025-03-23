import Image from "next/image";
import React from "react";

export default function NotFound() {
    return (
        <div className={"container mx-auto"}>
            <div className={'flex flex-col items-center justify-center h-screen'}>
                <Image src="/images/404.svg" alt="Error" width={"400"} height={"400"}/>
                <h1 className={"text-lg font-bold"}>Ops Error</h1>
                <p>Page not found</p>
            </div>
        </div>
    )
}