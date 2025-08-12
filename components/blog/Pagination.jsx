import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Pagination() {
  const currentPage = 1;
  const totalPages = 3;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-12">
      <div className="flex items-center space-x-1">
        <Link
          href="#"
          className="p-2 rounded-md hover:bg-gray-100 text-gray-500 disabled:opacity-50"
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </Link>

        {pages.map((page) => (
          <Link
            key={page}
            href="#"
            className={cn(
              "px-4 py-2 rounded-md",
              page === currentPage
                ? "bg-brand-primary text-white"
                : "hover:bg-gray-100 text-gray-700"
            )}
          >
            {page}
          </Link>
        ))}

        <Link
          href="#"
          className="p-2 rounded-md hover:bg-gray-100 text-gray-500"
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </Link>
      </div>
    </div>
  );
}
