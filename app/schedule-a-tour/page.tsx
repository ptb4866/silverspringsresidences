"use client"

import { useEffect } from "react"
import { useTourModal } from "@/hooks/use-tour-modal"
import { redirect } from "next/navigation"

export default function ScheduleATourPage() {
  const { openTourModal } = useTourModal()

  useEffect(() => {
    // Open the modal when this page is accessed
    openTourModal()

    // Redirect to home page after opening modal
    redirect("/")
  }, [openTourModal])

  return null
}
