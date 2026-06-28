"use server";

import { redirect } from "next/navigation";

import {
  updateItineraryItem,
} from "@/services/itineraryService";

export async function updateItineraryItemAction(
  tripId: string,
  itemId: string,
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

  await updateItineraryItem(
    itemId,
    {
      activity,
      place,
      date: dateValue
        ? new Date(dateValue)
        : undefined,
      time: time || undefined,
      notes: notes || undefined,
    }
  );

  redirect(
    `/trips/${tripId}/itinerary`
  );
}