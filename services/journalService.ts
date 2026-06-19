import { deleteCloudinaryImage } from "@/lib/cloudinary";
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
  const journal = 
    await prisma.journalEntry.findUnique({
      where: {
        id,
      },
      include: {
        photos: true,
      },
    });
    if(!journal){
      return;
    }
    for(const photo of journal.photos){
      if(
        photo.cloudinaryPublicId
      ) {
        await deleteCloudinaryImage(
          photo.cloudinaryPublicId
        );
      }
    }
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
    photos?: {
      imageUrl: string;
      cloudinaryPublicId?: string;
    }[];
  }
) {
  const {
    photos = [],
    ...journalData
  } = data;
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
export async function getJournalEntryWithPhotos(
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
export async function deleteJournalPhoto(
  photoId: string
) {
  const photo =
    await prisma.journalPhoto.findUnique({
      where: {
        id: photoId,
      },
    });

  if (!photo) {
    return;
  }

  if (photo.cloudinaryPublicId) {
    await deleteCloudinaryImage(
      photo.cloudinaryPublicId
    );
  }

  return prisma.journalPhoto.delete({
    where: {
      id: photoId,
    },
  });
}