import { prisma } from "@/lib/prisma";

export async function getTrips() {
  return prisma.trip.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
export async function createTrip(data: {
  title: string;
  country?: string;
  startDate?: Date;
  endDate?: Date;
}) {
  return prisma.trip.create({
    data,
  });
}
export async function getTripById(
  id: string
) {
  return prisma.trip.findUnique({
    where: {
      id,
    },
  });
}

//what this file does
// this is our first service
//the ui asks: "give me all trips"
//and the service will respond: getTrips()
//this keeps db logic separate from ui logic