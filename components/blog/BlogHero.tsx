export default function BlogHero() {
  return (
    <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-black">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=800&width=1600')",
          opacity: 0.7
        }}
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
          Our Blog
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
          Insights, tips, and stories about senior living and care
        </p>
      </div>
    </section>
  )
}
