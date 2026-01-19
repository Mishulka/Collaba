"use client";

import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface NewBoardButtonProps {
    orgId: string;
    disabled?: boolean;
};

export const NewBoardButton = ({
    orgId,
    disabled,
}: NewBoardButtonProps) => {
    const router = useRouter();

    const { mutate, pending } = useApiMutation(api.board.create);

    const onClick = () => {
        mutate({
            orgId,
            title: "Untitled"
        })
        .then((id) => {
            toast.success("Board created successfully");
            router.push(`/board/${id}`);
        })
        .catch(() => {
            toast.error("Failed to create");
        })
    }

    return (
        <button 
            disabled={pending || disabled}
            onClick={onClick}
            className={cn(
                "col-span-1 aspect-[100/120] bg-blue-600 rounded-lg text-white hover:bg-blue-800 flex flex-col items-center justify-center py-6",
                (pending || disabled) && "opacity-75 cursor-not-allowed"
            )}
        >
            <div />
            <Plus className="h-12 w-12 stroke-1" />
            <p className="text-sm">
                New board
            </p>
        </button>
    );
};