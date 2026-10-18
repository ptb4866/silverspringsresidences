import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTourModal } from "@/hooks/use-tour-modal";
import Wordmark from "./Wordmark";

const livingLinks = [
  ["Assisted Living", "/assisted-living"],
  ["Services & Amenities", "/services-and-amenities"],
  ["Photo Gallery", "/photo-gallery"],
  ["Floor Plans", "/floor-plans"],
];
const otherLinks = [
  ["Our Homes", "/contact-us/locations"],
  ["Resources", "/blog"],
  ["Contact Us", "/contact-us"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { openTourModal } = useTourModal();
  useEffect(() => setOpen(false), [pathname]);
  const tour = () => {
    setOpen(false);
    openTourModal();
  };
  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="utility-bar">
        <div className="site-container">
          <span className="utility-location">
            A place to call home in Menifee, California
          </span>
          <a href="tel:+19512460895">
            <Phone size={13} aria-hidden="true" />
            (951) 246 0895
          </a>
          <Link to="/contact-us">
            Contact <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="site-container header-main">
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation">
          <DropdownMenu>
            <DropdownMenuTrigger className="nav-link">
              Living Here <ChevronDown size={14} aria-hidden="true" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="p-2 min-w-56">
              {livingLinks.map(([name, href]) => (
                <DropdownMenuItem key={href} asChild>
                  <Link
                    to={href}
                    className="min-h-11"
                    aria-current={pathname === href ? "page" : undefined}
                  >
                    {name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {otherLinks.map(([name, href]) => (
            <Link
              key={href}
              to={href}
              className="nav-link"
              aria-current={pathname === href ? "page" : undefined}
            >
              {name}
            </Link>
          ))}
          <button onClick={tour} className="editorial-button">
            Schedule a Tour <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </nav>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button
              className="mobile-menu-trigger"
              aria-label="Open navigation"
            >
              <Menu size={25} />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="mobile-nav-overlay" />
            <Dialog.Content
              className="mobile-nav-panel"
              aria-describedby={undefined}
            >
              <div className="mobile-nav-top">
                <Dialog.Title className="sr-only">Navigation</Dialog.Title>
                <Wordmark />
                <Dialog.Close asChild>
                  <button className="icon-button" aria-label="Close navigation">
                    <X />
                  </button>
                </Dialog.Close>
              </div>
              <nav aria-label="Mobile navigation">
                <p className="eyebrow">Life at Silver Springs</p>
                {[...livingLinks, ...otherLinks].map(([name, href]) => (
                  <Link
                    key={href}
                    to={href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === href ? "page" : undefined}
                  >
                    {name}
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                ))}
                <button className="editorial-button" onClick={tour}>
                  Schedule a Tour <ArrowUpRight size={16} aria-hidden="true" />
                </button>
                <a className="mobile-phone" href="tel:+19512460895">
                  <Phone size={17} aria-hidden="true" />
                  (951) 246 0895
                </a>
              </nav>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
