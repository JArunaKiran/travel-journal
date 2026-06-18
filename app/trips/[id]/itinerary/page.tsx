import Link from "next/link";
import {getTripById,} from "@/services/tripService";
import {getItineraryItemsByTrip,} from "@/services/itineraryService";
import { deleteItineraryItemAction } from "../actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function FullItineraryPage({
  params,
}: Props) {
  const { id } = await params;

  const trip =
    await getTripById(id);

  if (!trip) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-8">
        Trip not found
      </main>
    );
  }

  const itineraryItems =
    await getItineraryItemsByTrip(id);

  const groupedItinerary =
    itineraryItems.reduce(
      (groups, item) => {
        if (!item.date)
          return groups;

        const dateKey =
          item.date
            .toISOString()
            .split("T")[0];

        if (!groups[dateKey]) {
          groups[dateKey] = [];
        }

        groups[dateKey].push(
          item
        );

        return groups;
      },
      {} as Record<
        string,
        typeof itineraryItems
      >
    );

  return (
    <main className="max-w-5xl mx-auto px-6 py-8 bg-white text-black min-h-screen">
      <Link
        href={`/trips/${trip.id}`}
        className="text-sm text-gray-500"
      >
        ← Back to Trip
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-6">
        Full Itinerary
      </h1>
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
              {currentDate.toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )}
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

                  <div className="text-sm mt-2">
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
                        {item.journalEntries[0].content.slice(
                          0,
                          100
                        )}
                        {item.journalEntries[0].content.length >
                        100
                          ? "..."
                          : ""}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-4">
                    <Link
                      href={`/trips/${trip.id}/itinerary/${item.id}/journal`}
                      className="text-sm text-blue-600"
                    >
                      View Journals
                    </Link>

                    <Link
                      href={`/trips/${trip.id}/itinerary/${item.id}/journal/new`}
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
                        className="font-medium text-sm text-red-600"
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
</main>
  );
}