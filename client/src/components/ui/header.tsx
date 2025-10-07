import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <nav className="h-14 bg-white border-b border-gray-200 flex items-center px-6">
      <div className="flex items-center justify-center w-full">
        <div className="relative">
          <Input 
            type="text" 
            placeholder="Поиск..."
            className="w-80 pl-4 pr-10"
          />
          <svg className="w-4 h-4 absolute right-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </nav>
  );
}