export function ChatsSidebar() {
  return (
    <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-14 p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold">Чаты</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">

            <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                А
                </div>
                <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                    <span className="font-medium">Алексей</span>
                    <span className="text-xs text-gray-500">13:06</span>
                </div>
                <p className="text-sm text-gray-600 truncate mt-1">Как дела?</p>
                </div>
            </div>
            </div>

            <div className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                М
                </div>
                <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                    <span className="font-medium">Мария</span>
                    <span className="text-xs text-gray-500">11:45</span>
                </div>
                <p className="text-sm text-gray-600 truncate mt-1">Встречаемся в 10:00 в офисе на улица Парковая д</p>
                </div>
            </div>
            </div>
        </div>
    </aside>
  );
}