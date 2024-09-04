"use server";

import { db } from "../lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateNewBankProps {
  name: string;
  userId: string;
  initial_value: number;
}

export const createNewBank = async ({
  name,
  userId,
  initial_value,
}: CreateNewBankProps) => {
  if (!name || !userId) {
    throw new Error("Campos não preenchidos.");
  }

  await db.bank.create({
    data: {
      name,
      userId,
      initial_value,
      current_value: initial_value,
    },
  });

  revalidatePath("/");
};

export const deleteBank = async ({ id }: { id: string }) => {
  if (!id) {
    throw new Error("Banco não encontrado.");
  }

  await db.bank.delete({
    where: {
      id: id,
    },
  });

  revalidatePath("/");
};
