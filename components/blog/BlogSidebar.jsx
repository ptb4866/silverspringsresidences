import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export default function BlogSidebar({
  searchTerm = "",
  onSearchChange = () => {},
  categories = [],
  selectedCategory = "",
  onCategoryChange = () => {},
}) {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

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

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubscribing(true);

    try {
      // First, check if email already exists
      const { data: existingSubscriber } = await supabase
        .from("newsletter_subscribers")
        .select("email")
        .eq("email", email)
        .single();

      if (existingSubscriber) {
        toast({
          title: "Already Subscribed",
          description: "This email is already subscribed to our newsletter.",
          variant: "destructive",
        });
        return;
      }

      // Insert new subscriber
      const { error } = await supabase.from("newsletter_subscribers").insert([
        {
          email,
          subscribed_at: new Date().toISOString(),
          status: "active",
        },
      ]);

      if (error) {
        throw error;
      }

      // Call Supabase Edge Function to add to Resend contact list
      const { error: functionError } = await supabase.functions.invoke(
        "add-to-resend-contacts",
        {
          body: { email },
        }
      );

      if (functionError) {
        console.error("Error adding to Resend contacts:", functionError);
        // Still show success since the email was saved to database
      }

      toast({
        title: "Successfully Subscribed!",
        description:
          "Thank you for subscribing to our newsletter. You'll receive updates about senior care tips and resources.",
      });

      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      toast({
        title: "Subscription Failed",
        description:
          "There was an error subscribing to our newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

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
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
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
          <li>
            <button
              onClick={() => onCategoryChange("")}
              className={`flex items-center justify-between w-full text-left transition-colors ${
                selectedCategory === ""
                  ? "text-green-700 font-medium"
                  : "text-gray-700 hover:text-green-700"
              }`}
            >
              <span>All Categories</span>
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                {categories.reduce((sum, cat) => sum + cat.count, 0)}
              </span>
            </button>
          </li>
          {categories.map((category, index) => (
            <li key={index}>
              <button
                onClick={() => onCategoryChange(category.name)}
                className={`flex items-center justify-between w-full text-left transition-colors ${
                  selectedCategory === category.name
                    ? "text-green-700 font-medium"
                    : "text-gray-700 hover:text-green-700"
                }`}
              >
                <span>{category.name}</span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
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
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg shadow-md border border-green-100">
        <h3 className="text-lg font-bold mb-2 text-gray-800">
          Subscribe to Our Newsletter
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          Stay updated with our latest articles and senior care tips.
        </p>
        <form onSubmit={handleSubscribe} className="space-y-3">
          <div className="relative">
            <Mail
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white"
            disabled={isSubscribing}
          >
            {isSubscribing ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </div>
  );
}
