"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createNewBank } from "../../actions/bank";
import { LoaderCircleIcon } from "lucide-react";

const schema = yup.object({
  name: yup.string().required(),
  value: yup.number().nullable(),
});

interface FormData {
  name: string;
  value?: number | null;
}

export default function AddBank() {
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
      name: data.name,
      initial_value: data.value ?? 0,
    };

    setIsLoading(true);

    try {
      await createNewBank(formData);
    } finally {
      setIsLoading(false);
      reset({ name: "", value: undefined });
      setFormattedValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2.5">
      <input
        type="text"
        placeholder="Nome"
        {...register("name")}
        className={`rounded border border-solid bg-transparent p-2.5 outline-none ${errors.name ? "border-red-600" : "border-foreground"}`}
      />
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
