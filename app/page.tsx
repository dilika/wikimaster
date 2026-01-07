import {WikiCard} from "@/components/wiki-card";
import {getArticles} from "@/lib/data/article";

export default function Home() {
    const articles = getArticles();
    return (
        <div>
            <div>
                <main className="max-w-2xl mx-auto mt-10 flex flex-col gap-6">
                    {articles.map(({title, id, createdAt, content, author}) => (
                        <WikiCard
                            key={id}
                            title={title}
                            date={createdAt}
                            href={`/wiki/${id}`}
                            author={author ? author : "Unknown"}
                            summary={content.substring(0, 200)}
                        />
                    ))}
                </main>
            </div>
        </div>
    );
}
