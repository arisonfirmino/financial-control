import { Prisma } from "@prisma/client";
import Balance from "./balance";
import BankList from "./bank/bank-list";
import AddBank from "./bank/add-bank";
import TransactionForm from "./transaction-form";

interface DataListProps {
  user: Prisma.UserGetPayload<{
    include: {
      banks: {
        include: {
          incomes: true;
          expenses: true;
        };
      };
      incomes: true;
      expenses: true;
    };
  }>;
  showAddBank: boolean;
  setShowAddBank: (value: boolean) => void;
  showTransactionForm: boolean;
  setShowTransactionForm: (value: boolean) => void;
}

export default function DataList({
  user,
  showAddBank,
  setShowAddBank,
  showTransactionForm,
  setShowTransactionForm,
}: DataListProps) {
  const total_value =
    user.banks.reduce((acc, bank) => {
      return acc + Number(bank.current_value);
    }, 0) || 0;

  return (
    <div className="h-fit space-y-5">
      <h2 className="text-base">
        Olá, <span className="font-semibold">{user.name}</span>
      </h2>

      <Balance total_value={total_value} />

      <BankList
        banks={user.banks}
        showAddBank={showAddBank}
        setShowAddBank={setShowAddBank}
      />

      {showAddBank && (
        <div className="space-y-2.5">
          <h3 className="text-base font-medium uppercase">
            Adicionar novo banco
          </h3>

          <AddBank />
        </div>
      )}

      {showTransactionForm && (
        <div className="space-y-2.5">
          <h3 className="text-base font-medium uppercase">
            Adicionar nova transação
          </h3>

          <TransactionForm banks={user.banks} />
        </div>
      )}
    </div>
  );
}
