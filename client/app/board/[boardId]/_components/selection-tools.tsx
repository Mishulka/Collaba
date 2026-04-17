"use client"

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { useSelf } from "@/liveblocks.config";
import { Camera, Color } from "@/types/canvas";
import { memo } from "react";
import { ColorPicker } from "./color-picker";
import { useMutation } from "@liveblocks/react";
import { useDeleteLayer } from "@/hooks/use-delete-layer";
import { Hint } from "@/components/ui/hint";
import { Button } from "@/components/ui/button";
import { Trash2} from 'lucide-react';
import { BringToFront } from "lucide-react";
import { SendToBack } from "lucide-react";

interface selectionToolsTypes {
    camera: Camera;
    setLastUsedColor: ( color: Color ) => void;
}


export const SelectionTools = memo(({
    camera,
    setLastUsedColor,
}: selectionToolsTypes) => {

    

    const selection = useSelf((me) => me.presence.selection)

    const bringToFront = useMutation(({ storage }) => {
    const liveLayerIds = storage.get("layerIds"); 
    const indices: number[] = [];

    const arr = liveLayerIds.toArray();

    for (let i = 0; i < arr.length; i++) {
        if (selection?.includes(arr[i])) {
            indices.push(i);
        }
    }

    for (let i = 0; i < indices.length; i++) {
        liveLayerIds.move(indices[i], liveLayerIds.length - 1);
    }
    }, [selection]);

    const sendToBack = useMutation(({ storage }) => {
        const liveLayerIds = storage.get("layerIds"); 
        const indices: number[] = [];

        const arr = liveLayerIds.toArray();

        for (let i = 0; i < arr.length; i++) {
            if (selection?.includes(arr[i])) {
                indices.push(i);
            }
        }

        for (let i = 0; i < indices.length; i++) {
            liveLayerIds.move(indices[i], i);
        }
    }, [selection]);
    

    const setFillColor = useMutation((
        { storage, },
    fill: Color
    ) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        if (!selection) {
            return null;
        }

        selection.forEach((id) => {
            liveLayers.get(id)?.set("fill", fill);
        })
    }, [selection, setLastUsedColor]);

    const deleteLayer = useDeleteLayer();

    const selectionBounds = useSelectionBounds() as any;

    if (!selectionBounds) {
        return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.height / 2 + selectionBounds.y + camera.y;

    

    return (
        <div
            className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
            style={{
                transform: `translate(
                calc(${x}px - 50%),
                calc(${y - 60}px - 130%)
            )`
            }}
        
        >
            <ColorPicker
                onChange={setFillColor} 
            />
            <div className="flex flex-col items-center gap-y-0.5 mx-2">
                <Hint label="Bring to front">
                    <Button
                        variant="board"
                        size="icon"
                        onClick={bringToFront}
                    >
                        <BringToFront />
                    </Button>
                </Hint>
                <Hint label="Send to back">
                    <Button
                        variant="board"
                        size="icon"
                        onClick={sendToBack}
                    >
                        <SendToBack />
                    </Button>
                </Hint>
            </div>
            <div
                className="flex items-center p-2 rounded-md border border-neutral-300"
            >
                <Hint label="Delete">
                    <Button
                        onClick={deleteLayer}
                    >
                        <Trash2/>
                    </Button>
                </Hint>
            </div>
        </div>
    )
})

SelectionTools.displayName = "SelectionTools";