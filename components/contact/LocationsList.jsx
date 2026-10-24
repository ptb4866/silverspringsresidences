import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, MapPin, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useTourModal } from "@/hooks/use-tour-modal";
import "@/styles/our-home.css";

// Public-facing owner-supplied content; production notes are intentionally excluded.
const content = {
  "intro": [
    "Silver Springs Residence offers the warmth and familiarity of home with the reassurance of personalized support available around the clock.",
    "Our intimate six-resident setting allows us to create a calm, welcoming environment where residents can feel comfortable, known, and at home — without the size or institutional feel of a large assisted living community."
  ],
  "why": [
    "Families looking for assisted living in Menifee often want something more personal than a large senior living community.",
    "At Silver Springs Residence, our six-resident home is designed around familiarity, personalized attention, comfort, and peace of mind."
  ],
  "features": [
    {
      "title": "Personalized Care in a Six-Resident Home",
      "blocks": [
        "With only six residents, caregivers have the opportunity to truly get to know each person — their routines, preferences, personality, abilities, and changing needs.",
        "Care is based on the individual, not a one-size-fits-all schedule."
      ]
    },
    {
      "title": "More Personal Attention",
      "blocks": [
        "Our staffing model is designed around a 1 caregiver to 3 residents ratio, allowing for more personal attention and greater familiarity with each resident’s daily needs."
      ]
    },
    {
      "title": "A Home That Feels Familiar",
      "blocks": [
        "Silver Springs is a residential home — not a large commercial facility.",
        "Residents enjoy familiar surroundings, comfortable shared spaces, furnished bedrooms, and a quieter household environment that can feel less overwhelming and more like home."
      ]
    },
    {
      "title": "Home-Cooked Meals",
      "blocks": [
        "Meals are prepared in the home and shared in a familiar dining environment.",
        "We focus on nutritious, enjoyable meals while accommodating resident preferences and physician-prescribed dietary needs whenever safely possible."
      ]
    },
    {
      "title": "Consistent Caregivers. Familiar Faces.",
      "blocks": [
        "In a smaller home, residents are cared for by a more familiar group of caregivers.",
        "That consistency helps caregivers notice changes in routines, appetite, mobility, mood, and other needs while helping residents feel more comfortable with the people assisting them."
      ]
    },
    {
      "title": "Support That Can Adapt as Needs Change",
      "blocks": [
        "Residents’ needs may change over time.",
        "Silver Springs can provide increasing levels of personal assistance when those needs remain appropriate for our license, staffing, and care capabilities.",
        "We also coordinate with families, physicians, hospice, home health, therapy providers, and other professionals when additional support is needed."
      ]
    },
    {
      "title": "Safety & Accessibility Built Into Everyday Living",
      "blocks": [
        "Our single-story home is designed to support residents with mobility and personal-care needs.",
        "Features include accessible living areas, wheelchair-friendly pathways, ADA-compliant bathroom features, supportive grab bars, non-slip bathing areas, resident call systems, and other safety-focused features."
      ]
    },
    {
      "title": "Private & Shared Room Options",
      "blocks": [
        "Residents can choose from furnished private or shared accommodations based on availability and preference.",
        "Each room is designed to feel comfortable and personal, and residents are welcome to bring appropriate photographs and familiar belongings to make the space their own."
      ]
    },
    {
      "title": "A Family-Like Community",
      "blocks": [
        "With only six residents, daily life naturally feels more personal.",
        "Residents can share meals, conversations, activities, outdoor time, and quiet moments together while still having space for privacy and individual routines.",
        "Family members are also encouraged to remain involved in their loved one’s life and care."
      ]
    }
  ],
  "rooms": [
    "Every resident deserves a personal space where they can feel comfortable, secure, and settled.",
    "Silver Springs Residence offers both private and shared accommodations. Rooms are furnished and ready for move-in, while residents may also personalize their space with appropriate photographs, decorations, and familiar belongings."
  ],
  "private": [
    "Our private rooms provide additional personal space and privacy while keeping residents connected to the household.",
    "Private-room residents have convenient access to shared accessible bathrooms.",
    "Private rooms include:",
    "• Furnished bedroom",
    "• Bed and linens",
    "• Storage space",
    "• Utilities",
    "• Housekeeping",
    "• Laundry service",
    "• Access to shared living and outdoor spaces"
  ],
  "shared": [
    "Our shared accommodation provides two residents with a comfortable furnished bedroom and access to a dedicated bathroom serving the room.",
    "It can be a good option for residents who enjoy companionship or families seeking a more affordable room arrangement."
  ],
  "spaces": [
    "Silver Springs Residence is designed to encourage residents to spend time together while still having opportunities for privacy and quiet time.",
    "Our shared spaces provide comfortable areas for:",
    "• Relaxing and watching television",
    "• Visiting with family",
    "• Enjoying meals together",
    "• Reading or listening to music",
    "• Activities and conversation",
    "• Quiet moments throughout the day",
    "The goal is simple: residents should feel like they are living in a home — not residing in an institution."
  ],
  "safetyIntro": [
    "Comfort is important, but so is confidence that the home can safely support residents with changing mobility and personal-care needs.",
    "Silver Springs Residence features a single-story residential layout designed to make everyday movement easier for residents who use walkers, wheelchairs, or caregiver assistance."
  ],
  "safety": [
    {
      "title": "Single-Story Living",
      "blocks": [
        "Residents can access bedrooms, bathrooms, common areas, dining spaces, and outdoor areas without navigating stairs as part of normal daily living."
      ]
    },
    {
      "title": "Wheelchair Accessibility",
      "blocks": [
        "Living areas and pathways are designed to accommodate residents with mobility limitations and mobility devices."
      ]
    },
    {
      "title": "ADA-Compliant Bathrooms Designed for Safer Assistance",
      "blocks": [
        "Our bathrooms are designed with accessibility and resident safety in mind, helping make bathing, toileting, transfers, and caregiver assistance more comfortable.",
        "Bathroom safety features include:",
        "• ADA-compliant accessibility features",
        "• Supportive grab bars",
        "• Accessible bathing areas",
        "• Non-slip shower surfaces",
        "• Space for caregiver assistance",
        "• Mobility-conscious layouts"
      ]
    },
    {
      "title": "Clear, Accessible Walking Areas",
      "blocks": [
        "Open pathways and uncluttered living spaces help residents move throughout the home with fewer obstacles."
      ]
    },
    {
      "title": "Emergency & Safety Features",
      "blocks": [
        "Silver Springs Residence maintains safety systems appropriate for a licensed residential care environment, including:",
        "• Central fire alarm system",
        "• Resident call systems",
        "• Handrails",
        "• Exit-alert measures where appropriate",
        "• Safety-focused bathroom features",
        "• Emergency preparedness procedures",
        "Our caregivers also monitor residents for changes in mobility, fall risk, cognition, behavior, and other needs that may affect safety."
      ]
    }
  ],
  "outdoors": [
    "Fresh air and sunshine remain an important part of everyday life.",
    "Residents have access to outdoor areas where they may relax, visit with family, enjoy a quiet morning, or spend time outside with caregiver assistance when appropriate.",
    "Our residential neighborhood also offers sidewalks and pleasant surroundings that contribute to the familiar feeling of living in a home.",
    "Outdoor time may include:",
    "• Morning coffee or afternoon relaxation",
    "• Sitting outside with family and friends",
    "• Supervised walks when appropriate",
    "• Quiet time in the fresh air"
  ],
  "daily": [
    "There is no rigid one-size-fits-all schedule at Silver Springs Residence.",
    "Residents are encouraged to maintain familiar routines whenever possible. Some may prefer to wake early and enjoy breakfast quietly. Others may enjoy conversation, television, music, outdoor time, or participating in simple activities throughout the day.",
    "Our caregivers help residents maintain as much independence and choice as possible while providing assistance when needed.",
    "A typical day may include:",
    "• A home-cooked breakfast",
    "• Morning personal-care assistance",
    "• Conversation or quiet leisure time",
    "• Activities based on resident interests",
    "• Lunch together",
    "• Rest or outdoor time",
    "• Family visits",
    "• Dinner and evening relaxation",
    "• Assistance with bedtime routines"
  ],
  "visit": [
    "Photos can show you the rooms and living spaces.",
    "A private tour allows you to experience something even more important — how the home feels.",
    "We invite families to visit Silver Springs Residence, walk through the rooms, see our shared spaces, ask questions, and talk with us about your loved one’s individual needs.",
    "During your tour, you can:",
    "• View available private and shared rooms",
    "• Tour the bathrooms and common areas",
    "• See our safety and accessibility features",
    "• Explore our outdoor spaces",
    "• Learn how care is personalized",
    "• Discuss your loved one’s current needs",
    "• Ask about pricing and room availability",
    "• Meet our team"
  ],
  "closing": [
    "Choosing residential care is a significant decision.",
    "We believe families should feel confident not only in the care their loved one receives, but also in the place they will call home.",
    "At Silver Springs Residence, our goal is to provide a warm, comfortable environment where residents are treated with dignity, known personally, and supported according to their individual needs.",
    "Six residents. Personalized attention. The comfort of home."
  ]
};
const availabilityUrl = "/contact-us?inquiry=room-availability#contact-form";
const gallery = [
  { src: "/media/residence-exterior.webp", label: "Residential exterior illustration" },
  { src: "/media/residence-living.webp", label: "Living-room illustration" },
  { src: "/media/everyday-living.webp", label: "Shared living-space illustration" },
];

