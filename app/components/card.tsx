import { format, parseISO } from "date-fns";
import { LandmarkIcon } from "lucide-react";

interface CardProps {
  id: string;
  name: string;
  value: number;
  created_at: string;
  bank: string;
}

export default function Card({ id, name, value, created_at, bank }: CardProps) {
  const formatToBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const date = parseISO(created_at);
  const formattedDate = format(date, "dd MMM yyyy");

  return (
    <div className="flex items-center justify-between rounded bg-white bg-opacity-5 p-1">
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
    </div>
  );
}
