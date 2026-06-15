import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getJournalEntryById,
} from "@/services/journalService";

type Props = {
  params: Promise<{
    id: string;
    journalId: string;
  }>;
};

export default async function TripJournalPage({
  params,
}: Props) {
  const {
    id,
    journalId,
  } = await params;

  const journal =
    await getJournalEntryById(
      journalId
    );

  if (!journal) {
    notFound();
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-8 bg-white text-black min-h-screen">
      <Link
        href={`/trips/${id}`}
        className="text-sm text-gray-500"
      >
        ← Back to Trip
      </Link>

      <div className="mt-6 rounded-2xl border p-6 bg-white shadow-sm">
        <h1 className="text-3xl font-bold">
          {journal.title}
        </h1>

        {journal.date && (
          <p className="mt-2 text-gray-500">
            {journal.date.toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )}
          </p>
        )}

        <div className="mt-6 whitespace-pre-wrap leading-relaxed">
          {journal.content}
        </div>
      </div>
    </main>
  );
}