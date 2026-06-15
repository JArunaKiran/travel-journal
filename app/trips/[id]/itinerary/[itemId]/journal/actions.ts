"use server";

import { redirect } from "next/navigation";

import {
  deleteJournalEntry,
} from "@/services/journalService";

export async function deleteActivityJournalEntryAction(
  tripId: string,
  itemId: string,
  journalId: string
) {
  await deleteJournalEntry(
    journalId
  );

  redirect(
    `/trips/${tripId}/itinerary/${itemId}/journal`
  );
}