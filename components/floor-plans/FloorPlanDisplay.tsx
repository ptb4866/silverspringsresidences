'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export default function FloorPlanDisplay() {
  const [activeFloorPlan, setActiveFloorPlan] = useState('maple')
  
  const floorPlans = {
    maple: {
      name: "Maple House",
      image: "/placeholder.svg?height=800&width=1200",
      description: "Our Maple House floor plan features 6 private bedrooms, each with en-suite bathrooms, arranged around spacious common areas designed for comfort and accessibility."
    },
    willow: {
      name: "Willow House",
      image: "/placeholder.svg?height=800&width=1200",
      description: "The Willow House floor plan offers 6 private suites with a slightly different layout that maximizes natural light and provides cozy community spaces for social interaction."
    }
  }
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="maple" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger 
                  value="maple"
                  onClick={() => setActiveFloorPlan('maple')}
                  className={cn(
                    "text-base px-6",
                    activeFloorPlan === 'maple' ? 'bg-green-700 text-white' : ''
                  )}
                >
                  Maple House
                </TabsTrigger>
                <TabsTrigger 
                  value="willow"
                  onClick={() => setActiveFloorPlan('willow')}
                  className={cn(
                    "text-base px-6",
                    activeFloorPlan === 'willow' ? 'bg-green-700 text-white' : ''
                  )}
                >
                  Willow House
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="maple" className="mt-0">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="relative h-[400px] md:h-[500px] mb-6 border border-gray-200 rounded overflow-hidden">
                  <Image
                    src={floorPlans.maple.image || "/placeholder.svg"}
                    alt="Maple House Floor Plan"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{floorPlans.maple.name}</h3>
                <p className="text-gray-700">{floorPlans.maple.description}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="willow" className="mt-0">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="relative h-[400px] md:h-[500px] mb-6 border border-gray-200 rounded overflow-hidden">
                  <Image
                    src={floorPlans.willow.image || "/placeholder.svg"}
                    alt="Willow House Floor Plan"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{floorPlans.willow.name}</h3>
                <p className="text-gray-700">{floorPlans.willow.description}</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
