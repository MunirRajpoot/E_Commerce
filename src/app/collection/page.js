"use client";
import Link from "next/link";
import Image from "next/image";

const collections = [
  {
    name: "Men’s Collection",
    slug: "mens",
    image: "/collectionImg/mens-collection.jpg",
  },
  {
    name: "Women’s Collection",
    slug: "womens",
    image: "/collectionImg/womens-collection.jpg",
  },
  {
    name: "Kids Collection",
    slug: "kids",
    image: "/collectionImg/kids-collection.avif",
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: "/collectionImg/accessories.jpg",
  },
  {
    name: "Home & Living",
    slug: "home-living",
    image: "/collectionImg/home-living.avif",
  },
  {
    name: "Tech & Gadgets",
    slug: "tech-gadgets",
    image: "/collectionImg/tech-gadgets.avif",
  },
];

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
        Explore Our Modern Collections
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Stylish, innovative, and curated for every lifestyle.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {collections.map((collection, index) => (
          <Link href={`/collection/${collection.slug}`} key={index}>
            <div className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer">
              {/* Image with hover slide + zoom */}
              <div className="overflow-hidden">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  width={600}
                  height={600}
                  className="w-full h-90 object-cover transform group-hover:scale-110 group-hover:translate-y-2 transition-all duration-700 ease-out"
                  priority={index === 0}
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500 flex items-center justify-center">
                <h2 className="text-white text-xl md:text-2xl font-semibold tracking-wide group-hover:translate-y-0 translate-y-4 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out">
                  {collection.name}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
