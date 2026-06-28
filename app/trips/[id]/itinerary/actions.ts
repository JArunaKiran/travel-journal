"use server";

import { revalidatePath } from "next/cache";

import {
  toggleItineraryItemCompletion,
} from "@/services/itineraryService";

export async function toggleItineraryItemCompletionAction(
  tripId: string,
  itemId: string
) {
  await toggleItineraryItemCompletion(
    itemId
  );

  revalidatePath(
    `/trips/${tripId}`
  );

  revalidatePath(
    `/trips/${tripId}/itinerary`
  );
}