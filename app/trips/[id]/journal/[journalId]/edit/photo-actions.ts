"use server";

import { redirect } from "next/navigation";

import {
  deleteJournalPhoto,
} from "@/services/journalService";

export async function deleteJournalPhotoAction(
  tripId: string,
  journalId: string,
  photoId: string
) {
  await deleteJournalPhoto(photoId);

  redirect(
    `/trips/${tripId}/journal/${journalId}/edit`
  );
}