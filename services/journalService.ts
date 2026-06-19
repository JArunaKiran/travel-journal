import { prisma } from "@/lib/prisma";

export async function getTripJournalEntries(
  tripId: string
) {
  return prisma.journalEntry.findMany({
    where: {
      tripId,
    },
    include: {
      photos: true,
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
    photos?: {
      imageUrl: string;
      cloudinaryPublicId?: string;
    }[];
  }
) {
  const {
    photos = [],
    ...journalData
  }= data;

  return prisma.journalEntry.create({
    data: {
      ...journalData,
      photos: {
        create: photos,
      },
    },
    include: {
      photos: true,
    },
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
    include: {
      photos: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
export async function getLatestItineraryJournalEntry(
  itineraryItemId: string
) {
  return prisma.journalEntry.findFirst({
    where: {
      itineraryItemId,
    },
    include: {
      photos: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
export async function getJournalEntryById(
  id: string
) {
  return prisma.journalEntry.findUnique({
    where: {
      id,
    },
    include: {
      photos: true,
    },
  });
}
export async function updateJournalEntry(
  id: string,
  data: {
    title: string;
    content: string;
    date?: Date;
  }
) {
  return prisma.journalEntry.update({
    where: {
      id,
    },
    data,
  });
}