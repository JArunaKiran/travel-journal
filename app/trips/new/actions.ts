"use server";

import { redirect } from "next/navigation";
import { createTrip } from "@/services/tripService";

export async function createTripAction(
  formData: FormData
) {
  const title = formData.get("title") as string;
  const country = formData.get("country") as string;

  const startDateValue = formData.get("startDate") as string;
  const endDateValue = formData.get("endDate") as string;

  const startDate = startDateValue
    ? new Date(startDateValue)
    : undefined;

  const endDate = endDateValue
    ? new Date(endDateValue)
    : undefined;

  if (
    startDate &&
    endDate &&
    endDate < startDate
  ) {
    throw new Error(
      "End date cannot be before start date"
    );
  }
  await createTrip({
    title,
    country,
    startDate,
    endDate,
  });

  redirect("/");
}

//this file is about creating a server action
//form submit --> createTripAction() --> createTrip() --> SQLite
