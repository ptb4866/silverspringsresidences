"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTourModal } from "@/hooks/use-tour-modal";

export default function ScheduleATourPage() {
  const { openTourModal } = useTourModal();
  const router = useRouter();

  useEffect(() => {
    openTourModal();
    router.replace("/");
  }, [openTourModal, router]);

  return null;
}
