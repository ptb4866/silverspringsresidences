export default function ContactHero() {
  return (
    <section className="contact-hero">
      <picture>
        <source media="(max-width: 639px)" srcSet="/media/contact-care-mobile.webp" />
        <img src="/media/contact-care.webp" alt="A caregiver spending time with an older adult indoors" width="1800" height="1200" fetchPriority="high" />
      </picture>
      <div className="contact-hero-shade" />
      <div className="site-container contact-hero-copy">
        <p className="eyebrow">Let's start a conversation</p>
        <h1>Contact Us</h1>
        <p>We're here to answer your questions and help you feel at home.</p>
      </div>
    </section>
  );
}
