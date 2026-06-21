import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Use",
};

export default function HowToUsePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-8 bg-white text-black min-h-screen">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl font-bold mt-4">
          Welcome to Travelogue
        </h1>

        <p className="mt-2 text-gray-600">
          Plan trips, track expenses, and preserve memories from every
          journey.
        </p>
      </div>

      <section className="rounded-lg border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">
          Getting Started
        </h2>

        <ol className="space-y-3 list-decimal list-inside text-gray-700">
          <li>Create a trip.</li>
          <li>Add fellow travelers.</li>
          <li>Build your itinerary.</li>
          <li>Track expenses as you travel.</li>
          <li>Capture memories in your journal.</li>
        </ol>
      </section>

      <section className="rounded-lg border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">
          🗺️ Plan Your Trip
        </h2>

        <p className="text-gray-700">
          Create trips and organize destinations, travel dates, and
          everything related to your journey in one place.
        </p>
      </section>

      <section className="rounded-lg border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">
          📅 Build an Itinerary
        </h2>

        <p className="text-gray-700 mb-3">
          Add activities and places you want to visit.
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Museums</li>
          <li>Landmarks</li>
          <li>Restaurants</li>
          <li>Day trips</li>
          <li>Local experiences</li>
        </ul>
      </section>

      <section className="rounded-lg border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">
          ✍️ Capture Memories
        </h2>

        <p className="text-gray-700">
          Use journal entries to record your experiences, reflections,
          highlights, and memorable moments. You can create journals for
          an entire trip or for specific itinerary items.
        </p>
      </section>

      <section className="rounded-lg border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">
          💰 Track Expenses
        </h2>

        <p className="text-gray-700 mb-3">
          Keep a record of all travel expenses including:
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>Accommodation</li>
          <li>Food</li>
          <li>Transport</li>
          <li>Activities</li>
          <li>Shopping</li>
          <li>Other expenses</li>
        </ul>
      </section>

      <section className="rounded-lg border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">
          👥 Manage Travelers
        </h2>

        <p className="text-gray-700">
          Add everyone traveling with you so that expenses can be shared
          and tracked accurately.
        </p>
      </section>

      <section className="rounded-lg border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">
          ⚖️ Split Shared Expenses
        </h2>

        <p className="text-gray-700">
          Record who paid for an expense and who participated. Travelogue
          automatically calculates how shared expenses should be divided.
        </p>
      </section>

      <section className="rounded-lg border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">
          Helpful Tips
        </h2>

        <ul className="space-y-2 text-gray-700">
          <li>✅ Plan your itinerary before departure.</li>
          <li>✅ Record expenses immediately after paying.</li>
          <li>✅ Write a short journal entry every day.</li>
          <li>✅ Review expenses before the trip ends.</li>
          <li>✅ Use journals to capture moments you'll want to remember.</li>
        </ul>
      </section>

      <section className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">
          Why Travelogue?
        </h2>

        <p className="text-gray-700 italic">
          Most travel apps help you plan. Most diary apps help you
          remember. Travelogue helps you do both.
        </p>
      </section>
    </main>
  );
}