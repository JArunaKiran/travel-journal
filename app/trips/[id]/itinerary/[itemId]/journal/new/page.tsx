import { createItineraryJournalEntryAction } from "./actions";

type Props = {
  params: Promise<{
    id: string;
    itemId: string;
  }>;
};

export default async function NewItineraryJournalPage({
  params,
}: Props) {
  const { id, itemId } =
    await params;

  const createAction =
    createItineraryJournalEntryAction.bind(
      null,
      id,
      itemId
    );

  return (
    <main className="max-w-md mx-auto p-4 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Add Activity Journal
      </h1>

      <form
        action={createAction}
        className="space-y-4"
      >
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          name="date"
          type="date"
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="content"
          placeholder="Write your journal..."
          rows={8}
          className="w-full border rounded-lg p-3"
          required
        />

        <button
          type="submit"
          className="
            w-full
            rounded-lg
            bg-black
            text-white
            p-3
          "
        >
          Save Journal
        </button>
      </form>
    </main>
  );
}