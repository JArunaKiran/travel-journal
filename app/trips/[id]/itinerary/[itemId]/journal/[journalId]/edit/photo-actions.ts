"use server";

import { redirect } from "next/navigation";

import {
  deleteJournalPhoto,
} from "@/services/journalService";

export async function deleteItineraryJournalPhotoAction(
  tripId: string,
  itemId: string,
  journalId: string,
  photoId: string
) {
  await deleteJournalPhoto(photoId);

  redirect(
    `/trips/${tripId}/itinerary/${itemId}/journal/${journalId}/edit`
  );
}