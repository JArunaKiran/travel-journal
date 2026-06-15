"use server";

import { redirect } from "next/navigation";
import { createItineraryJournalEntry } from "@/services/journalService";

export async function createItineraryJournalEntryAction(
  tripId: string,
  itineraryItemId: string,
  formData: FormData
) {
  const title =
    formData.get("title") as string;

  const content =
    formData.get("content") as string;

  const dateValue =
    formData.get("date") as string;

  await createItineraryJournalEntry({
    itineraryItemId,
    title,
    content,
    date: dateValue
      ? new Date(dateValue)
      : undefined,
  });

  redirect(`/trips/${tripId}`);
}