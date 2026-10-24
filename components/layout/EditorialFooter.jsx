import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Wordmark from "./Wordmark";

export default function Footer() {
  const location = useLocation();
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div>
          <Wordmark light />
          <p className="footer-about">
            Personalized assisted living.
            <br />
            The warmth of a real home.
            <br />
            Menifee, California.
          </p>
        </div>
        <div>
          <p className="eyebrow">Discover</p>
          <nav aria-label="Footer navigation">
            {[
              ["About", "/about"],
              ["Assisted Living", "/assisted-living"],
              ["Services & Amenities", "/services-and-amenities"],
              ["Photo Gallery", "/photo-gallery"],
              ["Floor Plans", "/floor-plans"],
              ["Resources", "/blog"],
            ].map(([label, href]) => (
              <Link key={href} to={href} aria-current={location.pathname === href ? "page" : undefined}>
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <p className="eyebrow">Let’s connect</p>
          <div className="footer-contact">
            <Link to="/contact-us/map-directions">
              <MapPin size={17} aria-hidden="true" />
              <span>
                32336 Parker Street
                <br />
                Menifee, CA 92584
              </span>
            </Link>
            <a href="tel:+19512460895">
              <Phone size={17} aria-hidden="true" />
              (951) 246 0895
            </a>
            <a href="mailto:silverspringsresidence@gmail.com">
              <Mail size={17} aria-hidden="true" />
              <span>silverspringsresidence@gmail.com</span>
            </a>
            <Link to="/schedule-a-tour" className="footer-tour">
              Plan your visit <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
      <div className="site-container footer-bottom">
        <span>
          © {new Date().getFullYear()} Silver Springs Residency. All rights
          reserved.
        </span>
        <Link to="/contact-us">Contact us</Link>
      </div>
    </footer>
  );
}
