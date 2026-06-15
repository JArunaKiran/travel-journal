"use server";

import { redirect } from "next/navigation";

import {
  createExpense,
} from "@/services/expenseService";

export async function createExpenseAction(
  tripId: string,
  formData: FormData
) {
  const title =
    formData.get("title") as string;

  const amount =
    Number(
      formData.get("amount")
    );

  const category =
    formData.get("category") as
      | "ACCOMMODATION"
      | "FOOD"
      | "TRANSPORT"
      | "ACTIVITIES"
      | "SHOPPING"
      | "OTHER";

  const paidById =
    formData.get("paidById") as string;

  const participantIds =
    formData.getAll(
      "participantIds"
    ) as string[];

  const dateValue =
    formData.get("date") as string;

  const notes =
    formData.get("notes") as string;

  await createExpense({
    title,
    amount,
    category,
    paidById,
    participantIds,
    tripId,
    notes,
    date: dateValue
      ? new Date(dateValue)
      : undefined,
  });

  redirect(
    `/trips/${tripId}`
  );
}