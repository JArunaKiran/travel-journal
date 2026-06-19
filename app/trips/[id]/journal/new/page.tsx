import JournalForm from "@/components/journal/JournalForm";
import { createTripJournalEntryAction } from "./actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function NewJournalPage({
  params,
}: Props) {
  const { id } = await params;

  const createAction =
    createTripJournalEntryAction.bind(
      null,
      id
    );

  return (
    <main className="max-w-md mx-auto p-4 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Add Journal Entry
      </h1>

      <JournalForm
        action={createAction}
      />
    </main>
  );
}