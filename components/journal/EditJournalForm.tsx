"use client";

import { useState } from "react";

import PhotoUpload from "./PhotoUpload";

type UploadedPhoto = {
  imageUrl: string;
  cloudinaryPublicId: string;
};

type Props = {
  action: (formData: FormData) => void;

  title: string;
  content: string;
  date?: string;
};

export default function EditJournalForm({
  action,
  title,
  content,
  date,
}: Props) {
  const [photos, setPhotos] = useState<
    UploadedPhoto[]
  >([]);

  return (
    <form
      action={action}
      className="space-y-4"
    >
      <input
        name="title"
        type="text"
        defaultValue={title}
        className="w-full border rounded-lg p-3"
        required
      />

      <input
        name="date"
        type="date"
        defaultValue={date}
        className="w-full border rounded-lg p-3"
      />

      <textarea
        name="content"
        rows={10}
        defaultValue={content}
        className="w-full border rounded-lg p-3"
        required
      />

      <PhotoUpload
        photos={photos}
        setPhotos={setPhotos}
      />

      {photos.map((photo) => (
        <div key={photo.imageUrl}>
          <input
            type="hidden"
            name="photoUrl"
            value={photo.imageUrl}
          />

          <input
            type="hidden"
            name="photoPublicId"
            value={
              photo.cloudinaryPublicId
            }
          />
        </div>
      ))}

      <button
        type="submit"
        className="
          w-full
          rounded-lg
          bg-black
          text-white
          p-3
        "
      >
        Save Changes
      </button>
    </form>
  );
}