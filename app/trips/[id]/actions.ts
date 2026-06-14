"use server";

import { revalidatePath } from "next/cache";
import { deleteJournalEntry } from "@/services/journalService";
import { deleteItineraryItem,deleteTripItinerary,} from "@/services/itineraryService";
import { deleteTrip, } from "@/services/tripService";
import { redirect } from "next/navigation";


export async function deleteJournalEntryAction(
  tripId: string,
  journalEntryId: string
) {
  await deleteJournalEntry(journalEntryId);

  revalidatePath(`/trips/${tripId}`);
}
export async function deleteItineraryItemAction(
  tripId: string,
  itineraryItemId: string
) {
  await deleteItineraryItem(
    itineraryItemId
  );

  revalidatePath(`/trips/${tripId}`);
}
export async function deleteTripItineraryAction(
  tripId: string
) {
  await deleteTripItinerary(
    tripId
  );

  revalidatePath(`/trips/${tripId}`);
}
export async function deleteTripAction(
  tripId: string
) {
  await deleteTrip(tripId);

  redirect("/");
}