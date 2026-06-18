import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "./userService";

export async function getTrips() {
  const user = 
    await getCurrentUser();
  
  if(!user){
    return [];
  }
  return prisma.trip.findMany({
    where: {
      userId: user.id,
    },
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
  const user =
    await getCurrentUser();

    if(!user)
      {throw new Error("User not authenticated");}

  return prisma.trip.create({
    data: {
      ...data,
      userId: user.id,
    },
    
  });
}
export async function getTripById(
  id: string
) {
  const user = 
    await getCurrentUser();
  
  if(!user){
    return null;
  }

  return prisma.trip.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });
}
export async function deleteTrip(
  tripId: string
) {
  await prisma.itineraryItem.deleteMany({
    where: {
      tripId,
    },
  });

  await prisma.journalEntry.deleteMany({
    where: {
      tripId,
    },
  });

  return prisma.trip.delete({
    where: {
      id: tripId,
    },
  });
}

//what this file does
// this is our first service
//the ui asks: "give me all trips"
//and the service will respond: getTrips()
//this keeps db logic separate from ui logic