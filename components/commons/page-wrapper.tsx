"use client"

import { ReactNode } from "react";

interface PageWrapperProps {
    children: ReactNode;
}
export function PageWrapper({ children }: PageWrapperProps) {
    return (
        <div className="flex flex-col m-0">
            <div className="flex-1 p-8 space-y-6 container mx-auto  min-h-0 m-0">
                {children}
            </div>
        </div>
    )
}

