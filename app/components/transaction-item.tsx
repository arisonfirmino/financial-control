import { LandmarkIcon, Trash2Icon } from "lucide-react";
import { formatDate } from "../helpers/date";
import { formatValue } from "../helpers/formatValue";
import { Bank, Expense, Income } from "@prisma/client";

interface TransactionItemProps {
  transaction: (Income & { bank: Bank }) | (Expense & { bank: Bank });
  handleDelete: () => Promise<void>;
}

export default function TransactionItem({
  transaction,
  handleDelete,
}: TransactionItemProps) {
  const handleDeleteTransiction = async () => {
    await handleDelete();
  };

  return (
    <div className="relative space-y-1 rounded border border-solid border-stroke bg-background p-1.5">
      <h3 className="flex items-center gap-1 text-sm">
        <LandmarkIcon size={14} />
        {transaction.bank.name}
      </h3>

      <p className="text-xs">{transaction.name}</p>

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">
          {formatValue(transaction.value)}
        </p>

        <p className="text-xs">{formatDate(transaction.created_at)}</p>
      </div>

      <button
        onClick={handleDeleteTransiction}
        className="absolute right-1 top-0 text-red-600"
      >
        <Trash2Icon size={12} />
      </button>
    </div>
  );
}
