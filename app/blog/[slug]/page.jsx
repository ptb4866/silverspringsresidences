import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Share2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Sample blog data - in a real app, this would come from a database
const allBlogPosts = [
  {
    title: "Understanding the Different Levels of Senior Care",
    excerpt:
      "From independent living to skilled nursing, learn about the various levels of senior care available and how to determine which is right for your loved one.",
    content: `
      <p>When it comes to senior care, understanding the different levels available is crucial for making informed decisions about your loved one's care needs. The senior care spectrum ranges from minimal assistance to comprehensive medical care, each designed to meet specific needs and preferences.</p>
      
      <h2>Independent Living</h2>
      <p>Independent living communities are perfect for seniors who are still active and self-sufficient but want the convenience of maintenance-free living and social opportunities. These communities typically offer:</p>
      <ul>
        <li>Private apartments or cottages</li>
        <li>Housekeeping and maintenance services</li>
        <li>Social activities and amenities</li>
        <li>Dining options</li>
        <li>Transportation services</li>
      </ul>
      
      <h2>Assisted Living</h2>
      <p>Assisted living bridges the gap between independent living and nursing homes. Residents receive help with daily activities while maintaining independence. Services include:</p>
      <ul>
        <li>Personal care assistance (bathing, dressing, medication)</li>
        <li>24-hour staff availability</li>
        <li>Three meals daily</li>
        <li>Housekeeping and laundry</li>
        <li>Social and recreational activities</li>
      </ul>
      
      <h2>Memory Care</h2>
      <p>Specialized memory care units provide support for seniors with Alzheimer's disease, dementia, and other memory-related conditions. These facilities offer:</p>
      <ul>
        <li>Secure environments to prevent wandering</li>
        <li>Specialized staff training in dementia care</li>
        <li>Structured daily routines</li>
        <li>Memory-enhancing activities</li>
        <li>Family support and education</li>
      </ul>
      
      <h2>Skilled Nursing</h2>
      <p>Skilled nursing facilities provide the highest level of care outside of a hospital. They're appropriate for seniors who need:</p>
      <ul>
        <li>24-hour medical supervision</li>
        <li>Rehabilitation services</li>
        <li>Complex medical care</li>
        <li>Post-hospital recovery</li>
        <li>Long-term medical management</li>
      </ul>
      
      <h2>How to Choose the Right Level</h2>
      <p>When evaluating care options, consider these factors:</p>
      <ul>
        <li><strong>Current health status:</strong> Assess physical and cognitive abilities</li>
        <li><strong>Future needs:</strong> Consider how needs might change over time</li>
        <li><strong>Budget:</strong> Different levels have varying costs</li>
        <li><strong>Location:</strong> Proximity to family and medical facilities</li>
        <li><strong>Personal preferences:</strong> Lifestyle and social needs</li>
      </ul>
      
      <p>Remember, the goal is to find the right balance between independence and support, ensuring your loved one receives the care they need while maintaining the highest possible quality of life.</p>
    `,
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
    content: `
      <p>Transitioning to assisted living is a significant life change that can be both exciting and challenging. With proper planning and support, this transition can be made much smoother for both the senior and their family members.</p>
      
      <h2>Preparing for the Move</h2>
      <p>Preparation is key to a successful transition. Start planning well in advance to reduce stress and ensure nothing is overlooked.</p>
      
      <h3>Involve Your Loved One</h3>
      <p>Include your loved one in the decision-making process as much as possible. This helps them feel in control and reduces anxiety about the change.</p>
      
      <h3>Visit Multiple Facilities</h3>
      <p>Take the time to visit several assisted living communities. Pay attention to:</p>
      <ul>
        <li>Staff friendliness and responsiveness</li>
        <li>Cleanliness and maintenance</li>
        <li>Available activities and amenities</li>
        <li>Meal quality and dining options</li>
        <li>Overall atmosphere and resident satisfaction</li>
      </ul>
      
      <h2>Downsizing and Moving</h2>
      <p>Moving from a family home to an assisted living apartment often requires significant downsizing.</p>
      
      <h3>Start Early</h3>
      <p>Begin the downsizing process several weeks before the move. This allows time to make thoughtful decisions about what to keep, donate, or give to family members.</p>
      
      <h3>Focus on Comfort</h3>
      <p>When selecting items to bring, prioritize comfort and familiarity:</p>
      <ul>
        <li>Favorite furniture pieces that fit the new space</li>
        <li>Personal photos and mementos</li>
        <li>Comfortable bedding and linens</li>
        <li>Books, puzzles, and other hobbies</li>
      </ul>
      
      <h2>The First Few Weeks</h2>
      <p>The initial adjustment period is crucial for long-term success.</p>
      
      <h3>Stay Connected</h3>
      <p>Visit frequently during the first few weeks, but also encourage independence. Balance support with allowing your loved one to explore their new community.</p>
      
      <h3>Encourage Participation</h3>
      <p>Help your loved one get involved in activities and social events. This is the best way to make new friends and feel at home.</p>
      
      <h3>Be Patient</h3>
      <p>Adjustment takes time. Some seniors adapt quickly, while others may need several months to feel comfortable in their new environment.</p>
      
      <h2>Supporting the Transition</h2>
      <p>Family support plays a crucial role in the success of this transition.</p>
      
      <h3>Communicate Regularly</h3>
      <p>Maintain regular communication through visits, phone calls, and video chats. This helps your loved one feel connected and supported.</p>
      
      <h3>Address Concerns Promptly</h3>
      <p>If your loved one has concerns or complaints, address them quickly with the facility staff. Open communication helps resolve issues before they become major problems.</p>
      
      <h3>Celebrate Small Victories</h3>
      <p>Acknowledge and celebrate the positive aspects of the transition, such as making new friends or participating in activities.</p>
      
      <p>Remember, every transition is unique, and what works for one person may not work for another. The key is to be flexible, patient, and supportive throughout the process.</p>
    `,
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
    content: `
      <p>As we age, our nutritional needs change, and maintaining a healthy diet becomes even more important for overall health and wellbeing. Good nutrition can help prevent chronic diseases, maintain energy levels, and support cognitive function.</p>
      
      <h2>Understanding Changing Nutritional Needs</h2>
      <p>As we age, several factors affect our nutritional requirements:</p>
      <ul>
        <li>Slower metabolism</li>
        <li>Reduced appetite</li>
        <li>Changes in taste and smell</li>
        <li>Medication interactions</li>
        <li>Digestive changes</li>
      </ul>
      
      <h2>Essential Nutrients for Seniors</h2>
      
      <h3>Protein</h3>
      <p>Protein is crucial for maintaining muscle mass and strength. Good sources include:</p>
      <ul>
        <li>Lean meats and poultry</li>
        <li>Fish and seafood</li>
        <li>Eggs</li>
        <li>Legumes and beans</li>
        <li>Greek yogurt and cottage cheese</li>
      </ul>
      
      <h3>Calcium and Vitamin D</h3>
      <p>These nutrients are essential for bone health and preventing osteoporosis:</p>
      <ul>
        <li>Dairy products (milk, cheese, yogurt)</li>
        <li>Fortified plant-based milks</li>
        <li>Leafy green vegetables</li>
        <li>Fatty fish</li>
        <li>Egg yolks</li>
      </ul>
      
      <h3>Fiber</h3>
      <p>Fiber helps maintain digestive health and can prevent constipation:</p>
      <ul>
        <li>Whole grains</li>
        <li>Fruits and vegetables</li>
        <li>Legumes</li>
        <li>Nuts and seeds</li>
      </ul>
      
      <h2>Practical Eating Tips</h2>
      
      <h3>Small, Frequent Meals</h3>
      <p>Instead of three large meals, try eating smaller portions more frequently throughout the day. This can help with appetite and digestion.</p>
      
      <h3>Stay Hydrated</h3>
      <p>Dehydration is common among seniors. Aim for 6-8 glasses of water daily, and include other fluids like herbal tea and broth.</p>
      
      <h3>Make Meals Enjoyable</h3>
      <p>Create a pleasant dining environment:</p>
      <ul>
        <li>Set the table nicely</li>
        <li>Eat with others when possible</li>
        <li>Try new recipes and flavors</li>
        <li>Listen to music while eating</li>
      </ul>
      
      <h2>Special Considerations</h2>
      
      <h3>Medication Interactions</h3>
      <p>Some medications can affect appetite or interact with certain foods. Always consult with your healthcare provider about potential interactions.</p>
      
      <h3>Dental Health</h3>
      <p>Dental problems can make eating difficult. Choose softer foods when needed and maintain good oral hygiene.</p>
      
      <h3>Budget-Friendly Options</h3>
      <p>Eating well doesn't have to be expensive:</p>
      <ul>
        <li>Buy seasonal produce</li>
        <li>Use frozen vegetables and fruits</li>
        <li>Cook in batches and freeze portions</li>
        <li>Look for sales and discounts</li>
      </ul>
      
      <h2>When to Seek Help</h2>
      <p>Consult with a healthcare provider or registered dietitian if you experience:</p>
      <ul>
        <li>Significant weight loss</li>
        <li>Loss of appetite</li>
        <li>Difficulty swallowing</li>
        <li>Persistent digestive problems</li>
        <li>Nutritional deficiencies</li>
      </ul>
      
      <p>Remember, good nutrition is an investment in your health and quality of life. Small changes can make a big difference in how you feel and function.</p>
    `,
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
    content: `
      <p>Physical activity is one of the most important factors in maintaining health and independence as we age. Regular exercise can help prevent chronic diseases, improve balance and coordination, boost mood, and enhance overall quality of life.</p>
      
      <h2>Benefits of Exercise for Seniors</h2>
      <p>Regular physical activity provides numerous benefits for older adults:</p>
      <ul>
        <li><strong>Improved cardiovascular health:</strong> Reduces risk of heart disease and stroke</li>
        <li><strong>Better balance and coordination:</strong> Helps prevent falls and injuries</li>
        <li><strong>Increased strength and flexibility:</strong> Makes daily activities easier</li>
        <li><strong>Enhanced mental health:</strong> Reduces symptoms of depression and anxiety</li>
        <li><strong>Better sleep:</strong> Improves sleep quality and duration</li>
        <li><strong>Weight management:</strong> Helps maintain healthy body weight</li>
      </ul>
      
      <h2>Safe Exercise Options</h2>
      
      <h3>Walking</h3>
      <p>Walking is one of the best exercises for seniors. It's low-impact, requires no special equipment, and can be done almost anywhere. Start with short walks and gradually increase duration and intensity.</p>
      
      <h3>Water Aerobics</h3>
      <p>Water provides natural resistance and buoyancy, making it ideal for seniors with joint pain or mobility issues. Water aerobics classes are often available at local pools and community centers.</p>
      
      <h3>Tai Chi</h3>
      <p>This gentle martial art focuses on slow, controlled movements and deep breathing. It's excellent for improving balance, flexibility, and mental focus.</p>
      
      <h3>Strength Training</h3>
      <p>Light strength training with resistance bands or small weights helps maintain muscle mass and bone density. Focus on major muscle groups and use proper form.</p>
      
      <h3>Yoga</h3>
      <p>Gentle yoga classes designed for seniors can improve flexibility, balance, and relaxation. Many poses can be modified for different ability levels.</p>
      
      <h2>Getting Started Safely</h2>
      
      <h3>Consult Your Doctor</h3>
      <p>Before starting any new exercise program, especially if you have health conditions, consult with your healthcare provider.</p>
      
      <h3>Start Slowly</h3>
      <p>Begin with short sessions of 10-15 minutes and gradually increase duration and intensity. Listen to your body and don't push through pain.</p>
      
      <h3>Warm Up and Cool Down</h3>
      <p>Always include a 5-10 minute warm-up and cool-down period to prepare your body and prevent injury.</p>
      
      <h3>Stay Hydrated</h3>
      <p>Drink water before, during, and after exercise, even if you don't feel thirsty.</p>
      
      <h2>Exercise Guidelines for Seniors</h2>
      <p>The American Heart Association recommends:</p>
      <ul>
        <li><strong>Aerobic activity:</strong> 150 minutes of moderate-intensity exercise per week</li>
        <li><strong>Strength training:</strong> 2-3 sessions per week</li>
        <li><strong>Balance exercises:</strong> 3 or more days per week</li>
        <li><strong>Flexibility:</strong> Stretching exercises 2-3 days per week</li>
      </ul>
      
      <h2>Making Exercise Enjoyable</h2>
      
      <h3>Find Activities You Enjoy</h3>
      <p>Choose exercises that you find enjoyable and can stick with long-term. This might include dancing, gardening, or playing with grandchildren.</p>
      
      <h3>Exercise with Others</h3>
      <p>Join group classes or exercise with friends and family. Social interaction makes exercise more enjoyable and helps with accountability.</p>
      
      <h3>Set Realistic Goals</h3>
      <p>Set achievable goals and celebrate your progress. Remember that any amount of physical activity is better than none.</p>
      
      <h2>When to Stop</h2>
      <p>Stop exercising and seek medical attention if you experience:</p>
      <ul>
        <li>Chest pain or pressure</li>
        <li>Shortness of breath</li>
        <li>Dizziness or lightheadedness</li>
        <li>Severe muscle or joint pain</li>
        <li>Irregular heartbeat</li>
      </ul>
      
      <p>Remember, it's never too late to start exercising. Even small amounts of physical activity can provide significant health benefits for seniors.</p>
    `,
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
    content: `
      <p>Deciding when it's time for assisted living is one of the most challenging decisions families face. While every situation is unique, there are common signs that may indicate it's time to consider this option.</p>
      
      <h2>Physical Signs</h2>
      
      <h3>Declining Personal Hygiene</h3>
      <p>Noticeable changes in grooming habits, such as wearing the same clothes repeatedly, not bathing regularly, or neglecting dental care, can indicate difficulty with daily self-care tasks.</p>
      
      <h3>Mobility Issues</h3>
      <p>Difficulty walking, frequent falls, or trouble getting up from chairs or beds may suggest that the home environment is no longer safe or manageable.</p>
      
      <h3>Weight Loss or Poor Nutrition</h3>
      <p>Unexplained weight loss, spoiled food in the refrigerator, or difficulty preparing meals can indicate challenges with nutrition and meal preparation.</p>
      
      <h2>Cognitive and Behavioral Changes</h2>
      
      <h3>Memory Problems</h3>
      <p>Forgetting to take medications, missing appointments, or getting lost in familiar places may indicate cognitive decline that requires supervision.</p>
      
      <h3>Confusion or Disorientation</h3>
      <p>Becoming confused about time, place, or people, especially in the evening (sundowning), can be a sign of dementia or other cognitive issues.</p>
      
      <h3>Changes in Personality</h3>
      <p>Unusual irritability, anxiety, or withdrawal from social activities may indicate underlying health issues or difficulty coping with daily challenges.</p>
      
      <h2>Safety Concerns</h2>
      
      <h3>Home Safety Issues</h3>
      <p>Evidence of accidents, such as burns from cooking, unexplained bruises, or difficulty managing stairs, suggests the home may no longer be safe.</p>
      
      <h3>Driving Concerns</h3>
      <p>Recent accidents, traffic violations, or family concerns about driving ability may indicate it's time to stop driving and consider alternative transportation options.</p>
      
      <h3>Medication Management</h3>
      <p>Difficulty remembering to take medications, taking incorrect dosages, or mixing up medications can be dangerous and may require professional supervision.</p>
      
      <h2>Social and Emotional Factors</h2>
      
      <h3>Social Isolation</h3>
      <p>Withdrawing from friends, family, and social activities can lead to depression and cognitive decline. Assisted living communities provide built-in social opportunities.</p>
      
      <h3>Caregiver Stress</h3>
      <p>If family caregivers are experiencing burnout, health problems, or difficulty balancing caregiving with other responsibilities, it may be time to consider professional care.</p>
      
      <h3>Loneliness</h3>
      <p>Expressing feelings of loneliness or a desire for more social interaction may indicate that assisted living could provide the companionship and activities they're seeking.</p>
      
      <h2>Financial and Practical Considerations</h2>
      
      <h3>Difficulty Managing Finances</h3>
      <p>Late bill payments, unusual spending patterns, or difficulty balancing checkbooks may indicate cognitive decline or overwhelm with financial responsibilities.</p>
      
      <h3>Home Maintenance Issues</h3>
      <p>Neglected home repairs, difficulty with household chores, or safety hazards in the home may suggest that the home environment is becoming unmanageable.</p>
      
      <h2>How to Start the Conversation</h2>
      
      <h3>Choose the Right Time</h3>
      <p>Have the conversation when everyone is calm and well-rested, not during a crisis or stressful situation.</p>
      
      <h3>Focus on Benefits</h3>
      <p>Emphasize the positive aspects of assisted living, such as social opportunities, safety, and relief from daily responsibilities.</p>
      
      <h3>Involve Your Loved One</h3>
      <p>Include your loved one in the decision-making process as much as possible. Visit facilities together and discuss preferences and concerns.</p>
      
      <h3>Seek Professional Guidance</h3>
      <p>Consult with healthcare providers, social workers, or senior care advisors who can provide objective guidance and resources.</p>
      
      <h2>Making the Decision</h2>
      <p>Remember that the decision to move to assisted living is often made gradually, not overnight. Start the conversation early, gather information, and involve your loved one in the process. The goal is to ensure safety, health, and quality of life for everyone involved.</p>
      
      <p>If you're seeing multiple signs from different categories, it may be time to seriously consider assisted living options. Early planning and open communication can make the transition smoother for everyone involved.</p>
    `,
    image: "/placeholder.svg?height=400&width=600",
    date: "June 1, 2025",
    author: "Dr. Sarah Johnson",
    slug: "signs-for-assisted-living",
    category: "Assisted Living",
  },
  // Add more blog posts with full content here...
];

