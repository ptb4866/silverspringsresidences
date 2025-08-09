export default function ServicesHero() {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=1600')",
          opacity: 0.7,
        }}
      />

      {/* Content Overlay */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
          Services & Amenities
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
          Exceptional care and comfort in a homelike environment
        </p>
      </div>
    </section>
  );
}
