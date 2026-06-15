import { prisma } from "@/lib/prisma";

export async function getTravelersByTrip(
  tripId: string
) {
  return prisma.traveler.findMany({
    where: {
      tripId,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function createTraveler(
  data: {
    tripId: string;
    name: string;
  }
) {
  return prisma.traveler.create({
    data,
  });
}

export async function deleteTraveler(
  id: string
) {
  return prisma.traveler.delete({
    where: {
      id,
    },
  });
}