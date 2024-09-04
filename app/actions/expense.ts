"use server";

import { db } from "../lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

interface CreateNewExpenseProps {
  userId: string;
  bankId: string;
  name: string;
  value: number;
}

export const createNewExpense = async ({
  userId,
  bankId,
  name,
  value,
}: CreateNewExpenseProps) => {
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

  await db.expense.create({
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
      current_value: bank.current_value.minus(new Decimal(value)),
    },
  });

  revalidatePath("/");
};

export const deleteExpense = async ({ id }: { id: string }) => {
  if (!id) {
    throw new Error("Falha na solicitação.");
  }

  const expense = await db.expense.findUnique({
    where: {
      id: id,
    },
  });

  if (!expense) {
    throw new Error("Expense não encontrada.");
  }

  const bank = await db.bank.findUnique({
    where: {
      id: expense.bankId,
    },
  });

  if (!bank) {
    throw new Error("Banco não encontrado.");
  }

  await db.expense.delete({
    where: {
      id: id,
    },
  });

  await db.bank.update({
    where: {
      id: expense.bankId,
    },
    data: {
      current_value: bank.current_value.plus(new Decimal(expense.value)),
    },
  });

  revalidatePath("/");
};
