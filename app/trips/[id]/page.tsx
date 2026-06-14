import Link from "next/link";

import { getTripById } from "@/services/tripService";
import { getItineraryItemsByTrip } from "@/services/itineraryService";
import { getTripJournalEntries } from "@/services/journalService";
import { deleteJournalEntryAction,  deleteItineraryItemAction, deleteTripItineraryAction, deleteTripAction, } from "./actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TripDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  const trip = await getTripById(id);

  if (!trip) {
    return (
      <main className="max-w-md mx-auto p-4 bg-white text-black min-h-screen">
        <h1 className="text-xl font-bold">
          Trip not found
        </h1>
      </main>
    );
  }

  const itineraryItems =
    await getItineraryItemsByTrip(id);

  const groupedItinerary = itineraryItems.reduce(
  (groups, item) => {
    if (!item.date) return groups;

    const dateKey = item.date
      .toISOString()
      .split("T")[0];

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }

    groups[dateKey].push(item);

    return groups;
  },
  {} as Record<string, typeof itineraryItems>
);

  const journalEntries =
    await getTripJournalEntries(id);

  return (
    <main className="max-w-md mx-auto p-4 bg-white text-black min-h-screen">
      <Link
      href="/"
      className="text-sm text-gray-500"
      >
      ← Back to Trips
    </Link>
      <h1 className="text-3xl font-bold">
        {trip.title}
      </h1>
      <form
        action={deleteTripAction.bind(
          null,
          trip.id
        )}
      >
       <button
          type="submit"
          className="text-sm text-red-600"
       >
        Delete Trip
      </button>
      </form>

      <div className="mt-6 rounded-xl border p-4 space-y-3">
        <div>
          <p className="text-sm text-gray-500">
            Country
          </p>

          <p>
            {trip.country || "Not specified"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Start Date
          </p>

          <p>
            {trip.startDate
              ? trip.startDate.toLocaleDateString()
              : "Not specified"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            End Date
          </p>

          <p>
            {trip.endDate
              ? trip.endDate.toLocaleDateString()
              : "Not specified"}
          </p>
        </div>
      </div>

      <Link
        href={`/trips/${trip.id}/itinerary/new`}
        className="
          block
          w-full
          rounded-xl
          bg-black
          text-white
          p-3
          text-center
          mt-6
        "
      >
        Add Activity
      </Link>

      <div className="mt-6 space-y-3">
        {/* Itinerary Section */}
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold mb-3">
            Itinerary
          </h2>

          {itineraryItems.length > 0 && (
            <form
              action={deleteTripItineraryAction.bind(
              null,
              trip.id
            )}
            >
            <button
              type="submit"
              className="text-sm text-red-600"
            >
              Delete Entire Itinerary
            </button>
            </form>
          )}

          {Object.keys(groupedItinerary).length === 0 ? (
            <p className="text-sm text-gray-500">
                No itinerary items yet
            </p>
          ) : (
            <div className="space-y-6">
            {Object.entries(groupedItinerary)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([dateKey, items]) => {
             const currentDate = new Date(dateKey);

             const dayNumber =
              trip.startDate
              ? Math.floor(
                (currentDate.getTime() -
                  trip.startDate.getTime()) /
                  (1000 * 60 * 60 * 24)
              ) + 1
            : "?";

        return (
          <div key={dateKey}>
            <h3 className="font-semibold text-lg mb-3">
              {currentDate.toLocaleDateString()}
              {" · "}
              Day {dayNumber}
            </h3>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-3 bg-white shadow-sm"
                >
                  <div className="font-semibold">
                    {item.activity.replaceAll(
                      "_",
                      " "
                    )}
                  </div>

                  <div className="text-sm mt-2">
                    📍 {item.place}
                  </div>

                  <div className="text-sm text-gray-500 mt-1">
                    🕘 {item.time}
                  </div>
                  <form
                    action={deleteItineraryItemAction.bind(
                    null,
                    trip.id,
                    item.id
                    )}
                  >
                  <button
                    type="submit"
                    className=" mt-3 text-sm text-red-600"
                  >
                    Delete
                  </button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        );
      })}
  </div>
)}
        </div>

        {/* Journal Section */}
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold mb-3">
            Journal
          </h2>
          <Link
            href={`/trips/${trip.id}/journal/new`}
            className=" block mb-4 rounded-lg bg-black text-white p-3 text-center"
          >
            Add Journal Entry
          </Link>

          {journalEntries.length === 0 ? (
            <p className="text-sm text-gray-500">
              No journal entries yet
            </p>
          ) : (
            <div className="space-y-3">
              {journalEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="border rounded-lg p-3"
                >
                  <div className="font-medium">
                    {entry.title}
                  </div>

                  <div className="text-sm text-gray-500">
                    {entry.date
                      ? entry.date.toLocaleDateString()
                      : ""}
                  </div>
                  <div className="text-sm mt-2 text-gray-700">
                    {entry.content.slice(0, 100)}
                    {entry.content.length > 100 ? "..." : ""}
                  </div>
                  <form
                    action={deleteJournalEntryAction.bind(
                      null,
                      trip.id,
                      entry.id
                    )}
                  >
                   <button
                     type="submit"
                     className=" mt-3 text-sm text-red-600"
                   >
                      Delete
                   </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Expenses Section */}
        <div className="rounded-xl border p-4">
          <h2 className="font-semibold">
            Expenses
          </h2>
        </div>
      </div>
    </main>
  );
}