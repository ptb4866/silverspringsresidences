import { MapPin, Phone, Clock, ArrowUpRight } from "lucide-react";

export default function LocationsList() {
  return (
    <section className="section-space homes-detail">
      <div className="site-container">
        <article className="braverde-card">
          <div className="braverde-image">
            <img src="/media/residence-exterior.webp" alt="Residential exterior illustration from the Silver Springs collection" width="900" height="600" />
          </div>
          <div className="braverde-copy">
            <p className="eyebrow">Our home in Menifee</p>
            <h1>Braverde House</h1>
            <p>A welcoming residential setting with six private bedrooms and personalized assistance.</p>
            <div className="home-contact-row"><MapPin size={20} aria-hidden="true" /><p>32336 Parker Street<br />Menifee, CA 92584</p></div>
            <div className="home-contact-row"><Phone size={20} aria-hidden="true" /><a href="tel:+19512460895">(951) 246 0895</a></div>
            <div className="home-contact-row"><Clock size={20} aria-hidden="true" /><p>Monday-Friday: 9:00 AM-5:00 PM<br />Weekends: By appointment</p></div>
          </div>
        </article>
        <div className="braverde-directions">
          <a className="editorial-button" href="https://www.google.com/maps/dir/?api=1&destination=32336%20Parker%20Street%2C%20Menifee%2C%20CA%2092584" target="_blank" rel="noopener noreferrer">Get Directions <ArrowUpRight size={17} aria-hidden="true" /></a>
          <p className="image-caption">Illustrative residence imagery. Contact our team for current home photographs.</p>
        </div>
      </div>
    </section>
  );
}
