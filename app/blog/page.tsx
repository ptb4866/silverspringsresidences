import BlogHero from '@/components/blog/BlogHero'
import BlogGrid from '@/components/blog/BlogGrid'
import Pagination from '@/components/blog/Pagination'
import BlogSidebar from '@/components/blog/BlogSidebar'

export default function Blog() {
  return (
    <div className="pb-12">
      <BlogHero />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BlogGrid />
            <Pagination />
          </div>
          <BlogSidebar />
        </div>
      </div>
    </div>
  )
}
