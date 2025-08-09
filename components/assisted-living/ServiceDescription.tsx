import Image from 'next/image'

export default function ServiceDescription() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-6">
              A New Approach to Assisted Living
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At Silver Springs Residency, we've reimagined assisted living by creating real homes, not institutions. 
              Our two residential properties each feature 6 private bedrooms, creating an intimate environment where 
              residents receive personalized care while enjoying the comfort of a true home.
            </p>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              We believe that seniors thrive in environments that feel familiar and comfortable. Our homes provide 
              the perfect setting for meaningful relationships to form between residents and caregivers, while still 
              providing all the care services you would expect from a traditional assisted living facility.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Each resident receives an individualized care plan designed to support their unique needs while 
              promoting as much independence as possible.
            </p>
          </div>
          <div className="relative h-[400px] md:h-[500px]">
            <Image
              src="/cozy-senior-living.png"
              alt="Silver Springs Assisted Living"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
