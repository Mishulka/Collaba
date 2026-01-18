"useClient"

import Image from 'next/image';
import { Button } from '@/components/ui/button';

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization } from '@clerk/nextjs';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { toast } from 'sonner';

export const EmptyBoards = () => {
    const { organization } = useOrganization();
    const { mutate, pending } = useApiMutation(api.board.create);

    const onClick = () => {
        if (!organization) return;
        mutate({
            orgId: organization.id,
            title: "Untitled",
        })
        .then((id) => {
            toast.success("Board created");
            // TODO: Redirect to board
        })
        .catch(() => toast.error("Something went wrong"))
    }

    return (
        <div className="h-full flex flex-col items-center
        justify-center">
            <Image 
                src="/plus_side.png"
                width={150}
                height={100}
                alt="Empty search"
            />
            <h2 className="text-2xl font-bold mt-6">
                Create your first board
            </h2>
            <p className="text-muted-foreground text-sm font-semibold mt-6">
                Start creating for your organization
            </p>
            <div className="mt-6">
                <Button disabled={pending} onClick={onClick} size="lg">
                    Create board
                </Button>
            </div>
        </div>
    );
}