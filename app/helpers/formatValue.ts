import { Decimal } from "@prisma/client/runtime/index-browser.js";

export const formatValue = (value: number | Decimal) => {
  const numericValue = value instanceof Decimal ? Number(value) : value;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numericValue);
};
