import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import * as Accordion from "@radix-ui/react-accordion";
import { ArrowUpRight, ChevronDown, Printer, BookOpen } from "lucide-react";
import { useTourModal } from "@/hooks/use-tour-modal";
import faqData from "./faq-data.json";
import { guides, sources, reviewed } from "./guide-data";
import "@/styles/resources.css";

const base = "/resources/family-guides";
const faqSources = { 7: ["dementia"], 9: ["medications"], 10: ["hospice"], 13: ["hospice"] };
const slugify = text => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const reviewDate = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${reviewed}T12:00:00Z`));
function Metadata({ title, description }) {
  useEffect(() => {
    const priorTitle = document.title;
    const existing = document.querySelector('meta[name="description"]');
    const priorDescription = existing?.getAttribute("content");
    const meta = existing || document.createElement("meta");
    meta.setAttribute("name", "description");
    meta.setAttribute("content", description);
    if (!existing) document.head.appendChild(meta);
    document.title = title;
    return () => { document.title = priorTitle; if (existing) meta.setAttribute("content", priorDescription ?? ""); else meta.remove(); };
  }, [title, description]);
  return null;
}
function Action({ action, className = "editorial-button" }) {
  const { openTourModal } = useTourModal();
  if (action.type === "tour") return <button className={className} onClick={openTourModal}>{action.label}<ArrowUpRight size={17} aria-hidden="true" /></button>;
  if (action.to.endsWith(".pdf")) return <a className={className} href={action.to} download>{action.label}<ArrowUpRight size={17} aria-hidden="true" /></a>;
  if (action.to.startsWith("https:")) return <a className={className} href={action.to}>{action.label}<ArrowUpRight size={17} aria-hidden="true" /></a>;
  return <Link className={className} to={action.to}>{action.label}<ArrowUpRight size={17} aria-hidden="true" /></Link>;
}
function Citations({ ids = [] }) {
  return ids.length ? <p className="resource-citations">Sources: {ids.map((id, i) => <span key={id}>{i > 0 && "; "}<a href={sources[id].url}>{sources[id].title}</a></span>)}</p> : null;
}
function Hero({ eyebrow = "Guidance for your family", title, children, image = false }) {
  return <section className="resource-hero section-space"><div className={`site-container ${image ? "resource-split" : "resource-reading"}`}><div className="resource-copy"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1>{children}</div>{image && <figure><img src="/media/contact-care.webp" alt="A caregiver sharing a reassuring moment with an older adult" width="1800" height="1200" fetchPriority="high" /><figcaption>Stock caregiving imagery; not Silver Springs staff or residents.</figcaption></figure>}</div></section>;
}
function Closing({ title = "Let’s Talk About Your Family’s Next Step", action = { type: "tour", label: "Schedule a Private Tour" } }) {
  return <section className="resource-closing section-space" data-print-hide><div className="site-container resource-reading"><h2>{title}</h2><Action action={action} /></div></section>;
}
function Related({ links }) {
  return <nav className="resource-related" aria-label="Related resources">{links.map(link => <Action key={link.to} action={link} className="editorial-link" />)}</nav>;
}
function Blocks({ blocks }) {
  return blocks.map((block, index) => {
    if (block.type === "p") return <p key={index}>{block.text}</p>;
    if (block.type === "action") return <Action key={index} action={block} className="editorial-link" />;
    const Tag = block.type === "ol" ? "ol" : "ul";
    return <Tag key={index}>{block.items.map(item => <li key={item}>{item}</li>)}</Tag>;
  });
}

export function FAQPage() {
  return <div className="resource-page resource-faq-page">
    <Metadata title="RCFE & Board and Care FAQ | Silver Springs Residence Menifee, CA" description="Get answers about RCFEs, board and care, senior care costs, dementia support, hospice, rooms, meals, admissions and licensing at Silver Springs Residence in Menifee, CA." />
    <Hero eyebrow="Resources · FAQ" title="Frequently Asked Questions About Residential Care in Menifee"><p>Choosing care for someone you love can bring a lot of questions. We’ve answered some of the most common questions families ask about Residential Care Facilities for the Elderly (RCFEs), board-and-care homes, daily support, pricing, admissions, and life at Silver Springs Residence.</p></Hero>
    <div className="site-container resource-reading section-space">
      <nav className="resource-jump-links" aria-label="FAQ categories">{faqData.categories.map(name => <a key={name} href={`#${slugify(name)}`}>{name}</a>)}</nav>
      {faqData.categories.map((name, category) => <section className="resource-faq-category" key={name} aria-labelledby={slugify(name)}>
        <h2 id={slugify(name)}>{name}</h2>
        <Accordion.Root type="multiple" defaultValue={category === 0 ? ["faq-1"] : []}>
          {faqData.questions.filter(q => q.category === category).map(q => <Accordion.Item value={`faq-${q.id}`} id={`faq-${q.id}`} className="resource-faq-item" key={q.id}>
            <Accordion.Header asChild><h3><Accordion.Trigger className="resource-faq-trigger"><span>{q.question}</span><ChevronDown size={20} aria-hidden="true" /></Accordion.Trigger></h3></Accordion.Header>
            <Accordion.Content className="resource-faq-answer resource-copy" forceMount><Blocks blocks={q.blocks} /><Citations ids={faqSources[q.id]} />{q.id === 19 && <Action action={{ label: "Check Licensing with CDSS", to: sources.search.url }} className="editorial-link" />}</Accordion.Content>
          </Accordion.Item>)}
        </Accordion.Root>
      </section>)}
      <section className="resource-sources" aria-labelledby="faq-sources"><h2 id="faq-sources">Official Sources</h2><p>California care and licensing guidance reviewed <time dateTime={reviewed}>{reviewDate}</time>. Individual suitability remains subject to assessment and the home’s approved capabilities.</p><Citations ids={['cdss','aging','search','medications','dementia','hospice']} /></section>
      <Related links={[{ label: "Explore Family Guides", to: base }, { label: "What to Expect", to: "/what-to-expect" }]} />
    </div><Closing />
  </div>;
}

