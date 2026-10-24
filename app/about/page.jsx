import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useTourModal } from "@/hooks/use-tour-modal";
import "./about.css";

// Owner-supplied About content, preserving paragraph order and qualifications.
const content = {
  "intro": [
    "Silver Springs Residence is a boutique residential care home for seniors in Menifee, California, created for families seeking a warmer and more personal alternative to a large assisted living community.",
    "Our home is built around a simple belief: older adults deserve more than assistance with daily routines. They deserve to be known, respected, listened to, and supported as individuals.",
    "In our smaller residential setting, we take time to understand each resident’s routines, preferences, personality, life story, and changing needs. Our goal is to provide thoughtful support that helps every resident feel comfortable, secure, valued, and genuinely at home."
  ],
  "story": [
    "Silver Springs Residence was inspired by personal family caregiving experience.",
    "We understand how difficult it can be to watch someone you love begin to need more support. Families may find themselves balancing safety concerns, changing health needs, work responsibilities, distance, and the desire to preserve their loved one’s dignity and independence.",
    "That experience shaped the kind of senior care home we wanted to create: a place where residents are not treated as room numbers or schedules, but as people with familiar habits, meaningful memories, personal preferences, and families who care deeply about their well-being.",
    "We wanted to create the kind of home we would feel comfortable choosing for someone in our own family.",
    "A home where caregivers learn how a resident prefers to begin the morning. Where favorite meals, familiar music, personal traditions, and meaningful conversations still matter. Where families feel welcomed, heard, and informed.",
    "That vision became Silver Springs Residence."
  ],
  "approach": [
    "Moving into a residential care home is a meaningful transition for both seniors and their families. Our goal is to make that transition feel less institutional and more familiar.",
    "We begin by getting to know the individual. We learn about the resident’s routines, abilities, preferences, communication style, interests, cultural background, and the details that bring comfort to everyday life.",
    "Care is shaped around the resident’s assessed needs and personal routines. Depending on the individual care plan and our approved scope of services, support may include assistance with personal care, medications, mobility, meals, household needs, supervision, companionship, and communication with families and appropriate care professionals.",
    "Our purpose is not simply to complete daily tasks. It is to provide support in a way that preserves dignity, encourages participation, and respects personal choice."
  ],
  "different": [
    {
      "title": "A Smaller Residential Setting",
      "paragraphs": [
        "Some older adults feel more comfortable in a peaceful home with fewer residents and a familiar daily rhythm. Our intimate setting allows for closer relationships, greater familiarity, and more attention to individual routines."
      ]
    },
    {
      "title": "Care Shaped Around the Person",
      "paragraphs": [
        "We take time to learn the details that matter, from preferred wake-up times and favorite meals to meaningful hobbies, family traditions, and communication preferences.",
        "These details help daily care feel more natural, respectful, and reassuring."
      ]
    },
    {
      "title": "Families Stay Connected",
      "paragraphs": [
        "Families deserve to understand how their loved one is doing and know who to contact when questions arise.",
        "We value clear, respectful communication and encourage families to remain meaningfully involved in their loved one’s care and daily life."
      ]
    },
    {
      "title": "Dignity and Independence",
      "paragraphs": [
        "Receiving assistance should not mean losing identity or choice.",
        "Residents are encouraged to participate in their routines and decisions to the greatest extent possible. Support is provided thoughtfully, without unnecessarily taking over what a resident can still do independently."
      ]
    }
  ],
  "mission": [
    "Our mission is to provide personalized senior care in a warm residential environment where every resident feels safe, respected, valued, and at home.",
    "We are committed to supporting older adults with patience and dignity while giving families confidence that their loved one is receiving thoughtful and attentive care."
  ],
  "values": [
    {
      "title": "Compassion",
      "paragraphs": [
        "We approach every resident with kindness, patience, and understanding."
      ]
    },
    {
      "title": "Dignity",
      "paragraphs": [
        "We respect each resident’s privacy, identity, choices, and life experiences."
      ]
    },
    {
      "title": "Personalization",
      "paragraphs": [
        "We shape care around the individual rather than expecting every resident to follow the same routine."
      ]
    },
    {
      "title": "Trust",
      "paragraphs": [
        "We build confidence through honesty, consistency, accountability, and clear communication."
      ]
    }
  ],
  "licensingIntro": [
    "Silver Springs Residence is a California-licensed Residential Care Facility for the Elderly in Menifee.",
    "Our operational commitments include the policies, training, safety planning, documentation, and standards required to provide residential senior care responsibly and within an approved scope of services."
  ],
  "preparations": [
    "Oversight by a California-certified RCFE administrator",
    "Required criminal background clearances",
    "First aid, CPR, emergency-response, and resident-safety training",
    "Medication-assistance procedures consistent with RCFE requirements",
    "Emergency, disaster, evacuation, and infection-control planning",
    "Resident assessment and care-documentation procedures",
    "Required insurance coverage",
    "Policies supporting resident rights, privacy, dignity, and personal choice",
    "Compliance with California Department of Social Services requirements",
    "Readiness for ongoing regulatory review and oversight"
  ],
  "licensingClosing": [
    "Contact our team for licensing details.",
    "We will never promise services that we are not prepared, staffed, or authorized to provide."
  ],
  "commitment": [
    "Choosing care for someone you love can feel overwhelming. Families may be comparing options while also managing changes in health, mobility, memory, safety, or caregiver availability.",
    "We believe families need more than a sales presentation. They need honest answers, clear expectations, and a thoughtful assessment of whether a home can safely and appropriately meet their loved one’s needs.",
    "When you contact Silver Springs Residence, we will listen carefully, answer your questions, explain our approach, and help you understand the next steps.",
    "If our home is not the appropriate fit, we will communicate that honestly and respectfully."
  ],
  "invitation": [
    "Located in Menifee, California, Silver Springs Residence offers a calm residential environment designed around comfort, familiarity, and personal attention.",
    "We invite you to explore our home, learn about our care approach, and schedule a private visit to determine whether Silver Springs Residence may be the right fit for your family."
  ]
};

