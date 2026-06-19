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

  const photoUrls =
  formData.getAll("photoUrl");

const photoPublicIds =
  formData.getAll("photoPublicId");

const photos = photoUrls.map(
  (url, index) => ({
    imageUrl: url as string,
    cloudinaryPublicId:
      photoPublicIds[index] as string,
  })
);

await createItineraryJournalEntry({
  itineraryItemId,
  title,
  content,
  date: dateValue
    ? new Date(dateValue)
    : undefined,
  photos,
});
redirect(`/trips/${tripId}`);
}