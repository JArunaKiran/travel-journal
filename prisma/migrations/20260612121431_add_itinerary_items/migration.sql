-- CreateTable
CREATE TABLE "ItineraryItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "activity" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "date" DATETIME,
    "time" TEXT,
    "notes" TEXT,
    "tripId" TEXT NOT NULL,
    CONSTRAINT "ItineraryItem_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
