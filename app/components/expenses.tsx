import { Expense } from "./app";
import Card from "./card";

export default function Expenses({ expenses }: { expenses: Expense[] }) {
  return (
    <section className="flex h-fit min-w-full flex-col gap-5 rounded bg-white bg-opacity-5 p-2.5 md:w-full md:min-w-0">
      <h3 className="flex items-center gap-2.5 text-lg font-medium uppercase">
        Gastos
        <hr className="w-full border-primary" />
      </h3>

      <div className="flex flex-col gap-2.5">
        {expenses.map((expense) => (
          <Card
            key={expense.id}
            id={expense.id}
            name={expense.name}
            value={expense.value}
            created_at={expense.created_at}
            bank={expense.bank.name}
          />
        ))}
      </div>
    </section>
  );
}
