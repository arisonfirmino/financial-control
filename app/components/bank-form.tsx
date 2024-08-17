import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { XIcon } from "lucide-react";
import axios from "axios";

const schema = yup.object({
  name: yup.string().required(),
  initial_value: yup.number(),
});

export default function AddNewBankForm({
  handleClick,
  updateBanks,
}: {
  handleClick: () => void;
  updateBanks: () => void;
}) {
  const { data: session } = useSession();

  const [formattedValue, setFormattedValue] = useState<string>("0,00");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const name = watch("name");

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.replace(/\D/g, "");
    const num = parseFloat(input) / 100;
    const formatted = num.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setFormattedValue(formatted);
    setValue("initial_value", num);
  };

  const onSubmit = async (data: {
    name: string;
    initial_value?: number | null;
  }) => {
    const formData = {
      name: data.name,
      email: session?.user?.email,
      initial_value: data.initial_value ?? 0,
    };

    await axios
      .post("https://api-financial-control.onrender.com/bank", formData)
      .then(() => {
        handleClick();
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
          className={`rounded bg-white bg-opacity-5 px-2.5 py-1.5 outline-none ${errors.name ? "outline-red-600" : "focus:outline-primary"} ${name ? "outline-primary" : ""}`}
        />
      </div>

      <div className="flex w-full flex-col gap-1">
        <label className="text-sm uppercase">Valor inicial</label>

        <input
          type="text"
          placeholder="0,00"
          value={formattedValue}
          onChange={handleValueChange}
          className={`rounded bg-white bg-opacity-5 px-2.5 py-1.5 outline-none focus:outline-primary ${errors.initial_value ? "outline-red-600" : ""}`}
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
