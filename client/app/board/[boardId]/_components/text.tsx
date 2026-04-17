import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

import { cn, colorToCss } from "@/lib/utils";
import { TextLayer } from "@/types/canvas";
import { useMutation } from "@liveblocks/react";

const kalam = Kalam({
    subsets: ["latin"],
    weight: "400",
});

const calculateFontSize = (height: number, width: number) => {
    const maxFontSize = 100;
    const minFontSize = 10;
    const scale = 0.5

    let fontSize = Math.min(width, height) * scale;

    if (fontSize > maxFontSize) {
        fontSize = maxFontSize;
    } else if (fontSize < minFontSize) {
        fontSize = minFontSize;
    }
    return fontSize;
}

interface TextProps {
    id: string;
    layer: TextLayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    onChange?: (e: ContentEditableEvent, id: string) => void;
    selectionColor?: string;
};

export const Text = ({
    id,
    layer,
    onPointerDown,
    onChange,
    selectionColor,
}: TextProps) => {
    const { x, y, width, height, fill, value} = layer;

    const updateValue = useMutation((
        { storage },
        newValue: string,
    ) => {
        const liveLayers = storage.get("layers");

        liveLayers.get(id)?.set("value", newValue);

    }, []);

    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value);
    }

    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={(e: React.PointerEvent) => onPointerDown(e, id)}
            style={{
                outline: selectionColor ? `1px solid ${selectionColor}` : "none",
                overflow: "visible",
                pointerEvents: "all",
            }}
        >
            <ContentEditable
                html={value || "Text"}
                onChange={handleContentChange}
                className={cn(
                    "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none"
                )}
                style={{
                    fontSize: calculateFontSize(height, width),
                    color: fill ? colorToCss(fill) : "#000",
                    fontFamily: kalam.style.fontFamily,
                }}
            />
                
        </foreignObject>
    )
}