export function FamilyGuidesPage() {
  return <div className="resource-page">
    <Metadata title="Family Guides | Senior Care Guides | Silver Springs Residence" description="Practical California family guides to residential care, costs, licensing, choosing a home, and preparing for move-in in Menifee." />
    <Hero title="Family Guides" eyebrow="Resources · Family guides" image><p>Clear information can make the next step feel more manageable. Explore practical guides to residential care, comparing homes, understanding costs, checking licensing, and preparing for a move.</p><p>Start with the question your family is facing today. These guides complement an individual care discussion and a visit to the home.</p></Hero>
    <section className="site-container section-space" aria-labelledby="family-guides-heading"><h2 id="family-guides-heading">Guides for Thoughtful Decisions</h2><div className="resource-card-grid">{guides.map((guide, index) => <article className="resource-guide-card" key={guide.slug}><span className="resource-guide-number" aria-hidden="true">0{index + 1}</span><h3><Link to={`${base}/${guide.slug}`}>{guide.title}</Link></h3><p>{guide.description}</p><Link className="editorial-link" to={`${base}/${guide.slug}`} aria-label={`Read guide: ${guide.title}`}>Read Guide<ArrowUpRight size={17} aria-hidden="true" /></Link></article>)}</div></section>
    <section className="resource-tinted section-space"><div className="site-container resource-reading resource-copy"><BookOpen size={30} className="resource-symbol" aria-hidden="true" /><h2>A Question Before You Begin?</h2><p>Our FAQ offers quick answers about everyday support, rooms, meals, pricing, admissions, and licensing.</p><Related links={[{ label: "Read the FAQ", to: "/resources/faq" }, { label: "See What to Expect", to: "/what-to-expect" }]} /></div></section><Closing />
  </div>;
}

