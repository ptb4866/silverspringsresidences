import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";

export default function BlogGrid() {
  const blogPosts = [
    {
      title: "Understanding the Different Levels of Senior Care",
      excerpt:
        "From independent living to skilled nursing, learn about the various levels of senior care available and how to determine which is right for your loved one.",
      image: "/placeholder.svg?height=400&width=600",
      date: "August 1, 2025",
      author: "Dr. Sarah Johnson",
      slug: "understanding-senior-care-levels",
    },
    {
      title: "Creating a Smooth Transition to Assisted Living",
      excerpt:
        "Moving to assisted living can be challenging for seniors. Here are practical tips to help make the transition as smooth and comfortable as possible.",
      image: "/placeholder.svg?height=400&width=600",
      date: "July 15, 2025",
      author: "Michael Roberts",
      slug: "smooth-transition-to-assisted-living",
    },
    {
      title: "Nutrition Tips for Seniors: Eating Well as You Age",
      excerpt:
        "Proper nutrition is crucial for seniors' health and wellbeing. Discover practical advice for maintaining a balanced diet in your golden years.",
      image: "/placeholder.svg?height=400&width=600",
      date: "July 1, 2025",
      author: "Jessica Martinez, RD",
      slug: "senior-nutrition-tips",
    },
    {
      title: "Staying Active: Exercise Options for Seniors",
      excerpt:
        "Regular physical activity is essential at any age. Learn about safe, effective exercise options that are particularly beneficial for seniors.",
      image: "/placeholder.svg?height=400&width=600",
      date: "June 15, 2025",
      author: "Robert Lee, PT",
      slug: "senior-exercise-options",
    },
    {
      title: "Signs It Might Be Time for Assisted Living",
      excerpt:
        "Recognizing when a loved one might benefit from assisted living can be difficult. Here are key signs to watch for and how to start the conversation.",
      image: "/placeholder.svg?height=400&width=600",
      date: "June 1, 2025",
      author: "Dr. Sarah Johnson",
      slug: "signs-for-assisted-living",
    },
    {
      title: "The Benefits of Residential Care vs. Larger Facilities",
      excerpt:
        "Smaller residential care homes offer unique advantages compared to larger assisted living facilities. Discover why the home environment might be better for your loved one.",
      image: "/placeholder.svg?height=400&width=600",
      date: "May 15, 2025",
      author: "Michael Roberts",
      slug: "benefits-of-residential-care",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {blogPosts.map((post, index) => (
        <div
          key={index}
          className="bg-white rounded-lg overflow-hidden shadow-md"
        >
          <div className="relative h-48">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-green-700 transition-colors">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h3>

            <div className="flex items-center text-sm text-gray-500 mb-4">
              <div className="flex items-center mr-4">
                <Calendar size={16} className="mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <User size={16} className="mr-1" />
                <span>{post.author}</span>
              </div>
            </div>

            <p className="text-gray-600 mb-4">{post.excerpt}</p>

            <Link
              href={`/blog/${post.slug}`}
              className="text-green-700 font-medium hover:text-green-800 transition-colors"
            >
              Read More →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
