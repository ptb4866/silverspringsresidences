export default function PhotoGalleryHero() {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/senior-living-common-area-fireplace.png')",
          opacity: 0.7,
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
          Photo Gallery
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
          Take a virtual tour of our beautiful homes and amenities
        </p>
      </div>
    </section>
  );
}
