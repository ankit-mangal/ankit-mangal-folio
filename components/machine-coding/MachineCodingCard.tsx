import Link from "next/link";
import { Question } from "@/types/machineCoding";

interface Props {
  question: Question;
}

export default function MachineCodingCard({ question }: Props) {
  return (
    <div className="bg-[#293241] rounded-xl border border-[#98c1d9] p-4 shadow hover:shadow-lg transition">
      <img
        src={question.image}
        alt={question.title}
        className="rounded-lg mb-4"
      />
      <h2 className="text-xl font-bold text-[#e0fbfc]">{question.title}</h2>
      <p className="text-[#e0fbfc]/80 mb-4">{question.description}</p>
      <Link
        href={`/machine-coding/${question.slug}`}
        className="inline-block px-4 py-2 bg-[#3d5a80] text-[#e0fbfc] rounded-lg hover:bg-[#98c1d9]/20"
      >
        Read More →
      </Link>
    </div>
  );
}
