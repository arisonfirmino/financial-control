import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Bank } from "./app";

export default function TotalValue({ banks }: { banks: Bank[] }) {
  const [hideValue, setHideValue] = useState(false);

  const calculateTotal = () => {
    return banks.reduce((total, bank) => {
      const value = +bank.current_value;
      return total + (isNaN(value) ? 0 : value);
    }, 0);
  };

  const formatToBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <section className="flex items-center justify-between rounded bg-white bg-opacity-5 px-5 py-2.5">
      <div>
        <p className="text-sm font-medium uppercase text-primary">
          Valor total
        </p>

        <p className="text-2xl font-bold">
          {hideValue ? "******" : formatToBRL(calculateTotal())}
        </p>
      </div>

      <button onClick={() => setHideValue(!hideValue)} className="text-primary">
        {hideValue ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
      </button>
    </section>
  );
}