export default function BlogPost() {
  const { slug } = useParams();

  // Find the blog post by slug
  const post = allBlogPosts.find((post) => post.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link to="/blog">
            <Button className="flex items-center gap-2">
              <ArrowLeft size={16} />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center text-green-700 hover:text-green-800 mb-6 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span>{post.author}</span>
              </div>
              {post.category && (
                <div className="flex items-center">
                  <Tag size={16} className="mr-2" />
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Share2 size={16} />
                Share
              </Button>
            </div>

            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    About the Author
                  </h3>
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <User size={20} className="text-green-700" />
                    </div>
                    <div>
                      <p className="font-medium">{post.author}</p>
                      <p className="text-sm text-gray-600">
                        Senior Care Expert
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
                  <div className="space-y-4">
                    {allBlogPosts
                      .filter((p) => p.slug !== slug)
                      .slice(0, 3)
                      .map((relatedPost, index) => (
                        <Link
                          key={index}
                          to={`/blog/${relatedPost.slug}`}
                          className="block group"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0">
                              <img
                                src={relatedPost.image}
                                alt={relatedPost.title}
                                className="w-full h-full object-cover rounded"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-800 group-hover:text-green-700 transition-colors line-clamp-2">
                                {relatedPost.title}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1">
                                {relatedPost.date}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
