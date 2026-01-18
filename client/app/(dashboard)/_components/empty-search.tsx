import Image from 'next/image';

export const EmptySearch = () => {
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
                No results found
            </h2>
            <p className="text-muted-foreground text-sm font-semibold mt-6">
                Try searching for something else
            </p>
        </div>
    );
}