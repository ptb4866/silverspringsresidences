import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import { useTourModal } from "@/hooks/use-tour-modal";

export default function Hero() {
  const video = useRef(null);
  const [allowed, setAllowed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const { openTourModal } = useTourModal();
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = navigator.connection;
    const update = () =>
      setAllowed(!reducedMotion.matches && !connection?.saveData);
    update();
    reducedMotion.addEventListener("change", update);
    connection?.addEventListener?.("change", update);
    return () => {
      reducedMotion.removeEventListener("change", update);
      connection?.removeEventListener?.("change", update);
    };
  }, []);
  useEffect(() => {
    if (allowed && !failed)
      video.current?.play().catch(() => {
        setReady(false);
        setFailed(true);
      });
  }, [allowed, failed]);
  const toggle = () => {
    if (playing) video.current?.pause();
    else
      video.current?.play().catch(() => {
        setReady(false);
        setFailed(true);
      });
  };
  return (
    <section className="home-hero" aria-label="Welcome to Silver Springs">
      <picture className="hero-poster">
        <source
          media="(max-width: 639px)"
          srcSet="/media/hero-poster-mobile.webp"
        />
        <img
          src="/media/hero-poster.webp"
          alt=""
          width="1600"
          height="900"
          fetchPriority="high"
        />
      </picture>
      {allowed && !failed && (
        <video
          ref={video}
          className={`hero-video ${ready ? "is-ready" : ""}`}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-hidden="true"
          onPlaying={() => {
            setReady(true);
            setPlaying(true);
          }}
          onPause={() => setPlaying(false)}
          onError={() => {
            setReady(false);
            setFailed(true);
          }}
        >
          <source src="/media/creative-lifestyle.mp4" type="video/mp4" />
        </video>
      )}
      <div className="hero-shade" />
      <div className="site-container hero-content">
        <p className="eyebrow">Personalized assisted living · Menifee, CA</p>
        <h1>
          A little more care.
          <br />A lot more <em>life.</em>
        </h1>
        <p className="hero-description">
          The comfort of home. The confidence of knowing
          <br className="desktop-break" /> someone is always there.
        </p>
        <div className="hero-actions">
          <button
            className="editorial-button button-light"
            onClick={openTourModal}
          >
            Schedule a Tour <ArrowUpRight size={17} aria-hidden="true" />
          </button>
          <a className="hero-explore" href="#our-homes">
            Explore Our Homes <ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="hero-bottom site-container">
        <span>Thoughtful care. Everyday connection.</span>
        {allowed && !failed && (
          <button
            className="video-control"
            onClick={toggle}
            aria-label={
              playing ? "Pause background video" : "Play background video"
            }
          >
            {playing ? <Pause size={14} /> : <Play size={14} />}
            <span>{playing ? "Pause" : "Play"}</span>
          </button>
        )}
      </div>
    </section>
  );
}
