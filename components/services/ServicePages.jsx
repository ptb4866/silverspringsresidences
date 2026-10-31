import { Link } from "react-router-dom";
import { ArrowUpRight, HeartHandshake, Brain, HandHeart, Download } from "lucide-react";
import { useTourModal } from "@/hooks/use-tour-modal";
import "@/styles/service-pages.css";

const disclosure = "Stock lifestyle imagery for illustration; not Silver Springs residents, staff, meals, or property.";
function Photo({ src, alt, eager = false, caption = false }) {
  return <figure className="service-photo"><img src={src} alt={alt} width="1200" height="900" loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : undefined} />{caption && <figcaption>{disclosure}</figcaption>}</figure>;
}
function List({ items }) { return <ul className="service-list">{items.map(item => <li key={item}>{item}</li>)}</ul>; }
function TourButton() {
  const { openTourModal } = useTourModal();
  return <button className="editorial-button" onClick={openTourModal}>Schedule a Private Tour <ArrowUpRight size={17} aria-hidden="true" /></button>;
}
function Hero({ category, title, subtitle, children, src, alt }) {
  return <section className="service-hero section-space"><div className="site-container service-split"><div className="service-copy"><p className="eyebrow">Services · {category}</p><h1>{title}</h1>{subtitle && <p className="service-lead">{subtitle}</p>}{children}</div><Photo src={src} alt={alt} eager caption /></div></section>;
}
function Closing({ title, children, action }) {
  return <section className="service-closing section-space"><div className="site-container service-reading service-copy"><h2>{title}</h2>{children}<div className="service-actions">{action}<TourButton /></div></div></section>;
}

export function CarePage() {
  return <div className="service-page care-page">
    <Hero category="Care" title="Personalized Care That Starts With Knowing the Person" src="/media/contact-care.webp" alt="An older adult sharing a reassuring moment with a caregiver">
      <p>Silver Springs Residence provides personalized residential care for seniors in Menifee, California, in a smaller six-resident setting where daily support can be shaped around each individual’s needs, routines, and preferences.</p>
    </Hero>
    <section className="site-container section-space service-care-grid" aria-label="Our approach to care">
      <article className="service-detail service-copy"><HeartHandshake className="service-symbol" aria-hidden="true" /><h2>Personal Care &amp; Daily Support</h2><p>Depending on the resident’s assessment and care plan, support may include:</p><List items={['Bathing, dressing, and grooming','Toileting and continence support','Medication assistance','Mobility and transfer support','Eating and hydration assistance','Laundry and housekeeping','Daily supervision and companionship','Family communication and care coordination']} /><p>Our goal is to provide the right amount of support while preserving dignity, choice, and as much independence as possible.</p></article>
      <article className="service-detail service-copy"><Brain className="service-symbol" aria-hidden="true" /><h2>Memory Support</h2><p>Silver Springs Residence may support residents with mild cognitive impairment or dementia when their needs can be safely met within our residential setting.</p><p>Our approach may include:</p><List items={['Familiar daily routines','Calm, respectful communication','Gentle reminders and redirection','Meaningful activities','Personalized comfort strategies','Increased supervision when appropriate']} /><p>Memory-related needs are reviewed individually before admission.</p></article>
      <article className="service-detail service-copy"><HandHeart className="service-symbol" aria-hidden="true" /><h2>Hospice Support &amp; Care Compatibility</h2><p>Residents may be able to remain at Silver Springs Residence while receiving services from an outside licensed hospice provider when appropriate and permitted.</p><p>Before admission, we review each prospective resident’s care needs to confirm that our home can safely and appropriately provide support.</p></article>
    </section>
    <section className="service-promise section-space" aria-labelledby="honest-fit"><div className="site-container service-reading service-copy"><p className="eyebrow">Thoughtful, honest guidance</p><h2 id="honest-fit">Our Honest-Fit Promise</h2><p>We only recommend admission when we believe Silver Springs Residence is the right fit.</p><p>If a resident’s needs exceed what we can safely or legally provide, we will communicate that clearly.</p></div></section>
    <Closing title="Let’s Talk About Your Loved One’s Care" action={<Link className="editorial-link" to="/contact-us#contact-form">Discuss Care Needs <ArrowUpRight size={17} aria-hidden="true" /></Link>} />
  </div>;
}

