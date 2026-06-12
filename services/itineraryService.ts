import { prisma } from "@/lib/prisma";

export async function getItineraryItemsByTrip(
  tripId: string
) {
  return prisma.itineraryItem.findMany({
    where: {
      tripId,
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