export function FamilyGuidePage() {
  const { slug } = useParams();
  const guide = guides.find(item => item.slug === slug);
  return guide ? <GuideArticle guide={guide} /> : <Navigate to={base} replace />;
}
function GuideArticle({ guide }) {
  return <div className={`resource-page resource-guide ${guide.printable ? "resource-guide-printable" : ""}`}>
    <Metadata title={`${guide.title} | Silver Springs Residence`} description={guide.description} />
    <Hero eyebrow="Family guides · California & Menifee" title={guide.title}><p>{guide.intro}</p><Citations ids={guide.introSources} /><p className="resource-reviewed">Reviewed <time dateTime={reviewed}>{reviewDate}</time> · Silver Springs Residence</p></Hero>
    <article className="site-container resource-reading resource-copy section-space" aria-label={guide.title}>
      <nav className="resource-toc" aria-label="In this guide" data-print-hide><p className="eyebrow">In this guide</p><ol>{guide.sections.map(section => <li key={section.title}><a href={`#${slugify(section.title)}`}>{section.title}</a></li>)}</ol></nav>
      {guide.printable && <button className="editorial-button resource-print" onClick={() => window.print()} data-print-hide><Printer size={18} aria-hidden="true" />Print This Checklist</button>}
      {guide.sections.map(section => <section className="resource-guide-section" key={section.title} aria-labelledby={slugify(section.title)}><h2 id={slugify(section.title)}>{section.title}</h2>{section.paragraphs.map(p => <p key={p}>{p}</p>)}{section.items && <ul className={guide.printable ? "resource-print-list" : undefined}>{section.items.map(item => <li key={item}>{item}</li>)}</ul>}{section.table && <div className="resource-table-scroll" role="region" aria-label={`${section.title} comparison table`} tabIndex={0}><table><caption>{section.title}</caption><thead><tr>{section.table.headers.map(h => <th scope="col" key={h}>{h}</th>)}</tr></thead><tbody>{section.table.rows.map(row => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th scope="row" key={index}>{cell}</th> : <td key={index}>{cell}</td>)}</tr>)}</tbody></table></div>}<Citations ids={section.sources} /></section>)}
      <section className="resource-guide-section" aria-labelledby="guide-faq"><h2 id="guide-faq">Related Questions</h2>{guide.faqs.map(f => <div className="resource-related-question" key={f.question}><h3>{f.question}</h3><p>{f.answer}</p></div>)}</section>
      <section className="resource-sources" aria-labelledby="guide-sources"><h2 id="guide-sources">Sources &amp; Further Reading</h2><p>Official sources reviewed <time dateTime={reviewed}>{reviewDate}</time>. Confirm current requirements and individual circumstances with the relevant agency and the home.</p><ul>{guide.sources.map(id => <li key={id}><a href={sources[id].url}>{sources[id].title}</a></li>)}</ul></section>
      <Related links={guide.links} /><Related links={[{ label: "All Family Guides", to: base }]} />
    </article><Closing action={guide.action} />
  </div>;
}

