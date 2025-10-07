import { Button } from "@/components/ui/button";
import { ProjectsList } from "../widgets/projectList";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        <h1 className="text-2xl" >Создать проект</h1>
         <div className="grid grid-cols-2 gap-4 max-w-2xl mb-8">
          <Button 
            asChild 
            variant="default" 
            size="lg"
            className="bg-blue-500 hover:bg-blue-600"
          >
            <a href="/projects/editor">
              📝 Создать Markdown
            </a>
          </Button>
          
          <Button 
            asChild 
            variant="default"
            size="lg"
            className="bg-green-500 hover:bg-green-600"
          >
            <a href="/projects/board">
              📋 Создать Board
            </a>
          </Button>
        </div>
        <ProjectsList />
      </main>
    </div>
  );
}
