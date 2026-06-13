import Link from "next/link";

import { getTripById } from "@/services/tripService";
import { getItineraryItemsByTrip } from "@/services/itineraryService";
import { getTripJournalEntries } from "@/services/journalService";

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

  const journalEntries =
    await getTripJournalEntries(id);

  return (
    <main className="max-w-md mx-auto p-4 bg-white text-black min-h-screen">
      <h1 className="text-3xl font-bold">
        {trip.title}
      </h1>

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

          {itineraryItems.length === 0 ? (
            <p className="text-sm text-gray-500">
              No itinerary items yet
            </p>
          ) : (
            <div className="space-y-3">
              {itineraryItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg p-3"
                >
                  <div className="font-medium">
                    {item.activity}
                  </div>

                  <div className="text-sm">
                    {item.place}
                  </div>

                  <div className="text-sm text-gray-500">
                    {item.time}
                  </div>
                </div>
              ))}
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