import Tweet from "./Tweet";

export default function Home() {
  return (
    <div className="p-4">
    <h1 className="text-2xl pb-2">Home</h1>
    <Tweet tweet={{
      author: 'user',
      text: '完璧な表示🚀'
    }} />
    </div>
    
  );
}
