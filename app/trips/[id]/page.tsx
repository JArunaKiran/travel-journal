import { getTripById } from "@/services/tripService";
import { getItineraryItemsByTrip } from "@/services/itineraryService";
import Link from "next/link";

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

  const itineraryItems =
    await getItineraryItemsByTrip(id);

  if (!trip) {
    return (
      <main className="max-w-md mx-auto p-4">
        <h1 className="text-xl font-bold">
          Trip not found
        </h1>
      </main>
    );
  }

  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold">
        {trip.title}
      </h1>

      <div className="mt-6 rounded-xl border p-4 space-y-3">
        <div>
          <p className="text-sm text-gray-500">
            Country
          </p>

          <p>{trip.country || "Not specified"}</p>
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

        <div className="rounded-xl border p-4">
          Journal
        </div>

        <div className="rounded-xl border p-4">
          Expenses
        </div>
      </div>
    </main>
  );
}