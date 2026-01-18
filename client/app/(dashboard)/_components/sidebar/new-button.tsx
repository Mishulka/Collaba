"use client";

import { PlusIcon } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs"

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Hint } from "@/components/ui/hint";

export const NewButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                    <Hint 
                        label="Create organization"
                        side="right"
                        align="start"
                        sideOffset={10}
                    >
                        <button className="bg-white/25 h-full w-full rounded-md 
                        flex items-center justify-center opacity-60 hover:opacity-100
                        transition">
                            <PlusIcon className="text-white" />
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent className="p-0">
                <CreateOrganization />
            </DialogContent>
        </Dialog>
    );
};