import { prisma } from "@/lib/prisma";

export async function getTripJournalEntries(
  tripId: string
) {
  return prisma.journalEntry.findMany({
    where: {
      tripId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function createTripJournalEntry(
  data: {
    tripId: string;
    title: string;
    content: string;
    date?: Date;
  }
) {
  return prisma.journalEntry.create({
    data,
  });
}