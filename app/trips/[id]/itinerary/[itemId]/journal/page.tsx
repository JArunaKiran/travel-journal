import Link from "next/link";
import {deleteActivityJournalEntryAction,} from "./actions"; 

import {
  getItineraryItemById,
} from "@/services/itineraryService";

import {
  getItineraryJournalEntries,
} from "@/services/journalService";

type Props = {
  params: Promise<{
    id: string;
    itemId: string;
  }>;
};

export default async function ActivityJournalPage({
  params,
}: Props) {
  const { id, itemId } =
    await params;

  const itineraryItem =
    await getItineraryItemById(itemId);

  if (!itineraryItem) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-8 bg-white text-black min-h-screen">
        <h1 className="text-2xl font-bold">
          Activity not found
        </h1>
      </main>
    );
  }

  const journalEntries =
    await getItineraryJournalEntries(
      itemId
    );

  return (
    <main className="max-w-5xl mx-auto px-6 py-8 bg-white text-black min-h-screen">
      <Link
        href={`/trips/${id}`}
        className="text-sm text-gray-500"
      >
        ← Back to Trip
      </Link>

      <h1 className="text-3xl font-bold mt-4">
        {itineraryItem.activity}
      </h1>

      <p className="text-gray-600 mt-1">
        {itineraryItem.place}
      </p>

      <Link
        href={`/trips/${id}/itinerary/${itemId}/journal/new`}
        className="block w-full rounded-2xl bg-black text-white py-4 text-center mt-6 font-medium"
      >
        Add Journal Entry
      </Link>

      <div className="mt-8 rounded-2xl border p-6 bg-white shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          Activity Journals
        </h2>

        {journalEntries.length === 0 ? (
          <p className="text-sm text-gray-500">
            No journal entries yet
          </p>
        ) : (
          <div className="space-y-4">
            {journalEntries.map((entry) => (
              <div
                key={entry.id}
                className="border rounded-xl p-4"
              >
                <div className="text-lg font-semibold">
                  {entry.title}
                </div>

                <div className="text-sm text-gray-500 mt-1">
                  {entry.date
                    ? entry.date.toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )
                    : ""}
                </div>

                <div className="mt-3 text-sm text-gray-700">
                  {entry.content.slice(0, 150)}
                  {entry.content.length > 150
                    ? "..."
                    : ""}
                </div>
                {entry.photos.length > 0 && (
  <div className="mt-4 grid grid-cols-2 gap-2">
    {entry.photos.map((photo) => (
      <img
        key={photo.id}
        src={photo.imageUrl}
        alt="Journal photo"
        className="
          w-full
          rounded-lg
          object-cover
        "
      />
    ))}
  </div>
)}
                <div className="mt-4">
                    <Link
                        href={`/trips/${id}/itinerary/${itemId}/journal/${entry.id}/edit`}
                        className="text-sm text-blue-600"
                    >
                    Edit
                    </Link>
                    <form
                    action = {deleteActivityJournalEntryAction.bind(
                        null,
                        id,
                        itemId,
                        entry.id
                    )}
                    >
                    <button
                        type = "submit"
                        className="text-sm text-red-600"
                    >
                        Delete
                    </button>
                    </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}