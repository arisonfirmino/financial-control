import { Bank, Income } from "@prisma/client";
import TransactionItem from "./transaction/transaction-item";
import { deleteIncome } from "../actions/income";

interface IncomesListProps {
  incomes: (Income & { bank: Bank })[];
}

export default function IncomesList({ incomes }: IncomesListProps) {
  return (
    <div className="min-w-full space-y-2.5">
      <h3 className="text-base font-semibold uppercase">Central de receitas</h3>

      {incomes.map((income) => (
        <TransactionItem
          key={income.id}
          transaction={income}
          handleDelete={() => deleteIncome({ id: income.id })}
        />
      ))}
    </div>
  );
}
