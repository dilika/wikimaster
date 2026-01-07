import { stackServerApp } from "@/stack/server";
import WikiEditor from "@/components/wiki-editor";
import { getArticleById } from "@/lib/data/article";
import { notFound } from "next/dist/client/components/not-found";

interface EditArticlePageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function EditArticlePage({
	params,
}: EditArticlePageProps) {
	const { id } = await params;
	const _user = await stackServerApp.getUser({ or: "redirect" });

	console.info(_user.id, id);

	if (_user.id !== id) {
		stackServerApp.redirectToHome();
	}

	if (id === "new") {
		return <WikiEditor isEditing={true} articleId={id} />;
	}

	const article = getArticleById(+id);
	if (!article) {
		return notFound();
	}

	return (
		<WikiEditor
			initialTitle={article.title}
			initialContent={article.content}
			isEditing={true}
			articleId={id}
		/>
	);
}
