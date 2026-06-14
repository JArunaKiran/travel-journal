"use client";

import { useState } from "react";

type Props = {
  action: (formData: FormData) => void;
};

export default function CreateTripForm({
  action,
}: Props) {
  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  const [error, setError] =
    useState("");

  function validateDates() {
    if (
      startDate &&
      endDate &&
      new Date(endDate) <
        new Date(startDate)
    ) {
      setError(
        "End date must be on or after the start date"
      );

      return false;
    }

    setError("");

    return true;
  }

  return (
    <form
      action={(formData) => {
        if (!validateDates()) {
          return;
        }

        action(formData);
      }}
      className="space-y-4"
    >
      <input
        name="title"
        type="text"
        placeholder="Trip Title"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="country"
        type="text"
        placeholder="Country"
        className="w-full border rounded-lg p-3"
      />

      <input
        name="startDate"
        type="date"
        value={startDate}
        onChange={(e) =>
          setStartDate(e.target.value)
        }
        className="w-full border rounded-lg p-3"
      />

      <input
        name="endDate"
        type="date"
        value={endDate}
        onChange={(e) =>
          setEndDate(e.target.value)
        }
        className="w-full border rounded-lg p-3"
      />

      {error && (
        <p className="text-red-600 text-sm">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-black text-white rounded-lg p-3"
      >
        Save Trip
      </button>
    </form>
  );
}