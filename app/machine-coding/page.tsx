import { getAllQuestions } from "@/lib/machineCoding";
import MachineCodingCard from "@/components/machine-coding/MachineCodingCard";

export default function MachineCodingPage() {
  const questions = getAllQuestions();

  return (
    // <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
    //   {questions.map((q) => (
    //     <MachineCodingCard key={q.slug} question={q} />
    //   ))}
    // </div>
     // Placeholder for future implementation
    <div className="w-full h-screen flex justify-between items-center text-center text-gray-600 py-20 px-20">
      <div className="flex-1 items-center  text-5xl font-bold">Work in progress...🚧</div>
      <div className="flex-1 flex flex-col items-center">
        <img
          src="https://plus.unsplash.com/premium_vector-1682305615800-980fc9414731?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="construction"
          width={'90%'}
        />
      </div>
    </div>
  );
}
