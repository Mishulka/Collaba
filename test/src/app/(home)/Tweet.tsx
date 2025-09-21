import type { ITweet } from "../shared/types/tweet.interface";

interface Props {
    tweet: ITweet
}

export default async function Tweet({tweet}: Props) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const isJapanese = /[\u3040-\u30ff\u4e00-\u9faf]/.test(tweet.text);

    return <div className="border p-4 rounded-lg mb-4 border-zinc-900">
        <p lang={isJapanese ? "ja" : "en"} className="text-lg">{tweet.text}</p>
        <span className="text-lg">@{tweet.author}</span>
    </div>;
}