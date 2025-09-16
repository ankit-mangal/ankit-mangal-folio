import { getQuestionBySlug } from "@/lib/machineCoding";
import MDXRenderer from "@/components/machine-coding/MDXRenderer";
import Link from "next/link";

export default async function QuestionPage({ params }: { params: { slug: string } }) {
  const { content, data } = await getQuestionBySlug(params.slug);

  return (
    <article className="prose prose-invert max-w-3xl mx-auto py-12">
      <h1>{data.title}</h1>
      <p className="text-lg text-gray-300">{data.description}</p>
      <MDXRenderer source={content} />
      <Link
        href={`/machine-coding/${params.slug}/live`}
        className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Try Live →
      </Link>
    </article>
  );
}
