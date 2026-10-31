export const reviewed = '2026-10-30';
export const sources = {
  cdss: { title: 'CDSS: Resources for Residents and Families', url: 'https://www.cdss.ca.gov/inforesources/senior-care-licensing/resources-for-residents-and-families' },
  choice: { title: 'CDSS: Choosing a Residential Care Facility for Seniors', url: 'https://www.cdss.ca.gov/Portals/9/CCLD/OHC-RCFE.pdf' },
  aging: { title: 'California Department of Aging: Assisted Living Facilities', url: 'https://aging.ca.gov/care_options/Assisted_Living_Facilities/' },
  search: { title: 'CDSS: Facility Search and Review Guidance', url: 'https://www.cdss.ca.gov/inforesources/community-care-licensing/facility-search-welcome' },
  medicare: { title: 'Medicare: Long-term Care Coverage', url: 'https://www.medicare.gov/coverage/long-term-care' },
  waiver: { title: 'DHCS: Assisted Living Waiver', url: 'https://www.dhcs.ca.gov/services/long-term-care-alternatives-home-and-community-based-service-options/assisted-living-waiver/' },
  county: { title: 'Riverside County Office on Aging: Programs and Services', url: 'https://rcaging.org/programs-services-overview' },
  medications: { title: 'CDSS RCFE Regulations: Section 87465, Incidental Medical and Dental Care', url: 'https://www.cdss.ca.gov/ord/entres/getinfo/pdf/rcfeman3.pdf' },
  dementia: { title: 'CDSS: Dementia Care Information and Regulation Updates', url: 'https://www.cdss.ca.gov/inforesources/dementia-care-information-and-resources' },
  hospice: { title: 'CDSS RCFE Regulations: Food Services and Hospice Requirements', url: 'https://www.cdss.ca.gov/ord/entres/getinfo/pdf/rcfeman4.pdf' },
};
const section = (title, text, extra = {}) => ({ title, paragraphs: text.split('\n\n').filter(Boolean), ...extra });
const faq = (question, answer) => ({ question, answer });
export const guides = [
  {
    slug: 'board-and-care-vs-assisted-living',
    title: 'Board and Care vs. Assisted Living: Which Is Right for Your Parent?',
    description: 'Compare smaller residential homes and larger assisted living settings, with practical questions for California families.',
    intro: 'In California, board and care and assisted living are not necessarily different license types. Both terms can describe Residential Care Facilities for the Elderly, or RCFEs. The useful comparison is often the size, daily environment, available support, and fit for the individual. A six-resident home may suit someone who prefers a quieter household; a larger community may appeal to someone who enjoys extensive amenities and group programming.',
    introSources: ['cdss'],
    sections: [
      section('Start with care needs, then compare the setting', `A preference for a small home cannot replace an assessment. Describe what help your parent needs during an ordinary day and night, including bathing, dressing, medications, meals, transfers, and supervision. Discuss recent changes as well as the routines that currently work.

Ask each provider how those needs would be met in its actual setting. An attractive building may still be unsuitable for a particular mobility need or pattern of confusion. Likewise, a larger building is not automatically able to provide more complex care. Confirm the services and staffing available for the individual.`, { sources: ['aging'] }),
      section('What families can compare on a visit', 'These are comparison questions, not promises about every home or community. Visit more than one setting where practical and record what you observe.', { table: {
        headers: ['Consideration', 'Smaller residential home', 'Larger community'],
        rows: [
          ['Daily atmosphere', 'Ask about household routines, shared spaces, and quiet time.', 'Ask about the pace of common areas and scheduled programming.'],
          ['Social life', 'Discuss opportunities for companionship and personal interests.', 'Ask how residents join groups and receive individual support.'],
          ['Movement', 'Walk the routes between bedroom, bathroom, and dining area.', 'Check distances, elevators, wayfinding, and available assistance.'],
          ['Personal preferences', 'Discuss waking, meals, hobbies, privacy, and family visits.', 'Ask how individual routines fit alongside community schedules.'],
          ['Care and cost', 'Request an assessment and a written explanation of fees.', 'Request the same information so comparisons are meaningful.'],
        ],
      } }),
      section('Include your parent in the decision', `Ask what home means to your parent. They may care most about a private space, a familiar meal, a nearby family member, or a quiet morning routine. Write down two or three priorities in their own words before touring.

For example, imagine a parent who finds busy dining rooms tiring but enjoys conversation with a few familiar people. A smaller home may be worth exploring. Another person who actively seeks larger groups may prefer a different setting. These examples illustrate preferences; neither establishes care suitability.

If communication is difficult, share what you know about past routines and observe how your parent responds during a visit. A respectful explanation and time to process the choice can be more useful than a long list of amenities.`),
      section('Ask how support changes over time', `Discuss what happens if walking, memory, sleep, or personal-care needs change. Ask who reassesses needs, how families are informed, what could affect fees, and what needs the provider cannot accommodate.

Memory loss or hospice involvement does not make every RCFE appropriate. Suitability depends on individual needs, the facility’s capabilities, and applicable requirements. A careful provider should explain limitations as clearly as services.`, { sources: ['aging'] }),
      section('What this means for families in Menifee', `Compare practical travel as well as the building. Consider the relatives most likely to visit, existing healthcare providers, and who will coordinate appointments. Ask about transportation arrangements rather than assuming transportation is included.

Silver Springs Residence offers a six-resident setting in Menifee with furnished private and shared accommodations, subject to availability. Explore Our Home to understand the residential approach, then discuss whether the setting can support your loved one’s assessed needs.`),
      section('Before you decide', '', { items: ['Verify the facility identity and current licensing information.', 'Visit and compare the day-to-day experience, not only photographs.', 'Ask about assistance, supervision, emergencies, changing needs, and full costs.', 'Include your parent’s priorities and request clear explanations in writing.'], sources: ['search'] }),
    ],
    faqs: [faq('Does a smaller home always cost less?', 'No. Room selection, assessed needs, and the services in the agreement affect the quote. Compare written costs for the same needs.'), faq('Can my parent bring familiar belongings?', 'Ask about approved items, room space, safety, and shared-room considerations before packing.'), faq('Should we visit together?', 'When practical and comfortable for your parent, a visit can help you understand preferences and ask questions together.')],
    links: [{ label: 'Explore Our Home', to: '/contact-us/locations' }, { label: 'Read about personalized care', to: '/care' }],
    action: { label: 'Schedule a Private Tour', type: 'tour' },
    sources: ['cdss', 'aging', 'choice', 'search'],
  },
  {
    slug: 'board-and-care-cost-menifee',
    title: 'How Much Does Board and Care Cost in Menifee, California?',
    description: 'Understand room and care cost factors, compare written quotes, and prepare useful pricing questions for a Menifee care home.',
    intro: 'Board-and-care pricing in Menifee depends on the home, room selected, assessed care needs, and services included in the agreement. A starting rate is not a complete personal quote. Silver Springs Residence lists pricing from $4,700/month, based on level of care; final pricing follows an assessment and room discussion. Request a written explanation of included services and possible additional charges before making a commitment.',
    sections: [
      section('Why two quotes may differ', `A useful quote reflects the assistance a person needs, not just the name of a room. Explain routines, transfer needs, medication assistance, meals, supervision, and support during the night. Ask whether the quote is based on a recent assessment or only preliminary information.

Private and shared accommodations may have different rates. Availability can affect which options can actually be offered. At Silver Springs, private-room residents use shared accessible bathrooms, while the shared accommodation has a dedicated bathroom serving that room. Ask to see the available arrangement rather than relying on a generic room description.`, { sources: ['aging'] }),
      section('Ask for a complete written cost picture', 'The California Department of Aging notes that additional fees may apply for more extensive care based on assessed needs. Ask the home to explain its actual agreement, including how a change in care needs could change the cost.', { sources: ['aging'], table: {
        headers: ['Cost question', 'What to request'], rows: [
          ['Room and regular care', 'The quoted arrangement, assessment assumptions, and monthly rate.'],
          ['Included services', 'A written description of meals, daily assistance, housekeeping, laundry, activities, and medication support.'],
          ['Additional charges', 'An explanation of services, supplies, or outside providers billed separately.'],
          ['Changes in needs', 'Who reassesses, how you are notified, and how a revised quote is explained.'],
          ['Move-in and ending residency', 'Any applicable initial payments, notice terms, refunds, and belongings arrangements in the agreement.'],
        ],
      } }),
      section('Build a household budget before choosing', `Set out the regular care-home quote alongside costs the family may continue to pay separately, such as personal purchases, healthcare appointments, insurance, or outside services. Confirm each item instead of assuming that a higher monthly rate includes everything.

Choose one family contact to collect written answers, while keeping the prospective resident involved in decisions to the extent possible. If relatives will share costs, discuss who will manage payments and receive notices before move-in. An organized comparison can prevent misunderstandings later.

A simple worksheet can have four columns: item, included in the home’s quote, paid separately, and question still to resolve. Leave uncertain amounts blank until you receive reliable information; an estimate should not quietly become an agreed charge.`),
      section('Check payment options directly', `Medicare generally does not pay for ongoing nonmedical long-term care. Coverage for a particular medical service is a different question from paying a residential home’s regular charges. Check your actual benefits with the relevant insurer or program.

California’s Assisted Living Waiver has eligibility, enrollment, provider, and room-and-board rules. The DHCS program includes Riverside County, but that does not establish eligibility for an individual or participation by a particular home. Verify current requirements directly and ask Silver Springs which payment arrangements are currently accepted.

For local options counseling and benefits-related questions, Riverside County Office on Aging provides information and assistance. Contact the agency to confirm which services apply to your circumstances.`, { sources: ['medicare', 'waiver', 'county'] }),
      section('What this means for your family', `Compare providers using the same care information and cost questions. A low headline rate is not helpful if important assistance has not been discussed. Equally, a larger quote should come with a clear explanation rather than pressure to decide immediately.

At Silver Springs, ask about current private or shared room availability, assessment, and the services relevant to your loved one. The approved starting price is from $4,700/month, based on level of care. It is not a promise that every room or level of support is available at that amount.`),
      section('Pricing questions to bring', '', { items: ['What information is needed for a personal quote?', 'Which room is available and which services are included?', 'What circumstances could lead to extra charges?', 'How are changes communicated and documented?', 'Which payments and agreement terms need clarification before admission?'] }),
    ],
    faqs: [faq('Can we get a final rate without discussing care needs?', 'A meaningful individual quote needs enough information about the person and room arrangement. Ask what assessment steps are needed.'), faq('Is a sample menu proof that every dietary need can be met?', 'No. Discuss dietary instructions, allergies, texture needs, and eating assistance as part of assessment.'), faq('Does an availability inquiry reserve a room?', 'No. Contacting the team starts a discussion; availability, suitability, and admission arrangements still need confirmation.')],
    links: [{ label: 'See how admission works', to: '/what-to-expect' }, { label: 'Explore dining', to: '/dining' }],
    action: { label: 'Request Current Pricing', to: '/contact-us#contact-form' },
    sources: ['aging', 'medicare', 'waiver', 'county'],
  },
  {
    slug: 'choose-board-and-care-california',
    title: 'How to Choose a Board and Care Home in California',
    description: 'A practical framework for comparing licensing, care fit, daily life, costs, and communication before choosing residential care.',
    intro: 'Choose a California board-and-care home by checking its identity and licensing, assessing whether it can meet the person’s needs, visiting in person, and reviewing care and financial arrangements. Photographs and a friendly tour are only part of the decision. Use the same questions for each home, then compare what you learned with your loved one’s priorities.',
    introSources: ['choice'],
    sections: [
      section('Begin with a written picture of the person', `List the help needed with bathing, dressing, meals, medications, toileting, walking, and transfers. Include sleep routines, communication preferences, memory-related concerns, and recent changes. Distinguish what the person can do independently from the assistance they need reliably.

Write down preferences too. Quiet mornings, familiar foods, privacy, family visits, cultural traditions, and hobbies can shape whether a place feels comfortable. Ask the person what matters most and keep those priorities visible throughout the search.

Share care information honestly with each prospective home. Omitting a difficult night or a recent fall can prevent a useful assessment. Ask how information should be shared privately rather than sending detailed records through a general inquiry form.`),
      section('Check the actual license and facility identity', `Use the CDSS Facility Search entry for the specific home. Match its address, facility name, and license details; a business name can differ from a licensed facility name. Read available reports and follow up with the regional office when information is unclear.

Ask to see current licensing information during the visit. Records are an important starting point, but they should be considered alongside a visit and an individual care discussion. Read our license-verification guide for a more detailed process.`, { sources: ['search'] }),
      section('Use the tour to observe everyday life', `Notice how people are greeted, whether the environment feels comfortable, and how staff explain routines. Walk the route to bedrooms, bathrooms, shared areas, and dining spaces. Ask how someone using your loved one’s mobility equipment would move through the home.

Ask about meals, hydration, personal assistance, medication routines, activities, family communication, and quiet time. A provider should describe these in practical terms without promising a perfect day.

A calm visit cannot reveal everything. Bring a written question list and ask how you can clarify points afterward. If something feels unclear, write down the issue rather than making an assumption.`, { items: ['Who provides support during the day and night?', 'How are urgent needs and emergencies handled?', 'How do families receive updates or raise a concern?', 'What happens if mobility, memory, or care needs change?', 'Which needs cannot be safely accommodated?'] }),
      section('Compare care explanations and written agreements', `Ask each home to explain how the assessment relates to the assistance offered, room choice, and quote. Discuss the roles of outside clinicians or hospice providers when relevant. An RCFE is a nonmedical residential setting, so a promise to handle every future medical need deserves careful clarification.

Read the resident agreement and ask for explanations of included services, additional charges, payment arrangements, and terms for changes or ending residency. Keep copies of information you use to make the decision. If terms remain unclear, seek appropriate professional advice before signing.`, { sources: ['aging'] }),
      section('Recognize when to pause', `Pause if a provider will not share current licensing information, pressures you to commit before questions are answered, or cannot explain how the person’s needs would be met. An answer that requires follow-up is different from a guarantee unsupported by an assessment.

Ask about any discrepancy between written information and what you are told. A thoughtful follow-up can resolve a misunderstanding; an unresolved issue should stay part of your comparison. You do not need to choose a home simply because it was the first one available.`),
      section('What this means for families in Menifee', `Consider practical visiting distance, who can attend appointments, and which family member will coordinate communication. Riverside County Office on Aging can provide information and options counseling if you need help understanding available support. Confirm eligibility and services directly with the agency.

Silver Springs Residence invites families to visit its six-resident Menifee home and discuss care compatibility. The goal is a suitable match, not admission at any cost. A private tour is a chance to see the setting, ask the same questions you bring elsewhere, and understand the next steps.`, { sources: ['county'] }),
    ],
    faqs: [faq('Should we tour more than one home?', 'Where practical, comparing settings can help you identify which environment and explanations best match your priorities.'), faq('What if family members disagree?', 'Separate essential care requirements from preferences, invite the resident’s views, and compare written information using the same criteria.'), faq('Can an attractive home still be unsuitable?', 'Yes. Environment, support capability, staffing, and the individual’s assessed needs must be considered together.')],
    links: [{ label: 'Learn how to verify a license', to: '/resources/family-guides/verify-rcfe-license-california' }, { label: 'Our approach to care', to: '/care' }],
    action: { label: 'Schedule a Private Tour', type: 'tour' }, sources: ['choice', 'search', 'aging', 'county'],
  },
  {
    slug: 'what-is-an-rcfe', title: 'What Is an RCFE? A Simple Guide for California Families',
    description: 'Understand California residential care terminology, everyday support, and how assessment determines whether a home is appropriate.',
    intro: 'An RCFE is a Residential Care Facility for the Elderly: a California-licensed setting providing housing, nonmedical care, and supervision, primarily for older adults. Assisted living and board-and-care homes can fall within this category. The name describes a type of residential care, not a guarantee that every facility offers the same environment or can meet every person’s needs.',
    introSources: ['cdss'],
    sections: [
      section('Why the terminology can be confusing', `Families often hear assisted living, board and care, residential care, and RCFE in the same conversation. RCFE is a California licensing term. Other descriptions often refer to the setting or style of living. A small home in a residential neighborhood and a much larger assisted-living community may both operate as RCFEs.

Ask what a provider is licensed to do and what support it can offer in practice. Terms such as memory support, personalized care, or round-the-clock assistance need explanation in relation to the individual. A label alone does not answer questions about staffing, transfers, medication needs, or changing conditions.`, { sources: ['aging'] }),
      section('What daily support may involve', `Residential support is organized around everyday living. Depending on assessment, the care plan, and facility capability, assistance can include personal care, meals, medication assistance, supervision, activities, and household needs. How this support is delivered matters as much as the list itself.

For example, help with dressing may mean allowing extra time and offering reminders for one person, while another needs more hands-on assistance. Describe the actual task and help needed rather than relying on a broad term such as independent or high care.`, { items: ['Personal routines such as bathing, grooming, dressing, and toileting.', 'Meals, hydration, and assistance during eating when needed.', 'Mobility and transfer support appropriate to the person and setting.', 'Medication assistance within applicable requirements.', 'Supervision, companionship, activities, housekeeping, and laundry.'], sources: ['aging'] }),
      section('How residential care differs from skilled nursing', `An RCFE is a nonmedical care setting rather than a substitute for ongoing skilled nursing care. Some residents receive services from outside professionals when appropriate, but that does not make every residential home suitable for every medical condition.

Ask the prospective home and the person’s healthcare team to clarify what support is needed and who would provide it. A hospital discharge recommendation, diagnosis, or medication list alone does not establish that a particular home is the right setting. The facility still needs to assess compatibility.`, { sources: ['aging'] }),
      section('Memory loss, medications, and hospice need individual discussion', `A person experiencing memory loss may be appropriate for an RCFE when their needs can be met safely. Share routines, communication needs, supervision needs, and changes that concern the family. Avoid assuming that all homes provide the same support because they use similar language.

Medication assistance in an RCFE is not interchangeable with every form of medical treatment or skilled administration. Provide accurate information and ask how physician-directed arrangements would work. Discuss medication changes with the appropriate healthcare professional.

Hospice services involve an outside licensed provider and applicable facility approvals and requirements. At Silver Springs, memory-related needs and hospice compatibility are reviewed individually. Neither is a promise of automatic admission or the ability to remain regardless of future needs.`, { sources: ['aging', 'medications', 'dementia', 'hospice'] }),
      section('What a six-resident home can feel like', `A six-resident setting may offer a more familiar household rhythm and shorter routes between everyday spaces. It may appeal to someone who prefers fewer people and a quieter environment. Others may prefer a larger community’s wider range of shared amenities or group activities.

Silver Springs Residence is a six-resident home in Menifee with private and shared furnished accommodations, subject to availability. Its approach emphasizes individual routines and family communication. Visit Our Home to learn about the setting, and discuss assessed needs before deciding whether it is suitable.

Ask how a typical morning would work for your parent. Who provides reminders? Where are meals served? What happens if someone prefers to rest rather than join an activity? Specific questions help translate general descriptions into a picture of daily life.`),
      section('What this means for families', '', { items: ['Translate unfamiliar labels into practical questions about daily support.', 'Check current licensing information and visit the specific home.', 'Discuss care needs honestly and clarify outside providers’ roles.', 'Review the room arrangement, agreement, and pricing before admission.'], sources: ['search'] }),
    ],
    faqs: [faq('Does RCFE mean only a small home?', 'No. RCFEs vary in size. Ask about licensed capacity and the daily environment.'), faq('Does a diagnosis tell us which home to choose?', 'A diagnosis matters, but suitability also depends on daily needs, risks, preferences, staffing, and facility capability.'), faq('Can we ask questions before scheduling a tour?', 'Yes. An initial conversation can help identify what information and assessment steps would be useful.')],
    links: [{ label: 'Read the residential care FAQ', to: '/resources/faq' }, { label: 'Explore Our Home', to: '/contact-us/locations' }],
    action: { label: 'Discuss Care Needs', to: '/contact-us#contact-form' }, sources: ['cdss', 'aging', 'medications', 'dementia', 'hospice', 'search'],
  },
  {
    slug: 'verify-rcfe-license-california', title: 'How to Verify an RCFE License and Inspection History in California',
    description: 'Use CDSS Facility Search, match the facility identity, review reports, and prepare questions for a visit or regional-office follow-up.',
    intro: 'To check a California RCFE, start with the official CDSS Facility Search, match the specific home’s name and address, review available licensing information and reports, and follow up when details are unclear. Ask the facility for its current licensing information and visit in person. A search result is useful evidence, but it is not a substitute for assessing whether the home can meet your loved one’s needs.',
    introSources: ['search'],
    sections: [
      section('Make sure you have the right home', `Collect the facility’s licensed name, full street address, and license or facility number from the provider. A marketing name may not be identical to the licensed name. Similar names and nearby addresses can make it easy to review the wrong entry.

Silver Springs Residence’s Braverde home is at 32336 Parker Street, Menifee, CA 92584. Contact the team for its current licensing details. This guide does not supply or guess a license number. Use the details provided by the home to make a specific match.`),
      section('Use the official search and read the entry', `Open CDSS Facility Search through the official welcome page. Choose the appropriate facility type for elderly assisted living and use the current search options for a name, location, or facility number. The interface may change, so follow the instructions shown by CDSS.

Check the address and identifying information before reading reports. Note the status and regional office associated with the entry. Save a dated note of what you found and the questions you want to clarify, rather than treating a screenshot as a permanent statement of status.`, { items: ['Obtain the licensed name, address, and facility number.', 'Search through the official CDSS website.', 'Match the entry to the specific home you plan to visit.', 'Review available status information and reports.', 'Follow up with the facility or regional office about unclear details.'], sources: ['search'] }),
      section('Read reports in context', `Look at the type and date of each report and read the full text rather than only a summary. An inspection, complaint investigation, and follow-up can describe different events. Where a report identifies a concern, ask what happened, what corrective steps were taken, and how current practice is monitored.

Do not assume that a report title alone explains the outcome. Equally, a lack of visible reports should not be treated as proof that no concerns have ever existed. CDSS explains that the website provides a limited period of information and directs families to the regional office for additional details.

Keep notes that distinguish what the public record says, what the provider explains, and what still requires confirmation. That separation makes follow-up more useful and avoids turning an unanswered question into a conclusion.`, { sources: ['search'] }),
      section('When the regional office can help', `Use the regional-office information associated with the facility when a search is unclear, records appear incomplete, or you need context. Ask how to review available public licensing information or a facility file. CDSS describes this process in its consumer resources.

If an entry cannot be confidently matched, return to the provider for exact licensed details. Names, ownership, or locations may require clarification. Avoid guessing which entry belongs to a home merely because it is nearby.

Make follow-up questions specific. For example, ask which record corresponds to the address or how to obtain information outside the online period. Keep the date and source of the answer with your notes.`, { sources: ['cdss'] }),
      section('Combine the record review with a visit', `Bring your questions to the home. Ask to see current licensing information and discuss daily support, supervision, medication assistance, emergency arrangements, and how changes in needs are handled.

A current license is not a personal care assessment. Even a home with reassuring records may not suit a particular transfer need, night-time routine, or medical requirement. Compare the record, visit, and assessment together.

For families in Menifee, a convenient location can help with visits and communication, but convenience should not replace these checks. Include your parent’s preferences and ask for a clear explanation of services and limitations.`),
      section('What this means for families', '', { items: ['Match identity before interpreting reports.', 'Read complete documents and note their dates.', 'Ask about the original concern and the current response.', 'Contact the regional office when you need more information.', 'Use licensing information alongside a visit and assessment.'] }),
    ],
    faqs: [faq('What if the business name is different?', 'Ask for the licensed facility name and number, then confirm the address. Do not rely on a similar name alone.'), faq('Does no report visible online mean there is nothing to ask about?', 'No. Discuss current practices and use the regional office when you need more licensing information.'), faq('Can Silver Springs provide its license details?', 'Contact the team for current licensing information and discuss it during a private visit.')],
    links: [{ label: 'CDSS Facility Search', to: sources.search.url }, { label: 'Questions to ask when choosing a home', to: '/resources/family-guides/choose-board-and-care-california' }],
    action: { label: 'Schedule a Private Tour', type: 'tour' }, sources: ['search', 'cdss', 'choice'],
  },
  {
    slug: 'residential-care-move-in-checklist', title: 'Moving a Parent Into Residential Care: Complete Move-In Checklist',
    description: 'A printable planning checklist for assessment, documents, medications, belongings, move-in day, and family communication.', printable: true,
    intro: 'Prepare for a move into residential care by confirming care compatibility first, then coordinating documents, medications, room arrangements, familiar belongings, and family communication with the home. A packing list alone is not an admission plan. Use this printable checklist to organize questions; the home’s assessment, agreement, and instructions determine what is needed for your loved one.',
    sections: [
      section('Before setting a move-in date', `Begin with the prospective resident’s needs, wishes, and available room arrangement. Ask what assessment and medical information the home needs to determine whether it can provide appropriate support. Choosing a room does not settle care suitability.

At Silver Springs, admission includes discussion of care needs, a private tour, assessment, compatibility review, pricing and room selection, documentation, the resident agreement, and a personalized move-in plan. Timing depends on completing the necessary steps and confirming availability.

Include your parent in choices where possible. They may prefer to visit before moving, choose familiar bedding, or decide where photographs will go. Small decisions can help preserve a sense of control during a major change.`),
      section('Care information and documents to organize', 'Ask the home for its current documentation list and how to share information securely. Keep originals or sensitive records where the responsible person can access them; confirm which copies the home needs.', { items: ['Current contact information for the resident, family contacts, and relevant healthcare providers.', 'The medical assessment and admission documentation requested by the home.', 'An accurate medication list, allergies, and physician-directed dietary instructions.', 'Information about mobility equipment, transfers, communication, sleep, and routines.', 'Relevant decision-making documents, if applicable, discussed with the home and appropriate professionals.', 'The written room arrangement, care quote, agreement, and unresolved questions.'], sources: ['choice'] }),
      section('Coordinate medications and equipment before arrival', `Ask how medications, current instructions, refills, and the supplying pharmacy should be coordinated. Bring medicines according to the home’s instructions and clarify who will check the information at handover. Do not change doses, stop medication, or repackage supplies to simplify moving without appropriate professional direction.

Confirm the mobility aids and other equipment the person will use and whether the home can accommodate them. Ask who is responsible for arranging outside services or equipment deliveries. A last-minute equipment surprise can complicate an otherwise well-planned arrival.`, { items: ['Confirm medication handover and refill arrangements.', 'Clarify instructions from the prescribing professional.', 'Check the fit and condition of approved mobility equipment.', 'Agree how outside providers will communicate with the home.'], sources: ['medications'] }),
      section('Pack for familiarity, comfort, and safe use of space', 'Choose belongings with your parent rather than recreating an entire household at once. Furnished rooms provide a starting point, and selected familiar items can make the space more personal. Confirm what is appropriate for the room, shared spaces, and safe movement.', { items: ['Comfortable clothing, suitable footwear, and everyday personal-care items.', 'Glasses, hearing aids, chargers, and other commonly used items, with a storage plan.', 'Approved photographs, a favorite book, music, or meaningful small keepsakes.', 'Bedding or selected furnishings only after checking space and approval.', 'An inventory of important belongings and who will manage valuables.', 'A plan for items that should stay with family or need further approval.'] }),
      section('Plan move-in day and the first few days', `Agree on arrival time, who will accompany your parent, and who will give the care handover. Avoid scheduling so many tasks that there is no time for a calm introduction. Let the home know about meals, rest, or familiar routines that may make the day easier.

Discuss visits and communication during settling in. Some people want company immediately; others appreciate quieter time. Follow the individual’s preferences alongside the care team’s guidance. The goal is a workable routine, not a promise that adjustment will happen on a fixed schedule.`, { items: ['Confirm arrival, first-day contacts, and a handover conversation.', 'Settle essential items before adding extra belongings.', 'Agree how family questions and updates will be handled.', 'Share changes in appetite, sleep, mood, mobility, or comfort with the team.'] }),
      section('What this means for families in Menifee', `Plan the practical side of staying involved: travel for visits, who can attend appointments, and which relative will be the main contact. Riverside County Office on Aging provides information about local support options; confirm current services and eligibility directly.

Return to the checklist after the first conversations with the home. Mark what is confirmed, what is still a question, and who will follow up. A clear shared plan is more useful than a perfectly packed bag with important care questions unresolved.`, { sources: ['county'] }),
    ],
    faqs: [faq('Should we buy furniture before the tour?', 'Check the room, included furnishings, approval requirements, and safe space first. Silver Springs rooms are furnished.'), faq('Can we send every record through the contact form?', 'Use the initial inquiry to arrange a conversation and ask how to provide sensitive documentation appropriately.'), faq('Is this a list of legal admission requirements?', 'No. It is a practical planning tool; confirm the documentation and instructions for the individual admission.')],
    links: [{ label: 'See What to Expect', to: '/what-to-expect' }, { label: 'Explore room options', to: '/contact-us/locations#home-rooms' }],
    action: { label: 'Ask About Current Room Availability', to: '/contact-us?inquiry=room-availability#contact-form' }, sources: ['choice', 'medications', 'county'],
  },
];
