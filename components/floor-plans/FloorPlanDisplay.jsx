"use client";

import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function FloorPlanDisplay() {
  const [activeFloorPlan, setActiveFloorPlan] = useState("braverde");

  const floorPlans = {
    braverde: {
      name: "Braverde House",
      image: "/placeholder.svg?height=800&width=1200",
      description:
        "Our Braverde House floor plan features 6 private bedrooms, each with en-suite bathrooms, arranged around spacious common areas designed for comfort and accessibility.",
    },
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="braverde" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger
                  value="braverde"
                  onClick={() => setActiveFloorPlan("braverde")}
                  className={cn(
                    "text-base px-6",
                    activeFloorPlan === "braverde"
                      ? "bg-brand-primary text-white"
                      : ""
                  )}
                >
                  Braverde House
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="braverde" className="mt-0">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="relative h-[400px] md:h-[500px] mb-6 border border-gray-200 rounded overflow-hidden">
                  <Image
                    src={floorPlans.braverde.image || "/placeholder.svg"}
                    alt="Braverde House Floor Plan"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {floorPlans.braverde.name}
                </h3>
                <p className="text-gray-700">
                  {floorPlans.braverde.description}
                </p>
              </div>
            </TabsContent>

            {/* <TabsContent value="willow" className="mt-0">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="relative h-[400px] md:h-[500px] mb-6 border border-gray-200 rounded overflow-hidden">
                  <Image
                    src={floorPlans.willow.image || "/placeholder.svg"}
                    alt="Willow House Floor Plan"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {floorPlans.willow.name}
                </h3>
                <p className="text-gray-700">{floorPlans.willow.description}</p>
              </div>
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
