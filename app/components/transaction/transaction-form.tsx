import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoaderCircleIcon } from "lucide-react";
import { Bank } from "@prisma/client";
import { createNewIncome } from "../../actions/income";
import { createNewExpense } from "../../actions/expense";

const schema = yup.object({
  name: yup.string().required(),
  value: yup.number().required(),
  type: yup.string().oneOf(["income", "expense"]).required(),
  bankId: yup.string().required(),
});

interface TransactionFormProps {
  banks: Bank[];
}

interface FormData {
  bankId: string;
  name: string;
  value: number;
  type: "income" | "expense";
}

export default function TransactionForm({ banks }: TransactionFormProps) {
  const { data: session } = useSession();

  const [formattedValue, setFormattedValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, "");

    const formatted = (Number(numericValue) / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatted;
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setFormattedValue(formatCurrency(value));

    const numericValue = parseFloat(value.replace(/[^\d]/g, "") || "0") / 100;
    setValue("value", numericValue);
  };

  const onSubmit = async (data: FormData) => {
    if (!session?.user.id) {
      return;
    }

    const formData = {
      userId: session.user.id,
      bankId: data.bankId,
      name: data.name,
      value: data.value,
    };

    setIsLoading(true);

    try {
      if (data.type === "income") {
        await createNewIncome(formData);
      } else if (data.type === "expense") {
        await createNewExpense(formData);
      }
    } finally {
      reset();
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2.5">
      <select
        {...register("type")}
        className={`rounded border border-solid bg-transparent p-2.5 outline-none ${errors.type ? "border-red-600" : "border-foreground"}`}
      >
        <option value="income" className="bg-background">
          Receita
        </option>
        <option value="expense" className="bg-background">
          Despesa
        </option>
      </select>

      <input
        type="text"
        placeholder="Título da transação"
        {...register("name")}
        className={`rounded border border-solid bg-transparent p-2.5 outline-none ${errors.name ? "border-red-600" : "border-foreground"}`}
      />

      <select
        {...register("bankId")}
        className={`rounded border border-solid bg-transparent p-2.5 outline-none ${errors.bankId ? "border-red-600" : "border-foreground"}`}
      >
        {banks.map((bank) => (
          <option
            key={bank.id}
            value={bank.id}
            className="bg-background capitalize"
          >
            {bank.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="0,00"
        value={formattedValue}
        onChange={handleValueChange}
        className={`rounded border border-solid bg-transparent p-2.5 outline-none ${errors.value ? "border-red-600" : "border-foreground"}`}
      />

      <button
        type="submit"
        disabled={isLoading}
        className={`flex items-center justify-center rounded p-2.5 text-base active:bg-background active:text-foreground ${isLoading ? "cursor-not-allowed bg-background text-foreground" : "bg-foreground text-stroke"}`}
      >
        {isLoading ? (
          <LoaderCircleIcon size={16} className="animate-spin" />
        ) : (
          "Adicionar"
        )}
      </button>
    </form>
  );
}
