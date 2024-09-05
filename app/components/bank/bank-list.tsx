import { Bank, Expense, Income } from "@prisma/client";
import BankItem from "./bank-item";
import { PlusIcon } from "lucide-react";

interface BankListProps {
  banks: (Bank & {
    incomes: Income[];
    expenses: Expense[];
  })[];
  showAddBank: boolean;
  setShowAddBank: (value: boolean) => void;
}

export default function BankList({
  banks,
  showAddBank,
  setShowAddBank,
}: BankListProps) {
  return (
    <div className="space-y-2.5">
      <h3 className="pl-5 text-base font-semibold uppercase">
        Central de bancos
      </h3>

      <div className="flex grid-cols-2 gap-5 overflow-x-auto px-5 md:grid md:pl-5 xl:pr-0 2xl:grid-cols-3 [&::-webkit-scrollbar]:hidden">
        {banks.map((bank) => (
          <BankItem key={bank.id} bank={bank} />
        ))}

        <button
          onClick={() => setShowAddBank(!showAddBank)}
          className={`hidden items-center justify-center gap-2.5 rounded border border-solid border-[#d4d4d4] py-5 text-[#d4d4d4] duration-200 hover:bg-background md:flex ${showAddBank ? "border-opacity-100 text-opacity-100" : "border-opacity-10 text-opacity-30"}`}
        >
          <PlusIcon size={16} />
          Novo
        </button>
      </div>
    </div>
  );
}
