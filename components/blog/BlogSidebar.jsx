import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function BlogSidebar() {
  const categories = [
    { name: "Senior Health", count: 12 },
    { name: "Assisted Living", count: 8 },
    { name: "Caregiver Resources", count: 10 },
    { name: "Memory Care", count: 6 },
    { name: "Nutrition", count: 7 },
    { name: "Activities & Lifestyle", count: 9 },
  ];

  const recentPosts = [
    {
      title: "Understanding the Different Levels of Senior Care",
      slug: "understanding-senior-care-levels",
    },
    {
      title: "Creating a Smooth Transition to Assisted Living",
      slug: "smooth-transition-to-assisted-living",
    },
    {
      title: "Nutrition Tips for Seniors: Eating Well as You Age",
      slug: "senior-nutrition-tips",
    },
    {
      title: "Staying Active: Exercise Options for Seniors",
      slug: "senior-exercise-options",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Search</h3>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search articles..."
            className="pr-10"
          />
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <Link
                href={`/blog/category/${category.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="flex items-center justify-between text-gray-700 hover:text-green-700 transition-colors"
              >
                <span>{category.name}</span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4 text-gray-800">Recent Posts</h3>
        <ul className="space-y-4">
          {recentPosts.map((post, index) => (
            <li key={index}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-gray-700 hover:text-green-700 transition-colors text-sm"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-green-50 p-6 rounded-lg shadow-md border border-green-100">
        <h3 className="text-lg font-bold mb-2 text-gray-800">
          Subscribe to Our Newsletter
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          Stay updated with our latest articles and senior care tips.
        </p>
        <div className="space-y-3">
          <Input type="email" placeholder="Your email address" />
          <Button className="w-full bg-green-700 hover:bg-green-800">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
}
