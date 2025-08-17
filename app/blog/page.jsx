import { useSearchParams } from "react-router-dom";
import { useState, useMemo } from "react";
import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import Pagination from "@/components/blog/Pagination";
import BlogSidebar from "@/components/blog/BlogSidebar";

// Sample blog data - in a real app, this would come from a database
const allBlogPosts = [
  {
    title: "Understanding the Different Levels of Senior Care",
    excerpt:
      "From independent living to skilled nursing, learn about the various levels of senior care available and how to determine which is right for your loved one.",
    image: "/placeholder.svg?height=400&width=600",
    date: "August 1, 2025",
    author: "Dr. Sarah Johnson",
    slug: "understanding-senior-care-levels",
    category: "Assisted Living",
  },
  {
    title: "Creating a Smooth Transition to Assisted Living",
    excerpt:
      "Moving to assisted living can be challenging for seniors. Here are practical tips to help make the transition as smooth and comfortable as possible.",
    image: "/placeholder.svg?height=400&width=600",
    date: "July 15, 2025",
    author: "Michael Roberts",
    slug: "smooth-transition-to-assisted-living",
    category: "Assisted Living",
  },
  {
    title: "Nutrition Tips for Seniors: Eating Well as You Age",
    excerpt:
      "Proper nutrition is crucial for seniors' health and wellbeing. Discover practical advice for maintaining a balanced diet in your golden years.",
    image: "/placeholder.svg?height=400&width=600",
    date: "July 1, 2025",
    author: "Jessica Martinez, RD",
    slug: "senior-nutrition-tips",
    category: "Nutrition",
  },
  {
    title: "Staying Active: Exercise Options for Seniors",
    excerpt:
      "Regular physical activity is essential at any age. Learn about safe, effective exercise options that are particularly beneficial for seniors.",
    image: "/placeholder.svg?height=400&width=600",
    date: "June 15, 2025",
    author: "Robert Lee, PT",
    slug: "senior-exercise-options",
    category: "Senior Health",
  },
  {
    title: "Signs It Might Be Time for Assisted Living",
    excerpt:
      "Recognizing when a loved one might benefit from assisted living can be difficult. Here are key signs to watch for and how to start the conversation.",
    image: "/placeholder.svg?height=400&width=600",
    date: "June 1, 2025",
    author: "Dr. Sarah Johnson",
    slug: "signs-for-assisted-living",
    category: "Assisted Living",
  },
  {
    title: "The Benefits of Residential Care vs. Larger Facilities",
    excerpt:
      "Smaller residential care homes offer unique advantages compared to larger assisted living facilities. Discover why the home environment might be better for your loved one.",
    image: "/placeholder.svg?height=400&width=600",
    date: "May 15, 2025",
    author: "Michael Roberts",
    slug: "benefits-of-residential-care",
    category: "Assisted Living",
  },
  {
    title: "Memory Care: Specialized Support for Dementia Patients",
    excerpt:
      "Memory care units provide specialized support for seniors with dementia. Learn about the unique features and benefits of memory care programs.",
    image: "/placeholder.svg?height=400&width=600",
    date: "May 1, 2025",
    author: "Dr. Emily Chen",
    slug: "memory-care-dementia-support",
    category: "Memory Care",
  },
  {
    title: "Financial Planning for Senior Care: What You Need to Know",
    excerpt:
      "Understanding the costs of senior care and planning financially can be overwhelming. Get practical advice on budgeting and payment options.",
    image: "/placeholder.svg?height=400&width=600",
    date: "April 15, 2025",
    author: "Financial Advisor Mark Thompson",
    slug: "financial-planning-senior-care",
    category: "Caregiver Resources",
  },
  {
    title: "Technology in Senior Living: Enhancing Quality of Life",
    excerpt:
      "Modern technology is transforming senior living communities. Discover how smart home features and digital tools are improving residents' lives.",
    image: "/placeholder.svg?height=400&width=600",
    date: "April 1, 2025",
    author: "Tech Specialist Lisa Park",
    slug: "technology-senior-living",
    category: "Activities & Lifestyle",
  },
  {
    title: "Family Involvement in Senior Care Decisions",
    excerpt:
      "Making decisions about senior care often involves the whole family. Learn how to navigate these important conversations and decisions together.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 15, 2025",
    author: "Family Counselor Dr. James Wilson",
    slug: "family-involvement-senior-care",
    category: "Caregiver Resources",
  },
  {
    title: "The Importance of Social Connection in Senior Living",
    excerpt:
      "Social connections are vital for seniors' mental and emotional wellbeing. Explore how senior living communities foster meaningful relationships.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 1, 2025",
    author: "Social Worker Maria Rodriguez",
    slug: "social-connection-senior-living",
    category: "Activities & Lifestyle",
  },
  {
    title: "Preparing Your Home for Aging in Place",
    excerpt:
      "Many seniors prefer to age in their own homes. Learn about home modifications and support services that make this possible.",
    image: "/placeholder.svg?height=400&width=600",
    date: "February 15, 2025",
    author: "Home Safety Expert David Kim",
    slug: "aging-in-place-home-preparation",
    category: "Senior Health",
  },
];

export default function Blog() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const postsPerPage = 6;
  const currentPage = parseInt(searchParams.get("page")) || 1;

  // Filter posts based on search term and category
  const filteredPosts = useMemo(() => {
    let filtered = allBlogPosts;

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Calculate the range of posts to show
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Get unique categories with counts
  const categories = useMemo(() => {
    const categoryCounts = {};
    allBlogPosts.forEach((post) => {
      categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
    });

    return Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      count,
    }));
  }, []);

  return (
    <div className="pb-12">
      <BlogHero />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BlogGrid posts={currentPosts} />
            {totalPosts > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalPosts={totalPosts}
              />
            )}
            {totalPosts === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchTerm || selectedCategory
                    ? "No blog posts found matching your criteria."
                    : "No blog posts found."}
                </p>
                {(searchTerm || selectedCategory) && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("");
                    }}
                    className="mt-4 text-green-700 hover:text-green-800 underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>
          <BlogSidebar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </div>
    </div>
  );
}
