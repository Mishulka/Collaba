"use client"

import { ReactNode } from "react";
import { RoomProvider } from "@/liveblocks.config";

import { ClientSideSuspense } from "@liveblocks/react"
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";

import { Layer } from "@/types/canvas";

interface RoomProps {
    children: ReactNode
    roomId: string;
    fallback: ReactNode;
}

export const Room = ({ 
    children,
    roomId,
    fallback,
    }:RoomProps) => {
    if (!roomId) {
        return <div>Error: No room ID provided</div>;
    }
    return (
        <RoomProvider 
            id={roomId} 
            initialPresence={{
                cursor: null,
                selection: [],
                pencilDraft: null,
                penColor: null,
            }}
            initialStorage={() => ({
                layerIds: new LiveList(),
                layers: new LiveMap<string, LiveObject<Layer>>(),
            })}
        >
            <ClientSideSuspense fallback={fallback}>
                {() => children}
            </ClientSideSuspense>
        </RoomProvider>
    )
}