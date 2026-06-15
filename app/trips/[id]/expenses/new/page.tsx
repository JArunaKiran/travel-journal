import {
  getTravelersByTrip,
} from "@/services/travelerService";

import {
  createExpenseAction,
} from "./actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NewExpensePage({
  params,
}: Props) {
  const { id } = await params;

  const travelers =
    await getTravelersByTrip(id);

  const createAction =
    createExpenseAction.bind(
      null,
      id
    );

  return (
    <main className="max-w-5xl mx-auto px-6 py-8 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Add Expense
      </h1>

      <form
        action={createAction}
        className="space-y-4"
      >
        <input
          name="title"
          type="text"
          placeholder="Expense title"
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          name="amount"
          type="number"
          step="0.01"
          placeholder="Amount"
          className="w-full border rounded-lg p-3"
          required
        />

        <select
          name="category"
          className="w-full border rounded-lg p-3"
          required
        >
          <option value="">
            Select category
          </option>

          <option value="ACCOMMODATION">
            Accommodation
          </option>

          <option value="FOOD">
            Food
          </option>

          <option value="TRANSPORT">
            Transport
          </option>

          <option value="ACTIVITIES">
            Activities
          </option>

          <option value="SHOPPING">
            Shopping
          </option>

          <option value="OTHER">
            Other
          </option>
        </select>

        <input
          name="date"
          type="date"
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="notes"
          rows={4}
          placeholder="Notes"
          className="w-full border rounded-lg p-3"
        />

        <div>
          <h2 className="font-medium mb-2">
            Paid By
          </h2>

          <select
            name="paidById"
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">
              Select traveler
            </option>

            {travelers.map(
              (traveler) => (
                <option
                  key={traveler.id}
                  value={traveler.id}
                >
                  {traveler.name}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <h2 className="font-medium mb-2">
            Split Between
          </h2>

          <div className="space-y-2">
            {travelers.map(
              (traveler) => (
                <label
                  key={traveler.id}
                  className="flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    name="participantIds"
                    value={traveler.id}
                  />

                  {traveler.name}
                </label>
              )
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-black text-white p-3"
        >
          Save Expense
        </button>
      </form>
    </main>
  );
}