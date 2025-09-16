// import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
// import { MDXProvider } from "@mdx-js/react";
// import { Code } from "bright";

// const components = {
//   h1: (props: any) => <h1 className="text-3xl font-bold my-6" {...props} />,
//   h2: (props: any) => <h2 className="text-2xl font-semibold my-4" {...props} />,
//   p: (props: any) => <p className="my-2 leading-relaxed text-gray-200" {...props} />,
//   code: (props: any) => <Code {...props} />,
//   pre: (props: any) => (
//     <div className="my-4">
//       <pre {...props} />
//     </div>
//   ),
// };

// export default function MDXRenderer({ source }: { source: MDXRemoteSerializeResult }) {
//   return (
//     <MDXProvider components={components}>
//       <MDXRemote {...source} components={components} />
//     </MDXProvider>
//   );
// }


"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const components = {
  code({ className, children, ...props }: any) {
    const match = /language-(\w+)/.exec(className || "");
    return (
      <SyntaxHighlighter
        style={oneDark}
        language={match ? match[1] : undefined}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  },
};

export default function MDXRenderer({ source }: { source: MDXRemoteSerializeResult }) {
  return <MDXRemote {...source} components={components} />;
}
