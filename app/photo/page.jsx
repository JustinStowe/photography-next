import { useRouter } from "next/router";
import { usePhotoStore } from "../../stores/usePhotoStore";
import Image from "next/image";

export default function Photo() {
  const router = useRouter();
  const { getPhotoById } = usePhotoStore();
  const { id } = router.query;
  const photo = getPhotoById(id);

  return (
    <div>
      <h1>{photo.title}</h1>
      <Image src={photo.image} alt={photo.title} />
      <p>{photo.date}</p>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const photo = await getPhotoById(params.id);
  return { props: { photo } };
}

export async function getStaticPaths() {
  const photos = await getAllPhotos();
  const paths = photos.map((photo) => ({ params: { id: photo.id } }));
  return { paths, fallback: false };
}
