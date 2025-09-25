"use client";
import { useParams } from "next/navigation";
import Image from "next/image";

// helper function to format slug into title
function formatSlug(slug) {
  return slug
    .replaceAll("-", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// you can map slugs to background images
const collectionImages = {
  mens: "/collectionImg/mens-collection.jpg",
  womens: "/collectionImg/womens-collection.jpg",
  kids: "/collectionImg/kids-collection.avif",
  accessories: "/collectionImg/accessories.jpg",
  "home-living": "/collectionImg/home-living.avif",
  "tech-gadgets": "/collectionImg/tech-gadgets.avif",
};

export default function CollectionPage() {
  const { slug } = useParams();
  const title = formatSlug(slug);
  const bgImage = collectionImages[slug] || "/collectionImg/default.jpg";

  return (
    <div>
      {/* Hero Section with Background Image */}
      <div className="relative h-[60vh] md:h-[60vh] rounded-xl overflow-hidden mx-5 my-4">
        <Image
          src={bgImage}
          alt={title}
          fill
          priority
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4">
            {title} Collection
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Explore our curated {title} collection with the best picks for you.
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center text-gray-500">
          Products for <span className="font-semibold">{title}</span> will go here.
        </div>
      </div>
    </div>
  );
}
