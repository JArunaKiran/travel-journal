import Link from "next/link";
import { getTripById } from "@/services/tripService";
import { getItineraryItemsByTrip } from "@/services/itineraryService";
import { getTripJournalEntries, getLatestItineraryJournalEntry, } from "@/services/journalService";
import { deleteJournalEntryAction,  deleteItineraryItemAction, deleteTripItineraryAction, deleteTripAction,createTravelerAction, deleteTravelerAction } from "./actions";
import {getTravelersByTrip,} from "@/services/travelerService";

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
      <main className="max-w-5xl mx-auto px-6 py-8 bg-white text-black min-h-screen">
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

  const travelers =
    await getTravelersByTrip(id);

  return (
    <main className="max-w-5xl mx-auto px-6 py-8 bg-white text-black min-h-screen">
      <Link
      href="/"
      className="text-sm text-gray-500"
      >
      ← Back to Trips
    </Link>
      <h1 className="text-4xl font-bold">
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

      <div className="mt-6 rounded-2xl border p-6 bg-white shadow-sm">
      <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p  className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Country
            </p>
            <p className="mt-3 text-xl font-medium">
              {trip.country || "Not specified"}
            </p>
          </div>

          <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Start Date
          </p>
          <p className="mt-3 text-xl font-medium">
              {trip.startDate ? trip.startDate.toLocaleDateString("en-GB", {day: "2-digit", month: "short", year: "numeric"}): "Not specified"}
          </p>
          </div>

          <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            End Date
          </p>
          <p className="mt-3 text-xl font-medium">
            {trip.endDate ? trip.endDate.toLocaleDateString("en-GB", {day: "2-digit", month: "short", year: "numeric"}) : "Not specified"}
          </p>
          </div>
      </div>
    </div>

      <Link
        href={`/trips/${trip.id}/itinerary/new`}
        className=" block w-full rounded-2xl bg-black text-white py-4 text-center mt-6 font-medium"
      >
        Add Activity
      </Link>

      <div className="mt-8 space-y-6">
        {/* Itinerary Section */}
        <div className="rounded-2xl border p-6 bg-white shadow-sm">
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
              {currentDate.toLocaleDateString("en-GB", {day: "2-digit", month: "short", year: "numeric"})}
              {" · "}
              Day {dayNumber}
            </h3>

            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition"
                >
                  <div className="text-lg font-semibold">
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

                  <div className= "text-sm mt-2">
                    🗒️ {item.notes}
                  </div>

                  {item.journalEntries.length > 0 && (
                    <div className="mt-4 border-t pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Latest Journal
                      </p>

                      <p className="mt-2 font-medium">
                        {item.journalEntries[0].title}
                      </p>

                      <p className="mt-2 text-sm text-gray-700">
                        {item.journalEntries[0].content.slice(0, 100)}
                        {item.journalEntries[0].content.length > 100 ? "..." : ""}
                      </p>
                  </div>
                  )}
                  
                  <div className="mt-4 flex items-center gap-4">
                    <Link
                      href ={`/trips/${trip.id}/itinerary/${item.id}/journal` }
                      className="text-sm text-blue-600"
                    >
                      View Journals
                    </Link>

                    <Link
                        href = {`/trips/${trip.id}/itinerary/${item.id}/journal/new`}
                        className="text-sm font-medium text-blue-600"
                    >
                      Add Journal
                    </Link>
                      
                  <form
                    action={deleteItineraryItemAction.bind(
                    null,
                    trip.id,
                    item.id
                    )}
                  >
                  <button
                    type="submit"
                    className=" font-medium text-sm text-red-600"
                  >
                    Delete
                  </button>
                  </form>
                  </div>
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
        <div className="rounded-2xl border p-6 bg-white shadow-sm">
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
                  className="border rounded-xl p-4 bg-white shadow-sm"
                >
                  <div className="text-lg font-semibold">
                    {entry.title}
                  </div>

                  <div className="mt-1 text-sm text-gray-500">
                    {entry.date
                      ? entry.date.toLocaleDateString("en-GB", {day: "2-digit", month: "short", year: "numeric"})
                      : ""}
                  </div>
                  <div className="text-sm mt-2 text-gray-700">
                    {entry.content.slice(0, 100)}
                    {entry.content.length > 100 ? "..." : ""}
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <Link
                      href = {`/trips/${trip.id}/journal/${entry.id}`}
                      className="text-sm text-blue-600"
                    >
                      View
                    </Link>
                    <Link
                      href = {`/trips/${trip.id}/journal/${entry.id}/edit`}
                      className="text-sm text-green-600"
                    >
                      Edit
                    </Link>
                  <form
                    action={deleteJournalEntryAction.bind(
                      null,
                      trip.id,
                      entry.id
                    )}
                  >
                   <button
                     type="submit"
                     className=" font-medium text-sm text-red-600"
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
        
        <div className="rounded-2xl border p-6 bg-white shadow-sm">
          <h2 className="font-semibold mb-4">
            Travelers
          </h2>
        <form
          action={createTravelerAction.bind(
            null,
            trip.id
          )}
          className="flex gap-2 mb-4"
        >
        <input 
            name = "name"
            type = "text"
            placeholder= "Traveler name"
            className="flex-1 border rounded-lg p-2"
            required
        />
        <button
          type = "submit"
          className ="rounded-lg bg-black text-white px-4"
        >
          Add Traveler
        </button>
        </form>
        {travelers.length == 0 ? (
          <p className="text-sm text-gray-500">
            No travelers yet
          </p>
        ) : (
          <div className="space-y-2">
            {travelers.map((traveler) => (
              <div
                key = {traveler.id}
                className="flex items-center justify-between border rounded-lg p-3"
              >
            <span>
              {traveler.name}
            </span>

            <form
              action = {deleteTravelerAction.bind(
                null,
                trip.id,
                traveler.id
              )}
            >
              <button
                type = "submit"
                className="text-sm text-red-600"
              >
                Delete traveler
              </button>
            </form>
          </div>
            ))}
      </div>
        )}
    </div>

        {/* Expenses Section */}
        <div className="rounded-2xl border p-6 bg-white shadow-sm">
          <h2 className="font-semibold">
            Expenses
          </h2>
        </div>
      </div>
    </main>
  );
}