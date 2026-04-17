"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { useRenameModal } from "@/store/use-rename-modal";
import { Actions } from "@/components/actions";
import { Menu } from "lucide-react";

interface InfoProps {
    boardId: string
};

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
})

const TabSeparator = () => {
    return (
        <div className="text-neutral-300 px-1">
            |
        </div>
    );
};

export const Info = ({
    boardId,
}: InfoProps) => {
    const { onOpen } = useRenameModal();

    const data = useQuery(api.board.get, {
        id: boardId as Id<"boards">,
    });

    if (!data) return <InfoSkeleton />


    return (
        <div className="absolute top-2 left-2 bg-white px-2
        rounded-md h-12 flex items-center shadow-md">
            <Link className="pt-1" href="/">
                <Hint label="To home page">
                    <Button className="px-2" variant="board">
                        <Image 
                            src="/logo.svg"
                            alt="logo"
                            height={40}
                            width={40}
                        />
                        <span className={cn(font.className)}>
                            Board
                        </span>
                    </Button>
                </Hint>
            </Link>
            <TabSeparator />
            <Hint label="Rename board">
                <Button
                    variant="board"
                    className="text-base px-2"
                    onClick={() => onOpen(data?._id, data.title)}
                >
                    {data.title}
                </Button>
            </Hint>
            <TabSeparator/>
            <Actions
                id={data._id}
                title={data.title}
                side="bottom"
                sideOffset={10}
            >
                <div>
                    <Hint label="main menu" side="bottom" sideOffset={10}>
                        <Button variant="board">
                            <Menu />
                        </Button>
                    </Hint>
                </div>
            </Actions>
        </div>
    );
};

export const InfoSkeleton = () => {
    return (
        <div className="absolute top-2 left-2 bg-white px-1.5
        rounded-md h-12 flex items-center shadow-md w-[300px]"
        >
            <Skeleton className="h-full w-full bg-muted-400"/>
        </div>
    )
}