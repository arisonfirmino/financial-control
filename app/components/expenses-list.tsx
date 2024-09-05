import { Bank, Expense } from "@prisma/client";
import TransactionItem from "./transaction/transaction-item";
import { deleteExpense } from "../actions/expense";

interface ExpensesListProps {
  expenses: (Expense & { bank: Bank })[];
}

export default function ExpensesList({ expenses }: ExpensesListProps) {
  return (
    <div className="min-w-full space-y-2.5">
      <h3 className="text-base font-semibold uppercase">Central de gastos</h3>

      {expenses.map((expense) => (
        <TransactionItem
          key={expense.id}
          transaction={expense}
          handleDelete={() => deleteExpense({ id: expense.id })}
        />
      ))}
    </div>
  );
}
