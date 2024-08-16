import { ArrowUpIcon } from "lucide-react";

export default function IncomeButton({
  setShowIncomeForm,
}: {
  setShowIncomeForm: (value: boolean) => void;
}) {
  return (
    <button
      onClick={() => setShowIncomeForm(true)}
      className="flex items-center gap-2.5 text-nowrap rounded-lg border border-solid border-primary px-2.5 py-2 text-base uppercase active:border-gray-400"
    >
      <ArrowUpIcon size={16} />
      Nova receita
    </button>
  );
}
