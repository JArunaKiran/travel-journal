import { getTrips } from "@/services/tripService";
import Link from "next/link";


export default async function HomePage() {
  const trips = await getTrips();

  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold">
        Travel Journal
      </h1>

      <Link
        href="/trips/new"
        className="block mt-4 w-full rounded-lg bg-black text-white p-3 text-center"
      >
        New Trip
      </Link>

      <div className="mt-6 space-y-3">
        {trips.map((trip) => (
          <Link
            key={trip.id}
            href = {`/trips/${trip.id}`}
            className="block w-full border rounded-lg p-4 bg-white"
          >
            <h2 className="font-semibold">
              {trip.title}
            </h2>

            <p className="text-sm text-gray-500">
              {trip.country}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}