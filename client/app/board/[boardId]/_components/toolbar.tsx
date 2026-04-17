import { 
    Circle,
    MousePointer2, 
    Pen, 
    Redo, 
    Square, 
    StickyNote, 
    Type, 
    Undo } from "lucide-react"
import { ToolButton } from "./tool-button";

import { CanvasMode, CanvasState } from "@/types/canvas";
import { LayerType } from '../../../../types/canvas';

interface ToolbarProps {
    canvasState: CanvasState;
    setCanvasState: (newState: CanvasState) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
};

export const Toolbar = ({
    canvasState, 
    setCanvasState,
    undo,
    redo,
    canRedo,
    canUndo,
}:ToolbarProps) => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%]
        left-2 flex flex-col gap-y-4">
            <div className="bg-white rounded-md flex gap-y-1
            flex-col items-center shadow-md p-2">
               <ToolButton 
                label="Select"
                icon={MousePointer2}
                onClick={() => setCanvasState({ mode: CanvasMode.None })}
                isActive={
                    canvasState.mode === CanvasMode.None ||
                    canvasState.mode === CanvasMode.Translating ||
                    canvasState.mode === CanvasMode.SelectionNet ||
                    canvasState.mode === CanvasMode.Pressing ||
                    canvasState.mode === CanvasMode.Resizing 
                }
               />
               <ToolButton 
                label="Text"
                icon={Type}
                onClick={() => setCanvasState({ 
                    mode: CanvasMode.Inserting,
                    layerType: LayerType.Text,
                })}
                isActive={
                    canvasState.mode === CanvasMode.Inserting &&
                    canvasState.layerType === LayerType.Text
                }
               />
               <ToolButton 
                label="Sticky note"
                icon={StickyNote}
                onClick={() => setCanvasState({ 
                    mode: CanvasMode.Inserting,
                    layerType: LayerType.Note,
                })}
                isActive={
                    canvasState.mode === CanvasMode.Inserting &&
                    canvasState.layerType === LayerType.Note
                }
               />
               <ToolButton 
                label="Rectangle"
                icon={Square}
                onClick={() => setCanvasState({ 
                    mode: CanvasMode.Inserting,
                    layerType: LayerType.Rectangle,
                })}
                isActive={
                    canvasState.mode === CanvasMode.Inserting &&
                    canvasState.layerType === LayerType.Rectangle
                }
               />
               <ToolButton 
                label="Ellipse"
                icon={Circle}
                onClick={() => setCanvasState({ 
                    mode: CanvasMode.Inserting,
                    layerType: LayerType.Ellipse,
                })}
                isActive={
                    canvasState.mode === CanvasMode.Inserting &&
                    canvasState.layerType === LayerType.Ellipse
                }
               />
               <ToolButton 
                label="Pen"
                icon={Pen}
                onClick={() => setCanvasState({ 
                    mode: CanvasMode.Pencil,
                })}
                isActive={
                    canvasState.mode === CanvasMode.Pencil
                }
               />
            </div>
            <div className="bg-white rounded-md flex gap-y-1
            flex-col items-center shadow-md p-2">
                <ToolButton 
                label="Undo"
                icon={Undo}
                onClick={undo}
                isActive={canUndo}
               />
                <ToolButton 
                label="Redo"
                icon={Redo}
                onClick={redo}
                isActive={canRedo}
               />
            </div>
        </div>
    )
};
