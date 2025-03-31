"use client"
import { Card, CardBody, CardHeader } from "@heroui/react";
import { ReactNode } from "react";

interface Props {
    title: string;
    nombreCommande?: string;
    status?: string;
    icon?: ReactNode;
    titleClassName?: string;
}

export function NextUICard(props: Props) {
    return (
        <Card className="py-1 w-full cursor-pointer">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className={props.titleClassName}>{props.title}</p>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <div className="flex gap-2 mt-3">
                    <span className="text-4xl text-gray-500 items-center font-bold">{props.nombreCommande}</span>
                    <span className="pt-5 text-gray-500">{props.status}</span>
                </div>
                <div className="flex justify-end">
                    {props.icon}
                </div>
            </CardBody>
        </Card>
    );
}
