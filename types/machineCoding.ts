
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

// Represents the frontmatter metadata
export interface QuestionMeta {
  title: string;
  description: string;
  image: string;
  technologies: string[];
}

// Represents a complete question (metadata + slug)
export interface Question extends QuestionMeta {
  slug: string;
}

// Represents the parsed MDX file (metadata + content + slug)
export interface QuestionDetail {
  slug: string;
  data: QuestionMeta;
  content: MDXRemoteSerializeResult;
}
