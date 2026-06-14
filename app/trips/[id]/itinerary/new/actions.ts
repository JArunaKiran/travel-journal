"use server";

import { redirect } from "next/navigation";
import { createItineraryItem } from "@/services/itineraryService";
import { revalidatePath } from "next/cache";
import { deleteJournalEntry } from "@/services/journalService";

export async function createItineraryItemAction(
  tripId: string,
  formData: FormData
) {
  const activity =
    formData.get("activity") as
      | "TRAVEL"
      | "CHECK_IN"
      | "CHECK_OUT"
      | "EXPLORE"
      | "MEAL";

  const place =
    formData.get("place") as string;

  const dateValue =
    formData.get("date") as string;

  const time =
    formData.get("time") as string;

  const notes =
    formData.get("notes") as string;

  await createItineraryItem({
    tripId,
    activity,
    place,
    date: dateValue
      ? new Date(dateValue)
      : undefined,
    time,
    notes,
  });

  redirect(`/trips/${tripId}`);
}
export async function deleteJournalEntryAction(
  tripId: string,
  journalEntryId: string
) {
  await deleteJournalEntry(
    journalEntryId
  );

  revalidatePath(`/trips/${tripId}`);
}