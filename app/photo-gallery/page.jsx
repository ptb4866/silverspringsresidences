import PhotoGalleryHero from "@/components/photo-gallery/PhotoGalleryHero";
import GalleryGrid from "@/components/photo-gallery/GalleryGrid";
import ContactSection from "@/components/shared/ContactSection";

export default function PhotoGallery() {
  return (
    <div className="pb-12">
      <PhotoGalleryHero />
      <GalleryGrid />
      <ContactSection />
    </div>
  );
}
