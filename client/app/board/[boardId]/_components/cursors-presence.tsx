"use client";

import { memo } from "react";

import { useOthersConnectionIds } from "@/liveblocks.config"
import { Cursor } from './cursor';
import { shallow, useOthersMapped } from "@liveblocks/react";
import { Path } from "./path";
import { colorToCss } from "@/lib/utils";


const Cursors = () => {
    const ids = useOthersConnectionIds();

    return (
        <>
            {ids.map((connectionId) => (
                <Cursor 
                    key={connectionId}
                    connectionId={connectionId}
                />
            ))}
        </>
    )
}

const Drafts = () => {
    const others = useOthersMapped<{ pencilDraft: Liveblocks["Presence"]["pencilDraft"]; penColor: Liveblocks["Presence"]["penColor"] }>((other) => ({
        pencilDraft: other.presence.pencilDraft,
        penColor: other.presence.penColor,
    }), shallow);
    return (
        <>
            {others.map(([key, other]) => {
                if (other.pencilDraft) {
                    return (
                        <Path 
                            key={key}
                            x={0}
                            y={0}
                            points={other.pencilDraft}
                            fill={other.penColor ? colorToCss(other.penColor) : "#000"}
                        />
                    )
                }

                return null;
            })}
        </>
    )
}

export const CursorsPresence = memo(() => {
    return (
        <>
            <Drafts />
            <Cursors />
        </>
    )
})

CursorsPresence.displayName = "CursorsPresence";