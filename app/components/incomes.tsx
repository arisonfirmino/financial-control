import { Income } from "./app";
import Card from "./card";

export default function Incomes({ incomes }: { incomes: Income[] }) {
  return (
    <section className="flex h-fit min-w-full flex-col gap-5 rounded bg-white bg-opacity-5 p-2.5 md:w-full md:min-w-0">
      <h3 className="flex items-center gap-2.5 text-lg font-medium uppercase">
        Receitas
        <hr className="w-full border-primary" />
      </h3>

      <div className="flex flex-col gap-2.5">
        {incomes.map((income) => (
          <Card
            key={income.id}
            id={income.id}
            name={income.name}
            value={income.value}
            created_at={income.created_at}
            bank={income.bank.name}
          />
        ))}
      </div>
    </section>
  );
}
