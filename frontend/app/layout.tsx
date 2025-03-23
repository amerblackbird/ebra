import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {NuqsAdapter} from 'nuqs/adapters/next/app'
import "./globals.css";
import ReactQueryProvider from "@/components/react-query-provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Ebra",
    description: "Ebra is a modern e-commerce platform.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <ReactQueryProvider>
            <NuqsAdapter>
                {children}
            </NuqsAdapter>
        </ReactQueryProvider>

        </body>
        </html>
    );
}
