import { notFound } from "next/navigation";
import {deleteItineraryJournalPhotoAction,} from "./photo-actions";
import EditJournalForm from "@/components/journal/EditJournalForm";

import {
  getJournalEntryById,
} from "@/services/journalService";

import {
  updateJournalEntryAction,
} from "./actions";

type Props = {
  params: Promise<{
    id: string;
    itemId: string;
    journalId: string;
  }>;
};

export default async function EditJournalPage({
  params,
}: Props) {
  const {
    id,
    itemId,
    journalId,
  } = await params;

  const journal =
    await getJournalEntryById(
      journalId
    );

  if (!journal) {
    notFound();
  }

  const updateAction =
    updateJournalEntryAction.bind(
      null,
      id,
      itemId,
      journalId
    );

  return (
    <main className="max-w-5xl mx-auto px-6 py-8 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Edit Journal Entry
      </h1>
      <EditJournalForm
  action={updateAction}
  title={journal.title}
  content={journal.content}
  date={
    journal.date
      ? journal.date
          .toISOString()
          .split("T")[0]
      : ""
  }
/>
      {journal.photos.length > 0 && (
  <div className="mt-8 space-y-4">
    <h2 className="text-lg font-semibold">
      Photos
    </h2>

    <div className="grid grid-cols-2 gap-4">
      {journal.photos.map(
        (photo) => (
          <div
            key={photo.id}
            className="border rounded-lg p-2"
          >
            <img
              src={photo.imageUrl}
              alt="Journal photo"
              className="
                w-full
                rounded-lg
                object-cover
              "
            />

            <form
              action={deleteItineraryJournalPhotoAction.bind(
                null,
                id,
                itemId,
                journalId,
                photo.id
              )}
              className="mt-2"
            >
              <button
                type="submit"
                className="text-sm text-red-600"
              >
                Delete Photo
              </button>
            </form>
          </div>
        )
      )}
    </div>
  </div>
)}
    </main>
  );
}