"use client";
import { useState, useEffect } from "react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import axios from "axios";

export default function PublicHomePage() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDefaultPhotos() {
      try {
        const res = await axios.get(
          "https://res.cloudinary.com/dgs9byfnn/image/list/portfolio.json"
        );
        const { resources } = res.data;
        const photoList = resources.map((resource) => {
          const image = new CloudinaryImage(resource.public_id, {
            cloudName: "dgs9byfnn",
          }).resize(fill().width(400).height(400));
          return (
            <div className="bg-black p-4 rounded-lg" key={resource.public_id}>
              <AdvancedImage key={resource.public_id} cldImg={image} />
            </div>
          );
        });
        setImages(photoList);
      } catch (error) {
        console.error("Error fetching default photos:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getDefaultPhotos();
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      <h1 className="m-8 border-gray-800 border-solid bg-black p-2 w-1/2 mx-auto rounded-xl">
        A sample of my photography portfolio
      </h1>
      <section className="flex flex-wrap grid-flow-row gap-2 justify-center">
        {images}
      </section>
    </div>
  );
}