export function DiningPage() {
  return <div className="service-page dining-page">
    <Hero category="Dining" title="Dining That Feels Familiar" subtitle="Thoughtfully Prepared Meals in a Comfortable Home Setting" src="/media/dining-together.webp" alt="An older couple enjoying a meal together at a table">
      <p>At Silver Springs Residence, meals are about more than nutrition. They are part of the daily routine, a source of comfort, and an opportunity to enjoy familiar flavors and meaningful moments around the table.</p><p>Residents enjoy home-style meals, snacks, and beverages in a relaxed residential dining setting.</p>
    </Hero>
    <section className="site-container section-space service-dining-grid" aria-label="Our dining approach">
      <article className="service-detail service-copy"><p className="eyebrow">Familiar Meals</p><h2>What Residents Can Expect</h2><List items={['Breakfast, lunch, and dinner','Snacks and beverages throughout the day','Home-style meals','Resident food preferences','Dietary instructions when applicable','Assistance during meals when needed','Comfortable, unhurried dining']} /></article>
      <article className="service-detail service-copy"><p className="eyebrow">Resident Preferences</p><h2>A Taste of Home</h2><p>We take time to learn what each resident enjoys.</p><p>Families are encouraged to share:</p><List items={['Favorite meals','Cultural or familiar foods','Family recipes','Preferred snacks and beverages','Foods a resident dislikes','Birthday and holiday traditions']} /><p>Whenever practical and appropriate, these preferences help shape the dining experience.</p></article>
      <article className="service-detail service-copy"><p className="eyebrow">Dietary Support</p><h2>Dietary Needs &amp; Preferences</h2><p>Meal planning may consider:</p><List items={['Physician-directed dietary instructions','Food allergies and sensitivities','Texture or consistency needs','Cultural or religious preferences','Hydration needs','Eating assistance']} /><p>Dietary needs are reviewed as part of the resident’s assessment and personalized care plan.</p></article>
    </section>
    <section className="service-menu section-space" aria-labelledby="sample-menu-heading"><div className="site-container service-split"><Photo src="/media/dining-gathering.webp" alt="Older adults sharing conversation over a meal" /><div className="service-copy"><p className="eyebrow">A little inspiration for the week</p><h2 id="sample-menu-heading">See What’s on the Menu</h2><p>Want a closer look at the types of meals we serve?</p><p>Download our sample menu to see an example of breakfast, lunch, dinner, snacks, and resident-friendly meal options.</p><p className="service-menu-note">Illustrative sample menu—not a current meal schedule. Meals may vary based on resident preferences, assessed needs, dietary instructions, and availability.</p><div className="service-actions"><a className="editorial-button" href="/media/sample-menu.pdf" download="Silver-Springs-Sample-Menu.pdf">Download Sample Menu <Download size={17} aria-hidden="true" /></a><TourButton /></div></div></div></section>
  </div>;
}

const activityGroups = [
  { title: 'Connect', description: 'Conversation, family visits, and familiar traditions.', src: '/media/contact-care.webp', alt: 'An older adult enjoying companionship' },
  { title: 'Move', description: 'Light stretching or walking at a comfortable pace.', src: '/media/activities-movement.webp', alt: 'An older adult gently stretching outdoors' },
  { title: 'Enjoy', description: 'Games, music, hobbies, and creative activities.', src: '/media/hero-poster.webp', alt: 'An older adult painting with companionship' },
  { title: 'Relax', description: 'Outdoor time, reading, and quiet moments.', src: '/media/activities-reading.webp', alt: 'An older woman reading a book on a veranda' },
];
export function ActivitiesPage() {
  return <div className="service-page activities-page">
    <Hero category="Activities" title="Meaningful Days at a Comfortable Pace" src="/media/hero-poster.webp" alt="An older adult enjoying painting in a shared creative moment">
      <p>Daily life at Silver Springs Residence is designed around choice, familiarity, and connection.</p><p>Some residents enjoy games and conversation. Others prefer music, outdoor time, television, reading, or simply relaxing in a familiar setting.</p><p>Our smaller residential environment allows activities to feel more personal and less scheduled.</p>
    </Hero>
    <section className="site-container section-space" aria-labelledby="activities-heading"><div className="service-reading service-copy"><h2 id="activities-heading">Activities May Include</h2><List items={['Music and favorite television programs','Cards, puzzles, and games','Reading and conversation','Light movement and stretching','Outdoor relaxation','Gardening','Arts and simple creative activities','Movies','Family visits','Birthday and holiday celebrations','Spiritual or religious activities','Personal hobbies and quiet time']} /></div><div className="service-activity-grid">{activityGroups.map(item => <article className="service-activity" key={item.title}><Photo src={item.src} alt={item.alt} /><div className="service-copy"><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div><p className="service-disclosure">{disclosure}</p></section>
    <section className="service-promise section-space"><div className="site-container service-narrative-grid">
      <div className="service-copy"><h2>Activities Shaped Around the Individual</h2><p>We learn what each resident enjoys and encourage participation based on their interests, abilities, and energy level.</p><p>Participation is encouraged, but never forced.</p></div>
      <div className="service-copy"><h2>Familiar Moments Matter Too</h2><p>Not every meaningful activity needs to be scheduled.</p><p>A morning cup of coffee, listening to a favorite song, sitting outside, looking through family photographs, or enjoying a familiar television program can be just as important as a planned group activity.</p></div>
      <div className="service-copy"><h2>Family Remains Part of Daily Life</h2><p>Families are encouraged to remain connected through visits, celebrations, traditions, favorite music, photographs, and meaningful activities.</p><p>Our goal is simple: help residents stay engaged in ways that feel natural and enjoyable to them.</p></div>
    </div></section>
    <Closing title="Discover Daily Life at Silver Springs" action={<Link className="editorial-link" to="/contact-us/locations">Explore Our Home <ArrowUpRight size={17} aria-hidden="true" /></Link>} />
  </div>;
}
