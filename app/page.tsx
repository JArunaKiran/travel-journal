import { getTrips } from "@/services/tripService";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function HomePage() {
  const session = 
    await getServerSession(authOptions);

  if(!session){
    redirect("/login")
  }

  const trips = await getTrips();

  return (
    <main className="max-w-6xl mx-auto px-6 py-8 bg-white text-black min-h-screen">
      <h1 className="text-3xl font-bold">
        Travel Journal
      </h1>

      <p className="mt-2 text-sm text-gray-500">
        Session exists: {session? "Yes": "No"}
      </p>

      <p className="mt-2 text-sm text-gray-500">
        Email: {session?.user?.email ?? "NONE"}
      </p>

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

            <p className="text-sm text-gray-500 mt-1">
              {trip.country}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {trip.startDate ? trip.startDate.toLocaleDateString(): "?"}
              {" → "}
              {trip.endDate ? trip.endDate.toLocaleDateString(): "?"}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}