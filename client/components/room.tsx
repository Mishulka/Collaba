"use client"

import { ReactNode, useEffect, useState } from "react";
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
}: RoomProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!roomId) {
        return <div>Error: No room ID provided</div>;
    }

    if (!isMounted) {
        return <>{fallback}</>;
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
            initialStorage={() => {
                console.log('[Room] Creating initial storage...');

                const layerIdsList = new LiveList<string>([]);
                const layersMap = new LiveMap<string, LiveObject<Layer>>();

                console.log('[Room] LiveList instance:', layerIdsList);
                console.log('[Room] LiveMap instance:', layersMap);

                const storage = {
                    layerIds: layerIdsList,
                    layers: layersMap,
                };

                console.log('[Room] Returning storage object:', storage);
                return storage;
            }}
        >
            <ClientSideSuspense fallback={fallback}>
                {() => children}
            </ClientSideSuspense>
        </RoomProvider>
    )
}