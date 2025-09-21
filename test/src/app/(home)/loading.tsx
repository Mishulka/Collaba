export default function Loading() {
  return (
    <div className="p-4">
      <h1 className="text-2xl pb-2">Home</h1>

      <div className="border p-4 rounded-lg mb-4 border-zinc-900 animate-pulse h-[170px] flex flex-col justify-between">
        <div className="space-y-2">
          <div className="h-5 bg-gray-300/70 rounded w-5/6"></div>
          <div className="h-5 bg-gray-300/70 rounded w-4/6"></div>
          <div className="h-5 bg-gray-300/70 rounded w-3/6"></div>
        </div>
        <div className="h-4 bg-gray-300/70 rounded w-24 mt-4"></div>
      </div>
    </div>
  );
}
