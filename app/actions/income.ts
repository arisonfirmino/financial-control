"use server";

import { db } from "../lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

interface CreateNewIncomeProps {
  userId: string;
  bankId: string;
  name: string;
  value: number;
}

export const createNewIncome = async ({
  userId,
  bankId,
  name,
  value,
}: CreateNewIncomeProps) => {
  if (!userId || !bankId || !name || !value) {
    throw new Error("Campos não preenchidos.");
  }

  const bank = await db.bank.findUnique({
    where: {
      id: bankId,
    },
  });

  if (!bank) {
    throw new Error("Banco não encontrado.");
  }

  await db.income.create({
    data: {
      userId,
      bankId,
      name,
      value,
    },
  });

  await db.bank.update({
    where: {
      id: bankId,
    },
    data: {
      current_value: bank.current_value.plus(new Decimal(value)),
    },
  });

  revalidatePath("/");
};

export const deleteIncome = async ({ id }: { id: string }) => {
  if (!id) {
    throw new Error("Falha na solicitação.");
  }

  const income = await db.income.findUnique({
    where: {
      id: id,
    },
  });

  if (!income) {
    throw new Error("Income não encontrada.");
  }

  const bank = await db.bank.findUnique({
    where: {
      id: income.bankId,
    },
  });

  if (!bank) {
    throw new Error("Banco não encontrado.");
  }

  await db.income.delete({
    where: {
      id: id,
    },
  });

  await db.bank.update({
    where: {
      id: income.bankId,
    },
    data: {
      current_value: bank.current_value.minus(new Decimal(income.value)),
    },
  });

  revalidatePath("/");
};
