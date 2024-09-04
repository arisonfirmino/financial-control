import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const formatDate = (dateInput: Date | string): string => {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  return format(date, "d MMM yyyy", { locale: ptBR });
};
