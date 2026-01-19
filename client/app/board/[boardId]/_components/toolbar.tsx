import { Redo, Undo } from "lucide-react"

export const Toolbar = () => {
    return (
        <div className="absolute top-[50%] -translate-y-[50%]
        left-2 flex flex-col gap-y-4">
            <div className="bg-white rounded-md flex gap-y-1
            flex-col items-center shadow-md p-2">
                <div>
                    Pencil
                </div>
                <div>
                    Square
                </div>
                <div>
                    Circle
                </div>
                <div>
                    Ellipsis
                </div>
            </div>
            <div className="bg-white rounded-md flex gap-y-1
            flex-col items-center shadow-md p-2">
                <div>
                    <Undo />
                </div>
                <div>
                    <Redo />
                </div>
            </div>
        </div>
    )
}