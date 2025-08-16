import Image from "next/image";
import Link from "next/link";
import { Calendar, User } from "lucide-react";

export default function BlogGrid({ posts = [] }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post, index) => (
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
