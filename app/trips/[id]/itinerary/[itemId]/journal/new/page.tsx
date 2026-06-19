import { createItineraryJournalEntryAction } from "./actions";
import JournalForm from "@/components/journal/JournalForm";

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
    <JournalForm
      action={createAction}
    />
    </main>
  );
}