"use server";

import { revalidatePath } from "next/cache";
import { deleteJournalEntry } from "@/services/journalService";
import { deleteItineraryItem,deleteTripItinerary,} from "@/services/itineraryService";
import { deleteTrip, } from "@/services/tripService";
import { redirect } from "next/navigation";
import {createTraveler, deleteTraveler,} from "@/services/travelerService";


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
export async function createTravelerAction(
  tripId: string,
  formData: FormData
) {
  const name =
    formData.get("name") as string;

  await createTraveler({
    tripId,
    name,
  });

  revalidatePath(
    `/trips/${tripId}`
  );
}

export async function deleteTravelerAction(
  tripId: string,
  travelerId: string
) {
  await deleteTraveler(
    travelerId
  );

  revalidatePath(
    `/trips/${tripId}`
  );
} 