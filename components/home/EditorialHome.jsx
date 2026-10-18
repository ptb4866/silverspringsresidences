import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Check,
  HeartHandshake,
  Utensils,
  Sun,
} from "lucide-react";
import Hero from "./CinematicHero";
import { useTourModal } from "@/hooks/use-tour-modal";

function EditorialLink({ to, children }) {
  return (
    <Link className="editorial-link" to={to}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}

export default function Home() {
  const { openTourModal } = useTourModal();
  return (
    <div className="home-page">
      <Hero />
      <section className="home-intro section-space site-container">
        {/*<p className="eyebrow">Welcome to Silver Springs Residency</p> */}
        <h2>
          Exceptional care.
          <br />A familiar feeling.
        </h2>
        <p>
          Welcome to Silver Springs Residence, a boutique board and care home
          for seniors. Our mission is to provide personalized care in a warm
          home-like setting where seniors can live with comfort, dignity, and a
          true sense of belonging.
        </p>
        <span className="intro-rule" aria-hidden="true" />
      </section>
      <section
        className="homes-section section-space"
        id="our-homes"
        aria-labelledby="homes-heading"
      >
        <div className="site-container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A small home. A personal touch.</p>
              <h2 id="homes-heading">
                Find your sense
                <br className="desktop-break" /> of belonging.
              </h2>
            </div>
            {/* <p>
              One welcoming residence.
              <br />
              Six private bedrooms.
              <br />
              One thoughtful approach to care.
            </p> */}
          </div>
          <div className="residence-grid">
            <article className="residence-card">
              <div className="residence-collage">
                <img
                  className="residence-photo-main"
                  src="/media/residence-exterior.webp"
                  alt="Residential exterior illustration from the Silver Springs collection"
                  width="900"
                  height="600"
                  loading="lazy"
                />
                <img
                  className="residence-photo-inset"
                  src="/media/residence-living.webp"
                  alt="Living-room illustration from the Silver Springs collection"
                  width="900"
                  height="600"
                  loading="lazy"
                />
              </div>
              <div className="residence-content">
                <p className="eyebrow">Menifee, California</p>
                <h3>Quality Care in a real home</h3>
                <p>
                  Silver Springs Residence offers a warm, residential
                  alternative to large assisted living communities. With no more
                  than six residents, our caregivers have the time to truly know
                  each person, their routines, preferences, personality, and
                  changing needs.
                </p>
                <ul className="residence-benefits">
                  {[
                    "No more than 6 residents",
                    "1:3 caregiver-to-resident ratio",
                    "Consistent, familiar caregivers",
                    "Personalized care tailored to each resident",
                    "Home-cooked meals and daily support",
                    "A calm, comfortable residential setting",
                  ].map((benefit) => (
                    <li key={benefit}>
                      <span className="benefit-check">
                        <Check size={14} aria-hidden="true" />
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="editorial-link residence-tour"
                  onClick={openTourModal}
                >
                  Schedule A Tour <ArrowUpRight size={18} aria-hidden="true" />
                </button>
              </div>
            </article>
          </div>
          {/*<p className="image-caption">
            Residence imagery from our existing collection. Ask our team for
            current home photos and availability.
          </p> */}
        </div>
      </section>
      <section
        className="care-section section-space site-container"
        aria-labelledby="care-heading"
      >
        <div className="care-image">
          <img
            src="/media/personalized-care.webp"
            alt="A caregiver offering support to an older adult"
            width="900"
            height="1000"
            loading="lazy"
          />
          <span className="image-note">Care that feels personal.</span>
        </div>
        <div className="care-copy">
          <p className="eyebrow">A More Personal Approach to Senior Living</p>
          <h2 id="care-heading">
            <span className="care-heading-first">
              Thoughtful Support in a Calm,
            </span>
            <br />
            Familiar Setting.
          </h2>
          <p>
            Silver Springs Residence offers a more intimate alternative to large
            senior living communities. Located in a peaceful Menifee
            neighborhood with landscaped surroundings, sidewalks, and park
            views, our residential care home is designed to provide comfort,
            familiarity, and a genuine sense of belonging.
          </p>
          <p>
            Our approach centers on dignity, consistency, and personal
            connection. Residents receive attentive support shaped around their
            routines, preferences, and individual needs, while families benefit
            from open communication and visible owner involvement.
          </p>
          <p>
            Convenient access to nearby hospitals, pharmacies, Interstate 215,
            and surrounding Southwest Riverside County communities helps
            residents remain close to essential services and the people who
            matter most.
          </p>
          <EditorialLink to="/assisted-living">
            Our Approach to Care
          </EditorialLink>
          <div className="care-detail">
            <span>1:3</span>
            <p>
              Caregiver-to-residence ratio.
              <br />
              More room for personal attention.
            </p>
          </div>
        </div>
      </section>
      <section
        className="lifestyle-section section-space"
        aria-labelledby="lifestyle-heading"
      >
        <div className="site-container">
          <div className="lifestyle-heading">
            <p className="eyebrow">The beauty of everyday living</p>
            <h2 id="lifestyle-heading">
              Little moments.
              <br />A fuller life.
            </h2>
            <p>
              A shared meal, a favorite activity, a quiet place to relax.
              <br className="desktop-break" /> There’s comfort in the simple
              things.
            </p>
          </div>
          <div className="lifestyle-layout">
            <img
              className="lifestyle-image"
              src="/media/everyday-living.webp"
              alt="Comfortable common living area with a fireplace"
              width="1000"
              height="800"
              loading="lazy"
            />
            <div className="lifestyle-list">
              {[
                [
                  Utensils,
                  "Meals made with care",
                  "Home-cooked meals and snacks, with attention to dietary needs and personal preferences.",
                ],
                [
                  Sun,
                  "Days with meaning",
                  "Social, physical, and recreational activities that bring connection to everyday life.",
                ],
                [
                  HeartHandshake,
                  "Comfort comes naturally",
                  "Welcoming common areas and personalized assistance in a familiar home environment.",
                ],
              ].map(([Icon, title, body]) => (
                <div className="lifestyle-item" key={title}>
                  <Icon size={27} strokeWidth={1.25} aria-hidden="true" />
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </div>
              ))}
              <EditorialLink to="/services-and-amenities">
                Explore Services & Amenities
              </EditorialLink>
            </div>
          </div>
        </div>
      </section>
      <section className="home-tour section-space">
        <div className="site-container">
          <p className="eyebrow">We’d love to welcome you</p>
          <h2>
            Come in.
            <br />
            Feel at home.
          </h2>
          <p>
            The best way to get to know Silver Springs is to experience it.
            <br className="desktop-break" /> Meet our team, explore our home,
            and ask us anything.
          </p>
          <button
            className="editorial-button button-light"
            onClick={openTourModal}
          >
            Schedule Your Visit <ArrowUpRight size={17} aria-hidden="true" />
          </button>
          <a className="tour-phone" href="tel:+19512460895">
            Or call (951) 246 0895
          </a>
        </div>
      </section>
    </div>
  );
}
