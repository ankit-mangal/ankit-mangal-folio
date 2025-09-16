// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";
// import type { Question, QuestionDetail, QuestionMeta } from "@/types/machineCoding";

// const contentDir = path.join(process.cwd(), "content/machine-coding");

// export function getAllQuestions(): Question[] {
//   const files = fs.readdirSync(contentDir);
//   return files.map((filename) => {
//     const slug = filename.replace(/\.mdx$/, "");
//     const fileContent = fs.readFileSync(path.join(contentDir, filename), "utf-8");
//     const { data } = matter(fileContent);
//     return { slug, ...(data as QuestionMeta) };
//   });
// }

// export function getQuestionBySlug(slug: string): QuestionDetail {
//   const filePath = path.join(contentDir, `${slug}.mdx`);
//   const fileContent = fs.readFileSync(filePath, "utf-8");
//   const { data, content } = matter(fileContent);

//   return {
//     slug, // ✅ include slug for consistency
//     data: data as QuestionMeta,
//     content,
//   };
// }

import { serialize } from "next-mdx-remote/serialize";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Question, QuestionDetail, QuestionMeta } from "@/types/machineCoding";

const contentDir = path.join(process.cwd(), "content/machine-coding");

export function getAllQuestions(): Question[] {
  const files = fs.readdirSync(contentDir);
  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const fileContent = fs.readFileSync(path.join(contentDir, filename), "utf-8");
    const { data } = matter(fileContent);
    return { slug, ...(data as QuestionMeta) };
  });
}

export async function getQuestionBySlug(slug: string): Promise<QuestionDetail> {
  const filePath = path.join(contentDir, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const mdxSource = await serialize(content);

  return {
    slug,
    data: data as QuestionMeta,
    content: mdxSource, // serialized
  };
}
