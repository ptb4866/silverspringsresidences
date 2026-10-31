import { useEffect, useRef, useState } from "react";
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

const serviceLinks = [["Care", "/care"], ["Dining", "/dining"], ["Activities", "/activities"]];
const resourceLinks = [["FAQ", "/resources/faq"], ["Family Guides", "/resources/family-guides"], ["Blogs", "/blog"]];
const otherLinks = [
  ["Our Home", "/contact-us/locations"],
  ["Contact Us", "/contact-us"],
];

function NavDropdown({ label, links, pathname }) {
  return <DropdownMenu>
    <DropdownMenuTrigger className="nav-link" data-current={links.some(([, href]) => pathname === href || pathname.startsWith(href + "/")) || undefined}>{label} <ChevronDown size={14} aria-hidden="true" /></DropdownMenuTrigger>
    <DropdownMenuContent align="start" className="p-2 min-w-56">
      {links.map(([name, href]) => <DropdownMenuItem key={href} asChild><Link to={href} className="min-h-11" aria-current={pathname === href ? "page" : pathname.startsWith(href + "/") ? "location" : undefined}>{name}</Link></DropdownMenuItem>)}
    </DropdownMenuContent>
  </DropdownMenu>;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const headerRow = useRef(null);
  const desktopNav = useRef(null);
  useEffect(() => {
    const row = headerRow.current;
    const nav = desktopNav.current;
    const logo = row.firstElementChild;
    const measure = () => setCompact(nav.scrollWidth > 0 && logo.getBoundingClientRect().width + nav.scrollWidth + 32 > row.clientWidth);
    const observer = new ResizeObserver(measure);
    [row, nav, logo].forEach(element => observer.observe(element));
    let mounted = true;
    document.fonts.ready.then(() => { if (mounted) measure(); });
    measure();
    return () => { mounted = false; observer.disconnect(); };
  }, []);
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
      <div className="site-container header-main" ref={headerRow} data-compact={compact || undefined}>
        <Wordmark />
        <nav className="desktop-nav" aria-label="Main navigation" ref={desktopNav} inert={compact || undefined}>
          <Link to="/about" className="nav-link" aria-current={pathname === "/about" ? "page" : undefined}>About</Link>
          <NavDropdown label="Services" links={serviceLinks} pathname={pathname} />
          <Link to="/contact-us/locations" className="nav-link" aria-current={pathname === "/contact-us/locations" ? "page" : undefined}>Our Home</Link>
          <NavDropdown label="Resources" links={resourceLinks} pathname={pathname} />
          {otherLinks.filter(([, href]) => href !== "/contact-us/locations").map(([name, href]) => (
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
                <Link to="/about" onClick={() => setOpen(false)} aria-current={pathname === "/about" ? "page" : undefined}>About <ArrowUpRight size={17} aria-hidden="true" /></Link>
                <div className="mobile-services" role="group" aria-labelledby="mobile-services-label">
                  <p className="eyebrow" id="mobile-services-label">Services</p>
                  {serviceLinks.map(([name, href]) => <Link key={href} to={href} onClick={() => setOpen(false)} aria-current={pathname === href ? "page" : undefined}>{name}<ArrowUpRight size={17} aria-hidden="true" /></Link>)}
                </div>
                <Link to="/contact-us/locations" onClick={() => setOpen(false)} aria-current={pathname === "/contact-us/locations" ? "page" : undefined}>Our Home <ArrowUpRight size={17} aria-hidden="true" /></Link>
                <div className="mobile-services" role="group" aria-labelledby="mobile-resources-label">
                  <p className="eyebrow" id="mobile-resources-label">Resources</p>
                  {resourceLinks.map(([name, href]) => <Link key={href} to={href} onClick={() => setOpen(false)} aria-current={pathname === href ? "page" : pathname.startsWith(href + "/") ? "location" : undefined}>{name}<ArrowUpRight size={17} aria-hidden="true" /></Link>)}
                </div>
                {otherLinks.filter(([, href]) => href !== "/contact-us/locations").map(([name, href]) => (
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
