"use server";

import { redirect } from "next/navigation";

import {
  updateExpense,
} from "@/services/expenseService";

export async function updateExpenseAction(
  tripId: string,
  expenseId: string,
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

  await updateExpense(
    expenseId,
    {
      title,
      amount,
      category,
      paidById,
      participantIds,
      notes,
      date: dateValue
        ? new Date(dateValue)
        : undefined,
    }
  );

  redirect(
    `/trips/${tripId}`
  );
}