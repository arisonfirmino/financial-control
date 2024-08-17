import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { XIcon } from "lucide-react";
import axios from "axios";

const schema = yup.object({
  name: yup.string().required(),
  bank: yup.string().required(),
  value: yup.number().required(),
});

interface Bank {
  id: string;
  name: string;
  email: string;
}

export default function ExpenseForm({
  handleClick,
  findExpenses,
  updateBanks,
}: {
  handleClick: () => void;
  findExpenses: () => void;
  updateBanks: () => void;
}) {
  const { data: session } = useSession();

  const [banks, setBanks] = useState<Bank[]>([]);
  const [formattedValue, setFormattedValue] = useState<string>("0,00");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const name = watch("name");
  const bank = watch("bank");
  const value = watch("value");

  useEffect(() => {
    const findBanks = async () => {
      const response = await axios.get(
        "https://api-financial-control.onrender.com/banks",
      );
      const filteredBanks = response.data.filter(
        (bank: Bank) => bank.email === session?.user?.email,
      );

      setBanks(filteredBanks);
    };

    findBanks();
  }, [session?.user?.email]);

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\D/g, "");
    const num = parseFloat(input) / 100;
    const formatted = num.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setFormattedValue(formatted);
    setValue("value", num);
  };

  const onSubmit = async (data: {
    name: string;
    value: number;
    bank: string;
  }) => {
    const formData = {
      name: data.name,
      email: session?.user?.email,
      bankId: data.bank,
      value: data.value,
    };

    await axios
      .post("https://api-financial-control.onrender.com/expense", formData)
      .then(() => {
        handleClick();
        findExpenses();
        updateBanks();
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="fixed left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center gap-5 rounded-lg border border-solid border-primary bg-main p-5"
    >
      <div className="flex w-full items-center gap-2.5">
        <hr className="w-full border border-solid border-white border-opacity-10" />

        <button
          type="button"
          onClick={handleClick}
          className="active:text-red-600"
        >
          <XIcon size={18} />
        </button>
      </div>

      <div className="flex w-full flex-col gap-1">
        <label className="text-sm uppercase">Nome</label>

        <input
          type="text"
          placeholder="Insira o nome do banco"
          {...register("name")}
          className={`rounded bg-white bg-opacity-5 px-2.5 py-1.5 outline-none ${errors.name || (name === "" && touchedFields.name) ? "outline-red-600" : "focus:outline-primary"} ${name ? "outline-primary" : ""}`}
        />
      </div>

      <div className="flex w-full flex-col gap-1">
        <label className="text-sm uppercase">Banco</label>

        <select
          {...register("bank")}
          className={`rounded bg-white bg-opacity-5 px-2.5 py-1.5 capitalize outline-none ${errors.bank || (bank === "" && touchedFields.bank) ? "outline-red-600" : "focus:outline-primary"} ${bank ? "outline-primary" : ""}`}
        >
          <option value="" className="bg-main">
            Selecione um banco
          </option>
          {banks.map((bank) => (
            <option
              key={bank.id}
              value={bank.id}
              className="bg-main capitalize"
            >
              {bank.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex w-full flex-col gap-1">
        <label className="text-sm uppercase">Valor</label>

        <input
          type="text"
          placeholder="0,00"
          value={formattedValue}
          onChange={handleValueChange}
          className={`rounded bg-white bg-opacity-5 px-2.5 py-1.5 outline-none focus:outline-primary ${errors.value || (value === undefined && touchedFields.value) ? "outline-red-600" : ""}`}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-background p-1.5 active:bg-gray-400"
      >
        Adicionar
      </button>
    </form>
  );
}
