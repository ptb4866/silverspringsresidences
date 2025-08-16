import { Link, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  totalPosts = 0,
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Don't show pagination if there's only one page or no posts
  if (totalPages <= 1) {
    return null;
  }

  // Calculate which pages to show (show up to 5 page numbers)
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  const createPageUrl = (page) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (page === 1) {
      newSearchParams.delete("page");
    } else {
      newSearchParams.set("page", page.toString());
    }
    return `?${newSearchParams.toString()}`;
  };

  const handlePageChange = (page) => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (page === 1) {
      newSearchParams.delete("page");
    } else {
      newSearchParams.set("page", page.toString());
    }
    setSearchParams(newSearchParams);
  };

  return (
    <div className="flex flex-col items-center mt-12 space-y-4">
      {/* Posts count info */}
      <div className="text-sm text-gray-500">
        Showing {(currentPage - 1) * 6 + 1} to{" "}
        {Math.min(currentPage * 6, totalPosts)} of {totalPosts} posts
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-1">
        {/* Previous button */}
        <button
          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          className={cn(
            "p-2 rounded-md text-gray-500 transition-colors",
            currentPage > 1
              ? "hover:bg-gray-100"
              : "opacity-50 cursor-not-allowed"
          )}
          aria-label="Previous page"
          disabled={currentPage <= 1}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Page numbers */}
        {visiblePages.map((page, index) => (
          <span key={index}>
            {page === "..." ? (
              <span className="px-4 py-2 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => handlePageChange(page)}
                className={cn(
                  "px-4 py-2 rounded-md transition-colors",
                  page === currentPage
                    ? "bg-brand-primary text-white"
                    : "hover:bg-gray-100 text-gray-700"
                )}
              >
                {page}
              </button>
            )}
          </span>
        ))}

        {/* Next button */}
        <button
          onClick={() =>
            currentPage < totalPages && handlePageChange(currentPage + 1)
          }
          className={cn(
            "p-2 rounded-md text-gray-500 transition-colors",
            currentPage < totalPages
              ? "hover:bg-gray-100"
              : "opacity-50 cursor-not-allowed"
          )}
          aria-label="Next page"
          disabled={currentPage >= totalPages}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