function Paragraphs({ paragraphs }) {
  return paragraphs.map(text => <p key={text}>{text}</p>);
}

export default function AboutPage() {
  const { openTourModal } = useTourModal();
  return (
    <div className="about-page">
      <section className="about-intro section-space">
        <div className="site-container about-split">
          <div className="about-copy">
            <p className="eyebrow">Senior Care That Feels Personal</p>
            <h1>About Silver Springs Residence</h1>
            <Paragraphs paragraphs={content.intro} />
          </div>
          <div className="about-intro-photo"><img src="/media/contact-care.webp" alt="A caregiver sharing a reassuring moment with an older adult" width="1800" height="1200" fetchPriority="high" /></div>
        </div>
      </section>
      <section className="site-container section-space about-split about-story" aria-labelledby="about-story-heading">
        <div className="about-copy">
          <h2 id="about-story-heading">How Silver Springs Residence Began</h2>
          <p className="about-subtitle">A Personal Experience That Became a Purpose</p>
          <Paragraphs paragraphs={content.story} />
        </div>
        <figure className="about-story-photo"><img src="/media/residence-living.webp" alt="Illustration of a warm residential living room with a fireplace" width="900" height="600" loading="lazy" /><figcaption>Illustrative living-room imagery from our existing collection.</figcaption></figure>
      </section>
      <section className="about-tinted section-space" aria-labelledby="about-approach-heading">
        <div className="site-container about-reading about-copy">
          <h2 id="about-approach-heading">Our Approach to Residential Care</h2>
          <Paragraphs paragraphs={content.approach} />
        </div>
      </section>
      <section className="site-container section-space" aria-labelledby="about-difference-heading">
        <h2 id="about-difference-heading" className="about-section-title">What Makes Silver Springs Residence Different</h2>
        <div className="about-grid">{content.different.map(item => <div className="about-principle about-copy" key={item.title}><h3>{item.title}</h3><Paragraphs paragraphs={item.paragraphs} /></div>)}</div>
      </section>
      <section className="about-mission section-space" aria-labelledby="about-mission-heading">
        <div className="site-container about-reading about-copy"><h2 id="about-mission-heading">Our Mission</h2><Paragraphs paragraphs={content.mission} /></div>
      </section>
      <section className="site-container section-space" aria-labelledby="about-values-heading">
        <h2 id="about-values-heading" className="about-section-title">Our Core Values</h2>
        <div className="about-grid">{content.values.map(item => <div className="about-principle about-copy" key={item.title}><h3>{item.title}</h3><Paragraphs paragraphs={item.paragraphs} /></div>)}</div>
      </section>
      <section className="about-tinted section-space" aria-labelledby="about-licensing-heading">
        <div className="site-container about-reading about-copy">
          <h2 id="about-licensing-heading">Licensing &amp; Credentials</h2>
          <p className="about-subtitle">Committed to Serving Responsibly</p>
          <Paragraphs paragraphs={content.licensingIntro} />
          <p>Our ongoing commitments include:</p>
          <ul className="about-preparations">{content.preparations.map(text => <li key={text}>{text}</li>)}</ul>
          <Paragraphs paragraphs={content.licensingClosing} />
        </div>
      </section>
      <section className="site-container section-space about-reading about-copy" aria-labelledby="about-family-heading"><h2 id="about-family-heading">Our Commitment to Families</h2><Paragraphs paragraphs={content.commitment} /></section>
      <section className="about-invitation section-space" aria-labelledby="about-visit-heading">
        <div className="site-container about-reading about-copy">
          <h2 id="about-visit-heading">Discover Silver Springs Residence</h2>
          <Paragraphs paragraphs={content.invitation} />
          <div className="about-actions"><Link className="editorial-button" to="/contact-us/locations">Explore Our Home <ArrowUpRight size={17} aria-hidden="true" /></Link><button className="editorial-button button-light" onClick={openTourModal}>Schedule a Private Tour <ArrowUpRight size={17} aria-hidden="true" /></button></div>
        </div>
      </section>
    </div>
  );
}
