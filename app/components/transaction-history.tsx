import { Bank, Expense, Income } from "@prisma/client";
import IncomesList from "./incomes-list";
import ExpensesList from "./expenses-list";

interface TransactionHistoryProps {
  incomes: (Income & { bank: Bank })[];
  expenses: (Expense & { bank: Bank })[];
}

export default function TransactionHistory({
  incomes,
  expenses,
}: TransactionHistoryProps) {
  return (
    <div className="flex h-fit gap-5">
      <IncomesList incomes={incomes} />
      <ExpensesList expenses={expenses} />
    </div>
  );
}