function Copy({ blocks }) {
  const elements = [];
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].startsWith("\u2022")) {
      const items = [];
      while (i < blocks.length && blocks[i].startsWith("\u2022")) items.push(blocks[i++].replace(/^\u2022\s*/, ""));
      elements.push(<ul key={`list-${i}`}>{items.map(item => <li key={item}>{item}</li>)}</ul>); i--;
    } else elements.push(<p key={`paragraph-${i}`}>{blocks[i]}</p>);
  }
  return elements;
}
function TourButton({ children = "Schedule a Private Tour", light = false }) {
  const { openTourModal } = useTourModal();
  return <button className={`editorial-button ${light ? "button-light" : ""}`} onClick={openTourModal}>{children}<ArrowUpRight size={17} aria-hidden="true" /></button>;
}
function Actions({ dark = false }) {
  return <div className="our-home-actions"><TourButton light={dark} /><Link className="editorial-link" to={availabilityUrl}>Check Room Availability <ArrowUpRight size={17} aria-hidden="true" /></Link></div>;
}
export default function OurHome() {
  const [selected, setSelected] = useState(null);
  const previousFocus = useRef(null);
  return (
    <div className="our-home-page">
      <section className="our-home-tinted section-space">
        <div className="site-container our-home-split">
          <div className="our-home-copy">
            <p className="eyebrow">Braverde House · Menifee, California</p>
            <h1>Our Home</h1>
            <p className="our-home-lead">A Comfortable Home. Personalized Care. Just Six Residents.</p>
            <Copy blocks={content.intro} /><Actions />
          </div>
          <figure><img className="our-home-hero-photo" src="/media/residence-exterior.webp" alt="Illustrative residential exterior from the Silver Springs collection" width="900" height="600" fetchPriority="high" /><figcaption>Illustrative imagery. Contact our team for current Braverde home photographs.</figcaption></figure>
        </div>
      </section>
      <section className="site-container section-space our-home-why" aria-labelledby="home-why">
        <div className="our-home-why-intro our-home-copy"><h2 id="home-why">Why Families Choose Silver Springs Residence</h2><Copy blocks={content.why} /></div>
        <ul className="our-home-benefits">
          {content.features.map(item => (
            <li className="our-home-benefit" key={item.title}>
              <span className="our-home-benefit-check" aria-hidden="true"><Check size={22} /></span>
              <div className="our-home-benefit-copy our-home-copy"><h3>{item.title}</h3><Copy blocks={item.blocks} /></div>
            </li>
          ))}
        </ul>
      </section>
      <section className="our-home-tinted section-space" aria-labelledby="home-rooms">
        <div className="site-container">
          <div className="our-home-reading our-home-copy"><h2 id="home-rooms">Rooms Designed to Feel Like Home</h2><Copy blocks={content.rooms} /></div>
          <div className="our-home-grid our-home-room-grid"><div className="our-home-copy"><h3>Private Rooms</h3><Copy blocks={content.private} /></div><div className="our-home-copy"><h3>Shared Room</h3><Copy blocks={content.shared} /><Link className="editorial-link" to={availabilityUrl}>Ask About Current Room Availability <ArrowUpRight size={17} aria-hidden="true" /></Link></div></div>
        </div>
      </section>
      <section className="site-container section-space our-home-split" aria-labelledby="home-spaces">
        <figure><img src="/media/everyday-living.webp" alt="Illustration of shared residential living space" width="1000" height="800" loading="lazy" /><figcaption>Shared-space illustration from our existing collection.</figcaption></figure>
        <div className="our-home-copy"><h2 id="home-spaces">Comfortable Shared Living Spaces</h2><Copy blocks={content.spaces} /></div>
      </section>
      <section className="our-home-tinted section-space" aria-labelledby="home-safety"><div className="site-container">
        <div className="our-home-reading our-home-copy"><h2 id="home-safety">Designed With Safety &amp; Accessibility in Mind</h2><Copy blocks={content.safetyIntro} /></div>
        <div className="our-home-grid our-home-feature-grid">{content.safety.map(item=><div className="our-home-feature our-home-copy" key={item.title}><h3>{item.title}</h3><Copy blocks={item.blocks} /></div>)}</div>
      </div></section>
      <section className="site-container section-space our-home-reading our-home-copy" aria-labelledby="home-outdoors"><h2 id="home-outdoors">Enjoy the Outdoors</h2><Copy blocks={content.outdoors} /></section>
      <section className="our-home-tinted section-space" aria-labelledby="home-daily"><div className="site-container our-home-reading our-home-copy"><h2 id="home-daily">A Glimpse Into Daily Life</h2><Copy blocks={content.daily} /><div className="our-home-actions"><Link className="editorial-link" to="/services-and-amenities#daily-activities">Explore Our Activities <ArrowUpRight size={17} aria-hidden="true" /></Link><Link className="editorial-link" to="/services-and-amenities#dining">Learn About Dining <ArrowUpRight size={17} aria-hidden="true" /></Link></div></div></section>
      <section className="site-container section-space" aria-labelledby="home-gallery"><h2 id="home-gallery">Take a Look Around Silver Springs Residence</h2><p className="our-home-disclosure">These illustrations suggest a residential atmosphere and are not verified photographs of Braverde House. Ask our team for current property images.</p>
        <div className="our-home-gallery">{gallery.map(photo=><figure key={photo.src}><button aria-label={`Enlarge ${photo.label}`} onClick={event=>{previousFocus.current=event.currentTarget;setSelected(photo);}}><img src={photo.src} alt={photo.label} width="900" height="600" loading="lazy" /></button><figcaption>{photo.label}</figcaption></figure>)}</div>
        <Link className="editorial-link" to="/photo-gallery">View Full Gallery <ArrowUpRight size={17} aria-hidden="true" /></Link>
      </section>
      <section className="our-home-tinted section-space" aria-labelledby="home-visit"><div className="site-container our-home-reading our-home-copy"><h2 id="home-visit">See Silver Springs for Yourself</h2><Copy blocks={content.visit} /><TourButton /><div className="our-home-visit-info"><h3>Visit Braverde House</h3><p><MapPin size={18} aria-hidden="true" />32336 Parker Street, Menifee, CA 92584</p><a href="tel:+19512460895"><Phone size={18} aria-hidden="true" />Or call (951) 246 0895</a><a className="editorial-link" href="https://www.google.com/maps/dir/?api=1&destination=32336%20Parker%20Street%2C%20Menifee%2C%20CA%2092584" target="_blank" rel="noopener noreferrer">Get Directions <ArrowUpRight size={17} aria-hidden="true" /></a></div></div></section>
      <section className="our-home-closing section-space" aria-labelledby="home-closing"><div className="site-container our-home-reading our-home-copy"><h2 id="home-closing">A Place That Feels Like Home</h2><Copy blocks={content.closing} /><Actions dark /></div></section>
      <Dialog open={!!selected} onOpenChange={open=>{if(!open)setSelected(null);}}><DialogContent className="our-home-lightbox" aria-describedby={undefined} onCloseAutoFocus={event=>{event.preventDefault();previousFocus.current?.focus();}}><DialogTitle>{selected?.label || "Residence illustration"}</DialogTitle>{selected && <img src={selected.src} alt={selected.label} />}<p>Illustrative imagery, not a verified property photograph.</p></DialogContent></Dialog>
    </div>
  );
}
