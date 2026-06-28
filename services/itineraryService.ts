import { prisma } from "@/lib/prisma";

export async function getItineraryItemsByTrip(
  tripId: string
) {
  return prisma.itineraryItem.findMany({
    where: {
      tripId,
    },

    include: {
      journalEntries: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
      _count: {
        select: {
          journalEntries: true,
        },
      },
    },

    orderBy: [
      {
        date: "asc",
      },
      {
        time: "asc",
      },
    ],
  });
}

export async function createItineraryItem(data: {
  tripId: string;
  activity:
    | "TRAVEL"
    | "CHECK_IN"
    | "CHECK_OUT"
    | "EXPLORE"
    | "MEAL";
  place: string;
  date?: Date;
  time?: string;
  notes?: string;
}) {
  return prisma.itineraryItem.create({
    data,
  });
}
export async function deleteItineraryItem(
  id: string
) {
  return prisma.itineraryItem.delete({
    where: {
      id,
    },
  });
}
export async function deleteTripItinerary(
  tripId: string
) {
  return prisma.itineraryItem.deleteMany({
    where: {
      tripId,
    },
  });
}
export async function getItineraryItemById(
  id: string
) {
  return prisma.itineraryItem.findUnique({
    where: {
      id,
    },
  });
}
export async function updateItineraryItem(
  id: string,
  data: {
    activity:
      | "TRAVEL"
      | "CHECK_IN"
      | "CHECK_OUT"
      | "EXPLORE"
      | "MEAL";
    place: string;
    date?: Date;
    time?: string;
    notes?: string;
  }
) {
  return prisma.itineraryItem.update({
    where: {
      id,
    },
    data,
  });
}
export async function toggleItineraryItemCompletion(
  id: string
) {
  const item =
    await prisma.itineraryItem.findUnique({
      where: {
        id,
      },
      select: {
        completed: true,
      },
    });

  if (!item) {
    throw new Error(
      "Itinerary item not found"
    );
  }

  return prisma.itineraryItem.update({
    where: {
      id,
    },
    data: {
      completed: !item.completed,
    },
  });
}