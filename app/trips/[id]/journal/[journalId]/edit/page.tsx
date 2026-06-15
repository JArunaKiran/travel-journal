import { notFound } from "next/navigation";

import {
  getJournalEntryById,
} from "@/services/journalService";

import {
  updateTripJournalEntryAction,
} from "./actions";

type Props = {
  params: Promise<{
    id: string;
    journalId: string;
  }>;
};

export default async function EditTripJournalPage({
  params,
}: Props) {
  const {
    id,
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
    updateTripJournalEntryAction.bind(
      null,
      id,
      journalId
    );

  return (
    <main className="max-w-5xl mx-auto px-6 py-8 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Edit Journal Entry
      </h1>

      <form
        action={updateAction}
        className="space-y-4"
      >
        <input
          name="title"
          type="text"
          defaultValue={journal.title}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          name="date"
          type="date"
          defaultValue={
            journal.date
              ? journal.date
                  .toISOString()
                  .split("T")[0]
              : ""
          }
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="content"
          rows={10}
          defaultValue={journal.content}
          className="w-full border rounded-lg p-3"
          required
        />

        <button
          type="submit"
          className="
            w-full
            rounded-lg
            bg-black
            text-white
            p-3
          "
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}