"use client";

import Link from "next/link";
import Image from "next/image";
import { Overlay } from "./overlay";
import { Footer } from "./footer";
import { Skeleton } from "@/components/ui/skeleton"
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";


interface BoardCardProps {
    id: string;
    title: string;
    imageUrl: string;
    authorId: string;
    authorName: string;
    createdAt: number; 
    orgId: string;
    isFavorite: boolean;
}

export const BoardCard = ({
    id,
    title,
    imageUrl,
    authorId,
    authorName,
    createdAt,
    orgId,
    isFavorite = false,
}: BoardCardProps) => {
    

    return (
        <Link href={`/board/${id}`}>
            <div className="group aspect-[100/120] border
            rounded-lg flex flex-col justify-between
            overflow-hidden">
                <div className="relative flex-1 bg-yellow-50">
                    <Image 
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                    <Overlay />
                    <Actions
                        id={id}
                        title={title}
                        side="right"
                    >
                        <button  className="absolute z-50 top-1 right-1">
                            <MoreHorizontal 
                                className="opacity-50 hover:opacity-100 
                                transition-opacity"
                            />
                        </button>
                    </Actions>
                </div>
                <div>
                        <Footer isFavorite={isFavorite}
                        title={title}
                        authorLabel={authorName}
                        createdAtLabel={createdAt}
                        onClick={() => {}}
                        disabled={false}
                        />
                    </div>
            </div>
        </Link>
    )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className="aspect-[100/120]">
            <Skeleton className="h-full w-full"/>
        </div>
    )
}