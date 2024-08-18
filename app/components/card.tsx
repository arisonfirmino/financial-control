import axios from "axios";
import { format, parseISO } from "date-fns";
import { LandmarkIcon } from "lucide-react";
import { useState } from "react";

interface CardProps {
  id: string;
  name: string;
  value: number;
  created_at: string;
  bank: string;
  type: "income" | "expense";
  updateBanks: () => void;
  updateCards: () => void;
}

export default function Card({
  id,
  name,
  value,
  created_at,
  bank,
  type,
  updateBanks,
  updateCards,
}: CardProps) {
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  const date = parseISO(created_at);
  const formattedDate = format(date, "dd MMM yyyy");

  const formatToBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handleDelete = async () => {
    await axios
      .delete(`https://api-financial-control.onrender.com/${type}?id=${id}`)
      .then(() => {
        updateBanks();
        updateCards();
      });
  };

  return (
    <div
      onMouseEnter={() => setShowDeleteButton(true)}
      onMouseLeave={() => setShowDeleteButton(false)}
      className="relative flex cursor-pointer items-center justify-between rounded border-solid border-primary bg-white bg-opacity-5 p-1 xl:duration-500 xl:hover:scale-[1.02] xl:hover:bg-opacity-10"
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium capitalize">{name}</h3>
        <p className="text-sm">{formatToBRL(value)}</p>
      </div>

      <div className="flex flex-col items-end gap-1">
        <p className="flex items-center gap-1 text-xs capitalize">
          <LandmarkIcon size={12} className="text-primary" />
          {bank}
        </p>
        <p className="text-xs lowercase">{formattedDate}</p>
      </div>

      {showDeleteButton && (
        <button
          onClick={handleDelete}
          className="absolute -top-2 right-1 z-10 rounded-full bg-red-900 px-1.5 text-xs font-light text-red-500 active:bg-gray-400 active:text-gray-600"
        >
          excluir
        </button>
      )}
    </div>
  );
}
