import Image from 'next/image';
import { CreateOrganization } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
export const EmptyOrg = () => {
    return (
        <div className="h-full flex flex-col items-center
        justify-center">
            <Image 
                src="/rings_side.png" 
                width={300}
                height={300}
                alt="Empty Organization" 
            />
            <h2 className="text-3xl font-bold mt-6 mb-4">
                Welcome to Board
            </h2>
            <p className="text-muted-foreground font-semibold
            text-sm">
                Create new Organization to get started
            </p>
            <div className="mt-6">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="lg">
                            Create organization
                        </Button>
                    </DialogTrigger>
                    <DialogContent classname>
                        <CreateOrganization />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}