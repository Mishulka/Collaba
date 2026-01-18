import Image from 'next/image';
import { Button } from '@/components/ui/button';

export const EmptyBoards = () => {
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
                <Button size="">
                    Create board
                </Button>
            </div>
        </div>
    );
}