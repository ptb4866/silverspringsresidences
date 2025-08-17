import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import ShareButton from "./ShareButton";

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
      const { data: existingSubscriber, error: checkError } = await supabase
        .from("newsletter_subscribers")
        .select("email")
        .eq("email", email)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        // PGRST116 is "not found" error, which is expected when email doesn't exist
        throw checkError;
      }

      if (existingSubscriber) {
        toast({
          title: "Already Subscribed!",
          description:
            "This email address is already subscribed to our newsletter. You're all set to receive our updates!",
        });
        setEmail("");
        return;
      }

      // Insert new subscriber
      const { error: insertError } = await supabase
        .from("newsletter_subscribers")
        .insert([
          {
            email,
            subscribed_at: new Date().toISOString(),
            status: "active",
          },
        ]);

      if (insertError) {
        // Check if it's a duplicate key error (email already exists)
        if (insertError.code === "23505") {
          toast({
            title: "Already Subscribed!",
            description:
              "This email address is already subscribed to our newsletter. You're all set to receive our updates!",
          });
          setEmail("");
          return;
        }
        throw insertError;
      }

      // Call Supabase Edge Function to add to Resend contact list
      const { data: functionData, error: functionError } =
        await supabase.functions.invoke("add-to-resend-contacts", {
          body: { email },
        });

      if (functionError) {
        console.error("Error adding to Resend contacts:", functionError);

        // Check if it's because contact already exists in Resend
        if (
          functionError.message &&
          functionError.message.includes("already exists")
        ) {
          toast({
            title: "Successfully Subscribed!",
            description:
              "You're now subscribed to our newsletter! You'll receive updates about senior care tips and resources.",
          });
        } else {
          // Still show success since the email was saved to database
          toast({
            title: "Successfully Subscribed!",
            description:
              "You're now subscribed to our newsletter! You'll receive updates about senior care tips and resources. (Note: There was a minor issue with our email service, but your subscription is active.)",
          });
        }
      } else {
        // Check the response from the function for more specific messages
        if (functionData?.message) {
          if (functionData.message.includes("already subscribed")) {
            toast({
              title: "Already Subscribed!",
              description:
                "This email address is already subscribed to our newsletter. You're all set to receive our updates!",
            });
          } else {
            toast({
              title: "Successfully Subscribed!",
              description:
                "You're now subscribed to our newsletter! You'll receive updates about senior care tips and resources.",
            });
          }
        } else {
          toast({
            title: "Successfully Subscribed!",
            description:
              "You're now subscribed to our newsletter! You'll receive updates about senior care tips and resources.",
          });
        }
      }

      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);

      // Provide more specific error messages based on the error type
      let errorTitle = "Subscription Failed";
      let errorDescription =
        "There was an error subscribing to our newsletter. Please try again.";

      if (error.code === "23505") {
        errorTitle = "Already Subscribed!";
        errorDescription =
          "This email address is already subscribed to our newsletter. You're all set to receive our updates!";
      } else if (error.message && error.message.includes("network")) {
        errorTitle = "Connection Error";
        errorDescription =
          "Please check your internet connection and try again.";
      } else if (error.message && error.message.includes("timeout")) {
        errorTitle = "Request Timeout";
        errorDescription =
          "The request took too long to complete. Please try again.";
      } else if (error.message && error.message.includes("already exists")) {
        errorTitle = "Already Subscribed!";
        errorDescription =
          "This email address is already subscribed to our newsletter. You're all set to receive our updates!";
      }

      toast({
        title: errorTitle,
        description: errorDescription,
        variant:
          errorTitle === "Already Subscribed!" ? "default" : "destructive",
      });

      if (errorTitle === "Already Subscribed!") {
        setEmail("");
      }
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
            <li key={index} className="group">
              <div className="flex items-start justify-between">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-gray-700 hover:text-green-700 transition-colors text-sm flex-1 mr-2"
                >
                  {post.title}
                </Link>
                <ShareButton
                  title={post.title}
                  url={`${
                    typeof window !== "undefined" ? window.location.origin : ""
                  }/blog/${post.slug}`}
                  description=""
                  image=""
                  variant="compact"
                />
              </div>
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
