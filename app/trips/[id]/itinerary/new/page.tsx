import { createItineraryItemAction } from "./actions";
import Link from "next/link";
import { deleteJournalEntryAction,} from "./actions";


type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NewItineraryPage({
  params,
}: Props) {
  const { id } = await params;

  const createAction =
    createItineraryItemAction.bind(
      null,
      id
    );

  return (
    <main className="max-w-md mx-auto p-4">
      <Link
  href={`/trips/${id}`}
  className="text-sm text-gray-500"
>
  ← Back
</Link>
      <h1 className="text-2xl font-bold mb-6">
        Add Activity
      </h1>

      <form
        action={createAction}
        className="space-y-4"
      >
        <select
          name="activity"
          className="w-full border rounded-lg p-3"
          required
        >
          <option value="">
            Select Activity
          </option>

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
          placeholder="Place"
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          name="date"
          type="date"
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          name="time"
          type="time"
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="notes"
          placeholder="Notes"
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
          Save Activity
        </button>
      </form>
    </main>
  );
}