import {
  getExpenseById,
} from "@/services/expenseService";

import {
  getTravelersByTrip,
} from "@/services/travelerService";

import {
  updateExpenseAction,
} from "./actions";

type Props = {
  params: Promise<{
    id: string;
    expenseId: string;
  }>;
};

export default async function EditExpensePage({
  params,
}: Props) {
  const {
    id,
    expenseId,
  } = await params;

  const expense =
    await getExpenseById(
      expenseId
    );

  if (!expense) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-8">
        Expense not found
      </main>
    );
  }

  const travelers =
    await getTravelersByTrip(id);

  const updateAction =
    updateExpenseAction.bind(
      null,
      id,
      expenseId
    );

  return (
    <main className="max-w-5xl mx-auto px-6 py-8 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Edit Expense
      </h1>

      <form
        action={updateAction}
        className="space-y-4"
      >
        <input
          name="title"
          defaultValue={expense.title}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          name="amount"
          type="number"
          step="0.01"
          defaultValue={expense.amount}
          className="w-full border rounded-lg p-3"
          required
        />

        <select
          name="category"
          defaultValue={
            expense.category
          }
          className="w-full border rounded-lg p-3"
        >
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
          defaultValue={
            expense.date
              ?.toISOString()
              .split("T")[0]
          }
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="notes"
          defaultValue={
            expense.notes ?? ""
          }
          rows={4}
          className="w-full border rounded-lg p-3"
        />

        <div>
          <h2 className="font-medium mb-2">
            Paid By
          </h2>

          <select
            name="paidById"
            defaultValue={
              expense.paidById
            }
            className="w-full border rounded-lg p-3"
          >
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
                    defaultChecked={
                      expense.participants.some(
                        (
                          participant
                        ) =>
                          participant.travelerId ===
                          traveler.id
                      )
                    }
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
          Save Changes
        </button>
      </form>
    </main>
  );
}