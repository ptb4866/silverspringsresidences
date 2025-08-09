'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'

type AppContextType = {
  isMenuOpen: boolean
  toggleMenu: () => void
  testimonials: Testimonial[]
  blogPosts: BlogPost[]
  isLoading: boolean
  error: Error | null
}

type Testimonial = {
  id: number
  quote: string
  author: string
  relation: string
  image: string
}

type BlogPost = {
  id: number
  title: string
  slug: string
  excerpt: string
  content?: string
  author: string
  date: string
  image: string
  category: string
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }
  
  // Fetch testimonials and blog posts
  const { data: testimonials = [], isLoading: isLoadingTestimonials, error: testimonialsError } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      // This would be a real API call in production
      return [
        {
          id: 1,
          quote: "Moving my mother to Silver Springs was the best decision. The home environment is so much more comfortable than a large facility, and the care is exceptional.",
          author: "Margaret W.",
          relation: "Daughter of Resident",
          image: "/senior-woman-portrait.png"
        },
        {
          id: 2,
          quote: "I was hesitant about moving from my home, but Silver Springs has become my new home. I've made friends and the staff treats me like family.",
          author: "Robert J.",
          relation: "Resident",
          image: "/senior-man-portrait.png"
        },
        {
          id: 3,
          quote: "The personalized attention my father receives is remarkable. His specific needs are always addressed quickly and with compassion.",
          author: "Thomas B.",
          relation: "Son of Resident",
          image: "/middle-aged-man-portrait.png"
        }
      ]
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
  
  const { data: blogPosts = [], isLoading: isLoadingBlogPosts, error: blogPostsError } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      // This would be a real API call in production
      return [
        {
          id: 1,
          title: "Understanding the Different Levels of Senior Care",
          slug: "understanding-senior-care-levels",
          excerpt: "From independent living to skilled nursing, learn about the various levels of senior care available.",
          author: "Dr. Sarah Johnson",
          date: "August 1, 2025",
          image: "/placeholder.svg?height=400&width=600",
          category: "Senior Health"
        },
        {
          id: 2,
          title: "Creating a Smooth Transition to Assisted Living",
          slug: "smooth-transition-to-assisted-living",
          excerpt: "Moving to assisted living can be challenging for seniors. Here are practical tips to help.",
          author: "Michael Roberts",
          date: "July 15, 2025",
          image: "/placeholder.svg?height=400&width=600",
          category: "Assisted Living"
        },
        {
          id: 3,
          title: "Nutrition Tips for Seniors: Eating Well as You Age",
          slug: "senior-nutrition-tips",
          excerpt: "Proper nutrition is crucial for seniors' health and wellbeing.",
          author: "Jessica Martinez, RD",
          date: "July 1, 2025",
          image: "/placeholder.svg?height=400&width=600",
          category: "Nutrition"
        }
      ]
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
  
  const isLoading = isLoadingTestimonials || isLoadingBlogPosts
  const error = testimonialsError || blogPostsError
  
  const value = {
    isMenuOpen,
    toggleMenu,
    testimonials,
    blogPosts,
    isLoading,
    error: error as Error | null
  }
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
