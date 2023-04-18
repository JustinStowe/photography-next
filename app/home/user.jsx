import React from "react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { usePhotoStore } from "../stores/usePhotoStore";
import Link from "next/link";
import useSWR from "swr";

export default function UserHomePage() {
  const { getAllPhotos, user } = usePhotoStore();
  const { data: photos, error } = useSWR("/api/photos", getAllPhotos);

  if (error) return <div>Error loading photos</div>;
  if (!photos) return <div>Loading...</div>;

  const images = photos.map((photo) => {
    const image = new CloudinaryImage(photo.public_id, {
      cloudName: "dgs9byfnn",
    }).resize(fill().width(400).height(400));

    return (
      <div className="bg-black p-2 rounded-lg" key={photo._id}>
        <Link href={`/home/show/${photo._id}`}>
          <a>
            <CloudinaryImage src={image} />
          </a>
        </Link>
        <div>Title: {photo.title}</div>
        <div>Date: {photo.date}</div>
      </div>
    );
  });

  return (
    <div>
      <h1>Your Photo Collection</h1>

      {user.photos < 1 ? (
        <h1>YOU DON'T HAVE ANY PHOTOS YET</h1>
      ) : (
        <section className="flex flex-wrap grid-flow-row gap-2 justify-center">
          {images}
        </section>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {}, // You can pass some props to the component here
  };
}
