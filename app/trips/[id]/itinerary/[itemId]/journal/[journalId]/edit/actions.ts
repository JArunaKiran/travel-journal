"use server";

import { redirect } from "next/navigation";

import {
  updateJournalEntry,
} from "@/services/journalService";

export async function updateJournalEntryAction(
  tripId: string,
  itemId: string,
  journalId: string,
  formData: FormData
) {
  const title =
    formData.get("title") as string;

  const content =
    formData.get("content") as string;

  const dateValue =
    formData.get("date") as string;

  await updateJournalEntry(
    journalId,
    {
      title,
      content,
      date: dateValue
        ? new Date(dateValue)
        : undefined,
    }
  );

  redirect(
    `/trips/${tripId}/itinerary/${itemId}/journal`
  );
}