const whyFeatures = [
  ['A Smaller Residential Setting', 'Our intimate six-resident setting allows for closer relationships, greater familiarity, and more attention to individual routines. Silver Springs is a residential home, with comfortable shared spaces and a quieter household environment.'],
  ['Care Shaped Around the Person', 'We take time to learn the details that matter, from preferred wake-up times and favorite meals to meaningful hobbies, family traditions, and communication preferences. Care is shaped around assessed needs and personal routines.'],
  ['Familiar Routines. Familiar Faces.', 'In a smaller home, residents are cared for by a more familiar group of caregivers. That consistency helps caregivers notice changes in routines, appetite, mobility, mood, and other needs.'],
  ['Families Stay Connected', 'We value clear, respectful communication and encourage families to remain meaningfully involved in their loved one’s care and daily life. Families deserve to understand how their loved one is doing and know who to contact when questions arise.'],
  ['Dignity and Independence', 'Residents are encouraged to participate in their routines and decisions to the greatest extent possible. Support is provided thoughtfully, without unnecessarily taking over what a resident can still do independently.'],
  ['An Honest Assessment of Fit', 'We only recommend admission when we believe Silver Springs Residence is the right fit. If a resident’s needs exceed what we can safely or legally provide, we will communicate that clearly.'],
];
export function WhyUsPage() {
  return <div className="resource-page">
    <Metadata title="Why Us | Personalized Residential Care | Silver Springs Residence" description="Learn about Silver Springs Residence’s six-resident setting, personalized routines, family communication, and thoughtful approach to care in Menifee." />
    <Hero eyebrow="Why Silver Springs" title="Care That Feels Personal" image><p>Our home is built around a simple belief: older adults deserve more than assistance with daily routines. They deserve to be known, respected, listened to, and supported as individuals.</p><p>At Silver Springs Residence, our six-resident home is designed around familiarity, personalized attention, comfort, and peace of mind.</p></Hero>
    <section className="site-container section-space resource-feature-grid" aria-label="Why families choose Silver Springs">{whyFeatures.map(([title,p]) => <div className="resource-feature resource-copy" key={title}><h2>{title}</h2><p>{p}</p></div>)}</section>
    <section className="resource-tinted section-space"><div className="site-container resource-reading resource-copy"><h2>See the Home for Yourself</h2><p>Care is shaped around the resident’s assessed needs and our approved scope of services. We invite families to visit, ask questions, and discuss whether the home can safely and appropriately meet their loved one’s needs.</p><Related links={[{ label: "About Silver Springs", to: "/about" }, { label: "Explore Our Home", to: "/contact-us/locations" }]} /></div></section><Closing />
  </div>;
}
const admissionSteps = [
  ['Initial conversation', 'We begin with a conversation about your loved one’s current situation, care needs, routines, and preferences. We will listen carefully, answer your questions, and explain the next steps.'],
  ['Private tour', 'Visit the home, see available rooms, bathrooms and shared spaces, meet our team, and ask questions about daily life and support.'],
  ['Resident assessment', 'We consider the person’s abilities, personal-care needs, mobility, communication, dietary needs, sleep habits, and other factors that may affect daily care.'],
  ['Review of care compatibility', 'Before admission, we review whether our home can safely and appropriately provide support within our license, staffing, and care capabilities. Memory-related needs and hospice compatibility are reviewed individually.'],
  ['Pricing and room selection', 'Private and shared accommodations are subject to current availability. Final care pricing follows assessment; families receive information about applicable rates, included services, and potential additional charges before admission.'],
  ['Required medical and admission documentation', 'Our team will explain which medical and admission documents are needed and how to provide them. Bring questions about medications, dietary instructions, mobility equipment, and outside providers.'],
  ['Resident agreement', 'Review the agreement and ask for explanations of services, applicable fees, and arrangements before making a commitment.'],
  ['Personalized move-in plan', 'Coordinate the transition with the team, including approved familiar belongings, care routines, family communication, and practical move-in arrangements.'],
];
export function WhatToExpectPage() {
  return <div className="resource-page">
    <Metadata title="What to Expect | Visits & Admission | Silver Springs Residence" description="Understand the eight steps from an initial conversation and private tour to assessment, room selection, documentation, and a personalized move-in plan." />
    <Hero title="What to Expect" eyebrow="A thoughtful next step" image><p>Choosing residential care is a significant decision. A private tour allows you to experience how the home feels, ask questions, and talk with us about your loved one’s individual needs.</p><p>The process generally begins with a conversation. The next steps may include the sequence below, depending on care compatibility, availability, and completion of the necessary arrangements.</p></Hero>
    <section className="site-container resource-reading section-space" aria-labelledby="admission-process"><h2 id="admission-process">From First Conversation to Feeling at Home</h2><ol className="resource-steps">{admissionSteps.map(([title,p],index) => <li key={title}><span aria-hidden="true">0{index+1}</span><div className="resource-copy"><h3>{title}</h3><p>{p}</p></div></li>)}</ol></section>
    <section className="resource-tinted section-space"><div className="site-container resource-reading resource-copy"><h2>Questions Are Welcome at Every Step</h2><p>We only recommend admission when we believe Silver Springs Residence can safely and appropriately meet the prospective resident’s needs. A tour or availability inquiry does not guarantee admission or reserve a room.</p><Related links={[{ label: "Read the Move-In Checklist", to: `${base}/residential-care-move-in-checklist` }, { label: "Ask About Current Room Availability", to: "/contact-us?inquiry=room-availability#contact-form" }, { label: "Contact Our Team", to: "/contact-us#contact-form" }]} /></div></section><Closing />
  </div>;
}
