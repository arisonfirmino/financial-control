import { Bank, Expense, Income } from "@prisma/client";
import IncomesList from "../incomes-list";
import ExpensesList from "../expenses-list";

interface TransactionHistoryProps {
  incomes: (Income & { bank: Bank })[];
  expenses: (Expense & { bank: Bank })[];
}

export default function TransactionHistory({
  incomes,
  expenses,
}: TransactionHistoryProps) {
  return (
    <div className="flex h-fit grid-cols-2 gap-5 overflow-x-auto px-5 md:grid xl:pl-0 xl:pt-5 [&::-webkit-scrollbar]:hidden">
      <IncomesList incomes={incomes} />
      <ExpensesList expenses={expenses} />
    </div>
  );
}
