"use client";

import { CldUploadWidget } from "next-cloudinary";

type UploadedPhoto = {
  imageUrl: string;
  cloudinaryPublicId: string;
};

type Props = {
  photos: UploadedPhoto[];
  setPhotos: React.Dispatch<
    React.SetStateAction<UploadedPhoto[]>
  >;
};

export default function PhotoUpload({
  photos,
  setPhotos,
}: Props) {
  return (
    <div className="space-y-3">
      <CldUploadWidget
        uploadPreset={
          process.env
            .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
        }
        onSuccess={(result: any) => {
          const info = result?.info;

          if (!info) return;

          setPhotos((current) => [
            ...current,
            {
              imageUrl: info.secure_url,
              cloudinaryPublicId:
                info.public_id,
            },
          ]);
        }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="
              w-full
              rounded-lg
              border
              p-3
            "
          >
            Upload Photos
          </button>
        )}
      </CldUploadWidget>

      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {photos.map((photo) => (
            <img
              key={photo.imageUrl}
              src={photo.imageUrl}
              alt=""
              className="
                h-24
                w-full
                object-cover
                rounded
              "
            />
          ))}
        </div>
      )}
    </div>
  );
}