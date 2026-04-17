"use client"

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
    onChange: (color: Color) => void;
};

export const ColorPicker = ({
    onChange,
}: ColorPickerProps) => {
    return (
        <div
            className="flex flex-wrap gap-2 items-center max-w-[164px]
            pr-2 mr-2 border-r border-neutral-200"
        >
            <ColorButton color={{ r: 255, g: 0, b: 0 }} onClick={onChange} />
            <ColorButton color={{ r: 0, g: 255, b: 0 }} onClick={onChange} />
            <ColorButton color={{ r: 0, g: 0, b: 255 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 255, b: 0 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 0, b: 255 }} onClick={onChange} />
            <ColorButton color={{ r: 0, g: 0, b: 0 }} onClick={onChange} />
            <ColorButton color={{ r: 125, g: 125, b: 125 }} onClick={onChange} />
            <ColorButton color={{ r: 255, g: 255, b: 255 }} onClick={onChange} />
        </div>
    )
}

interface ColorButtonProps {
    color: Color;
    onClick: (color: Color) => void;
};

const ColorButton = ({
    color,
    onClick,
}: ColorButtonProps) => {
    return (
        <button
            className="w-8 h-8 items-center flex justify-center
            hove:opacity-75 transition"
            onClick={() => onClick(color)}
        >
            <div className="h-8 w-8 rounded-md border border-neutral-300"
                style={{ background: colorToCss(color) }}
            >

            </div>
        </button>
    )
}

