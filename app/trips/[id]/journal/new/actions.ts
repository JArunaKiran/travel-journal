"use server";

import { redirect } from "next/navigation";
import { createTripJournalEntry } from "@/services/journalService";

export async function createTripJournalEntryAction(
  tripId: string,
  formData: FormData
) {
  const title =
    formData.get("title") as string;

  const content =
    formData.get("content") as string;

  const dateValue =
    formData.get("date") as string;

  await createTripJournalEntry({
    tripId,
    title,
    content,
    date: dateValue
      ? new Date(dateValue)
      : undefined,
  });

  redirect(`/trips/${tripId}`);
}