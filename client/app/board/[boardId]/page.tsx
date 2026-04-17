import { Canvas } from "./_components/canvas";
import { Room } from '@/components/room'
import { Loading } from "./_components/loading";

export const dynamic = "force-dynamic"; 

interface BoardIdPageProps {
    params: Promise<{ boardId: string }>; 
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => { 
    const { boardId } = await params; 
    if (!boardId) {
        return <div>Loading board...</div>;
    }
    
    return (
        <Room roomId={boardId} fallback={<Loading />}>
            <Canvas boardId={boardId}/>
        </Room>
    );
};

export default BoardIdPage;