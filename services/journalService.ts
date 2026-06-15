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
export async function deleteJournalEntry(
  id: string
) {
  return prisma.journalEntry.delete({
    where: {
      id,
    },
  });
}
export async function createItineraryJournalEntry(
  data: {
    itineraryItemId: string;
    title: string;
    content: string;
    date?: Date;
  }
) {
  return prisma.journalEntry.create({
    data,
  });
}
export async function getItineraryJournalEntries(
  itineraryItemId: string
) {
  return prisma.journalEntry.findMany({
    where: {
      itineraryItemId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}