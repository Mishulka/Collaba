"use client"

import Image from "next/image";
import {
    useOrganization,
    useOrganizationList
} from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { Hint } from "@/components/ui/hint";

interface ItemProps {
    id: string;
    name: string;
    imageUrl?: string | null;
}

export const Item = ({
    id,
    name,
    imageUrl,
}: ItemProps) => {
    const { organization } = useOrganization();
    const { setActive } = useOrganizationList();

    const isActive = organization?.id === id;

    const onClick = () => {
        if (!setActive) return null;

        setActive({ organization: id });
    }

    return (
        <div className="aspect-square relative">
            <Hint
                label={name}
                side="right"
                align="start"
                sideOffset={10}
            >
                <Image
                    fill
                    src={imageUrl || "/logo.png"}
                    onClick={onClick}
                    alt={name}
                    className={cn(
                        "rounded-md cursor-pointer opacity-80 hover:opacity-100",
                        isActive && "opacity-100"
                    )}
                />
            </Hint>
        </div>
    )
}
