import { useState } from "react";
import { Bank, Expense, Income } from "@prisma/client";
import { LandmarkIcon, LoaderCircleIcon, Trash2Icon } from "lucide-react";
import BankDetails from "./bank-details";
import { calculateTotal } from "../../helpers/calculateTotals";
import { formatValue } from "../../helpers/formatValue";
import { deleteBank } from "../../actions/bank";

interface BankItemProps {
  bank: Bank & {
    incomes: Income[];
    expenses: Expense[];
  };
}

export default function BankItem({ bank }: BankItemProps) {
  const [isLoading, setIsLoading] = useState(false);

  const total_expenses = calculateTotal(bank.expenses, (expense) =>
    Number(expense.value),
  );

  const total_incomes = calculateTotal(bank.incomes, (income) =>
    Number(income.value),
  );

  const handleDeleteBank = async () => {
    setIsLoading(true);

    try {
      await deleteBank({ id: bank.id });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative rounded border border-solid border-stroke bg-background p-1.5">
      <h3 className="flex items-center gap-1 text-sm font-semibold capitalize">
        <LandmarkIcon size={14} />
        {bank.name}
      </h3>

      <div className="flex gap-5">
        <BankDetails
          title="Valor atual"
          value={formatValue(bank.current_value)}
        />
        <BankDetails
          title="Valor inicial"
          value={formatValue(bank.initial_value)}
          className="text-end"
        />
      </div>

      <button
        onClick={handleDeleteBank}
        className="absolute right-1.5 top-1.5 text-red-600"
      >
        {isLoading ? (
          <LoaderCircleIcon size={12} className="animate-spin" />
        ) : (
          <Trash2Icon size={12} />
        )}
      </button>
    </div>
  );
}
