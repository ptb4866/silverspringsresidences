"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTourModal } from "@/hooks/use-tour-modal";

export default function ScheduleATourPage() {
  const { openTourModal } = useTourModal();
  const router = useRouter();

  useEffect(() => {
    // Only open the modal if we haven't already redirected
    const timeoutId = setTimeout(() => {
      openTourModal();
      router.replace("/");
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  return null;
}
