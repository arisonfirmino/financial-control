import axios from "axios";
import { LandmarkIcon, Trash2Icon } from "lucide-react";

interface AccountProps {
  id: string;
  name: string;
  initial_value: number;
  expenses: number;
  incomes: number;
  current_value: number;
  updateBanks: () => void;
}

export default function Account({
  id,
  name,
  initial_value,
  expenses,
  incomes,
  current_value,
  updateBanks,
}: AccountProps) {
  const formatToBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const accounts_items = [
    { title: "Valor inicial", value: formatToBRL(initial_value) },
    { title: "Gastos", value: formatToBRL(expenses) },
    { title: "Receitas", value: formatToBRL(incomes) },
    { title: "Valor atual", value: formatToBRL(current_value) },
  ];

  const handleDeleteBank = async () => {
    await axios
      .delete(`https://api-financial-control.onrender.com/bank?id=${id}`)
      .then(() => {
        updateBanks();
      });
  };

  return (
    <div className="relative flex w-full flex-col gap-5 rounded bg-white bg-opacity-5 p-2.5">
      <h3 className="flex items-center gap-1.5 text-sm font-medium capitalize">
        <LandmarkIcon size={14} className="text-primary" />
        {name}
      </h3>

      {accounts_items.map((item, index) => (
        <div key={index} className="flex items-center gap-5 text-sm">
          <h4 className="text-nowrap uppercase">{item.title}</h4>

          <hr className="w-full border border-solid border-white border-opacity-10" />

          <p className="text-nowrap font-medium">{item.value}</p>
        </div>
      ))}

      <button
        onClick={handleDeleteBank}
        className="absolute right-0 top-0 m-2 active:text-red-600"
      >
        <Trash2Icon size={14} />
      </button>
    </div>
  );
}
