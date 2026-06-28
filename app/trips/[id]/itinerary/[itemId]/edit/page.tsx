import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getItineraryItemById,
} from "@/services/itineraryService";

import {
  updateItineraryItemAction,
} from "./actions";

type Props = {
  params: Promise<{
    id: string;
    itemId: string;
  }>;
};

export default async function EditItineraryPage({
  params,
}: Props) {
  const {
    id,
    itemId,
  } = await params;

  const item =
    await getItineraryItemById(
      itemId
    );

  if (!item) {
    notFound();
  }

  const updateAction =
    updateItineraryItemAction.bind(
      null,
      id,
      itemId
    );

  return (
    <main className="max-w-md mx-auto p-4">
      <Link
        href={`/trips/${id}/itinerary`}
        className="text-sm text-gray-500"
      >
        ← Back
      </Link>

      <h1 className="text-2xl font-bold mb-6">
        Edit Activity
      </h1>

      <form
        action={updateAction}
        className="space-y-4"
      >
        <select
          name="activity"
          defaultValue={item.activity}
          className="w-full border rounded-lg p-3"
          required
        >
          <option value="TRAVEL">
            Travel
          </option>

          <option value="CHECK_IN">
            Check In
          </option>

          <option value="CHECK_OUT">
            Check Out
          </option>

          <option value="EXPLORE">
            Explore
          </option>

          <option value="MEAL">
            Meal
          </option>
        </select>

        <input
          name="place"
          type="text"
          defaultValue={item.place}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          name="date"
          type="date"
          defaultValue={
            item.date
              ? item.date
                  .toISOString()
                  .split("T")[0]
              : ""
          }
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          name="time"
          type="time"
          defaultValue={item.time ?? ""}
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="notes"
          defaultValue={item.notes ?? ""}
          className="w-full border rounded-lg p-3"
        />

        <button
          type="submit"
          className="
            w-full
            bg-black
            text-white
            rounded-lg
            p-3
          "
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}