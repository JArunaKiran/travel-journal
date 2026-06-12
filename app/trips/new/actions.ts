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

  await createTrip({
    title,
    country,
    startDate: startDateValue
      ? new Date(startDateValue)
      : undefined,
    endDate: endDateValue
      ? new Date(endDateValue)
      : undefined,
  });

  redirect("/");
}

//this file is about creating a server action
//form submit --> createTripAction() --> createTrip() --> SQLite
