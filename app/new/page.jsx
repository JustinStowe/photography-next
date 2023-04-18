import React, { useState, useEffect } from "react";
import { usePhotoStore } from "../stores/usePhotoStore";
import { useRouter } from "next/router";
import Image from "next/image";

export default function NewPhotoPage() {
  // console.log("user data @ newPhoto Page:", user);
  const { createNewPhoto, user } = usePhotoStore();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const cloudinaryWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dgs9byfnn",
        uploadPreset: "tajdjzcq",
        sources: ["local", "url"],
        folder: "user_images",
        clientAllowedFormats: ["images", "jpg", "png"],
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setImages((prevImages) => [...prevImages, result.info]);
          setFormData((prevData) => [...prevData, { title: "", date: "" }]);
        }
      }
    );

    cloudinaryWidget.open();
  }, []);

  const handleTitleChange = (index, value) => {
    const newData = [...formData];
    newData[index].title = value;
    setFormData(newData);
  };

  const handleDateChange = (index, value) => {
    const newData = [...formData];
    newData[index].date = value;
    setFormData(newData);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const newPhotoData = images.map((imageInfo, index) => ({
        title: formData[index].title,
        date: formData[index].date,
        image: imageInfo.secure_url,
        public_id: imageInfo.public_id,
      }));

      await createNewPhoto(newPhotoData);
      console.log("array of photos data @ newPhotoPage:", newPhotoData);
      router.push("/home");
    } catch (error) {
      console.error(error);
      setFormData({ ...formData, error: "Photo creation failed!" });
    }
  };

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="flex mx-auto gap-4 justify-center m-10">
          {images.map((imageInfo, index) => (
            <div
              className="flex flex-col items-center"
              key={imageInfo.public_id}
            >
              <Image
                src={imageInfo.secure_url}
                alt={`Uploaded image ${index}`}
                style={{ maxHeight: 200, maxWidth: "auto" }}
                className="flex justify-center"
              />
              <label>Title:</label>
              <input
                type="text"
                name={`title-${index}`}
                value={formData[index]?.title}
                onChange={(evt) => handleTitleChange(index, evt.target.value)}
                required
              />
              <label>Date:</label>
              <input
                type="text"
                name={`date-${index}`}
                value={formData[index]?.date}
                onChange={(evt) => handleDateChange(index, evt.target.value)}
              />
            </div>
          ))}
        </div>
        <button
          className="border-green-600 bg-green-900 justify-center mx-auto m-4"
          type="submit"
        ></button>
      </form>
    </div>
  );
}
