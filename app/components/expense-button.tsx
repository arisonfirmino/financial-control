import { ArrowDownIcon } from "lucide-react";

export default function ExpenseButton({
  setShowExpenseForm,
}: {
  setShowExpenseForm: (value: boolean) => void;
}) {
  return (
    <button
      onClick={() => setShowExpenseForm(true)}
      className="flex items-center gap-2.5 text-nowrap rounded-lg border border-solid border-primary px-2.5 py-2 text-base uppercase active:border-gray-400"
    >
      <ArrowDownIcon size={16} />
      Novo gasto
    </button>
  );
}
