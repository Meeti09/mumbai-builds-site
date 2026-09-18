/**
 * Every piece of Mumbai Builds copy lives here so the section components stay
 * presentational. Swap values in this file, not in the components.
 */

export const site = {
  name: "Mumbai Builds",
  tagline: "Build What Matters",
  description:
    "A Mumbai-wide student innovation platform connecting promising builders with industry, technology, mentors, and real-world problems.",
  registerHref: "#register",
  briefHref: "#tracks",
  year: 2026,
};

export const navLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Timeline", href: "#timeline" },
  { label: "Tracks", href: "#tracks" },
  { label: "Finale", href: "#finale" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Organizers", href: "#organizers" },
  { label: "FAQ", href: "#faq" },
  { label: "Community", href: "#community" },
];

/* ------------------------------------------------------------------ hero */

export const hero = {
  titleTop: "Mumbai Builds",
  titleBottom: "Build What Matters",
  blurb: site.description,
  primaryCta: { label: "Register Now", href: site.registerHref },
  secondaryCta: { label: "Round 1 Brief", href: site.briefHref },
  note: "Note: the Grand Finale is a single-day, in-person round in Mumbai.",
};

export const heroCode = `import { Problem, Team } from "@mumbaibuilds/core";

const team = new Team({ size: 4, city: "Mumbai" });

const result = await team.build({
  track: "Urban Innovation & Fintech",
  round: 2,
  hours: 24
});

console.log(result.ship());`;

/* -------------------------------------------------------------- overview */

export const overview = {
  eyebrow: "A stronger Mumbai, together",
  headingTop: "Mumbai Builds",
  headingMiddle: "in collaboration with",
  headingBottom: "Industry, Campuses & Mentors",
  blurb:
    "Mumbai Builds brings colleges, working engineers, and partner technology teams into one room so student builders ship against problems that people actually have.",
  landmarks: [
    { label: "Mumbai", src: "/art/landmark-mumbai.svg", alt: "Abstract Mumbai skyline artwork" },
    { label: "MMR & Pune", src: "/art/landmark-region.svg", alt: "Abstract regional skyline artwork" },
  ],
};

/* ------------------------------------------------------- insight panels */

export type StatCard = { value: string; label: string };
export type SplitCard = { title: string; body: string; pill: string; tone: "blue" | "cyan" };

export const eligibilityPanel = {
  id: "eligibility",
  badge: "Who Can Build",
  heading: "Eligibility",
  blurb:
    "Mumbai Builds is open to undergraduate students across the region. Bring a team, bring a laptop, and bring something you actually want to fix.",
  cta: { label: "Read the rulebook", href: "#faq" },
  art: { src: "/art/assets/eligibility.png", alt: "Neon graduation cap representing student eligibility" },
  artWidthClass: "max-w-[320px] sm:max-w-[400px] md:max-w-[440px]",
  stats: [
    { value: "UG", label: "Students Only" },
    { value: "18+", label: "Minimum Age" },
    { value: "4", label: "Team Size" },
    { value: "4", label: "Eligible Regions" },
  ] satisfies StatCard[],
  cards: [
    {
      title: "Inter-College Teams",
      body: "Teams may mix students from different colleges. Find the right four people, not the four people who happen to sit near you.",
      pill: "Inter-college allowed",
      tone: "blue" as const,
      art: "/art/gallery-05.svg",
    },
    {
      title: "Where You Study",
      body: "Open to undergraduate students enrolled in Mumbai, Thane, Pune and Raigad. One valid college ID per participant at check-in.",
      pill: "Mumbai · Thane · Pune · Raigad",
      tone: "cyan" as const,
      art: "/art/gallery-02.svg",
    },
  ],
};

export const prizePanel = {
  id: "prizes",
  badge: "Recognition",
  heading: "Prize Pool",
  blurb:
    "₹50,000 across the top three teams at the Grand Finale, plus visibility with the partner and mentor network that judged you.",
  cta: { label: "See the tracks", href: "#tracks" },
  art: { src: "/art/emblem-region.svg", alt: "Prize pool emblem" },
  artWidthClass: "max-w-[250px] sm:max-w-[300px] md:max-w-[340px] lg:max-w-[380px]",
  stats: [
    { value: "₹50K", label: "Total Pool" },
    { value: "₹30K", label: "1st Place" },
    { value: "₹15K", label: "2nd Place" },
    { value: "₹5K", label: "3rd Place" },
  ] satisfies StatCard[],
  cards: [
    {
      title: "Beyond the Cash",
      body: "Finalists get mentor feedback on record, an introduction to the partner network, and a project worth putting at the top of a résumé.",
      pill: "Mentorship & introductions",
      tone: "blue" as const,
      art: "/art/gallery-04.svg",
    },
    {
      title: "On the Record",
      body: "Winning teams and standout projects are featured across Mumbai Builds channels and shared with partner engineering teams.",
      pill: "Featured across our channels",
      tone: "cyan" as const,
      art: "/art/gallery-06.svg",
    },
  ],
};

/* -------------------------------------------------------------- timeline */

export const timeline = {
  heading: "Mumbai Builds Express",
  subheading: "Your journey from problem statement to prototype",
  stops: [
    {
      title: "Registration Opens",
      date: "10 October 2026",
      description: "Form your team & register",
      stationMarathi: "नोंदणी सुरू",
      station: "Registrations Open",
      daysToNext: 1,
    },
    {
      title: "Round 1 Problem Statements",
      date: "11 October 2026",
      description: "Statements go live online",
      stationMarathi: "समस्या विधाने जाहीर",
      station: "Problem Statements Live",
      daysToNext: 93,
    },
    {
      title: "Initial Registration Deadline",
      date: "12 January 2027",
      description: "First window closes",
      stationMarathi: "पहिली अंतिम मुदत",
      station: "First Deadline",
      daysToNext: 5,
    },
    {
      title: "Extended Registration + Round 1 Submission",
      date: "17 January 2027",
      description: "Last call & submissions due",
      stationMarathi: "वाढीव मुदत व सादरीकरण",
      station: "Extension & Submission",
      daysToNext: 20,
    },
    {
      title: "Final Problem Statement Release",
      date: "6 February 2027",
      description: "Finale statement revealed",
      stationMarathi: "अंतिम समस्या विधान",
      station: "Final Statement",
      daysToNext: 1,
    },
    {
      title: "Grand Finale",
      date: "7 February 2027",
      time: "8:00 AM – 6:00 PM",
      description: "24-hour sprint concludes in Mumbai",
      stationMarathi: "भव्य अंतिम फेरी, मुंबई",
      station: "Grand Finale, Mumbai",
      daysToNext: 0,
    },
  ],
};

/* ---------------------------------------------------------------- tracks */

export const tracks = {
  heading: "Tracks",
  items: [
    {
      index: "01",
      tab: "Urban Innovation & Fintech",
      title: "Urban Innovation & Fintech: the city as a product surface",
      badge: "All Levels",
      body: "Commutes, civic services, informal credit, small-business payments, local logistics. Build for the constraints a Mumbai street actually imposes — patchy connectivity, cash-first habits, and users with thirty seconds of patience.",
      art: "/art/track-urban.svg",
      accent: "56,189,248",
    },
    {
      index: "02",
      tab: "Tech for Good / Accessibility / AI-ML",
      title: "Tech for Good, Accessibility & AI-ML",
      badge: "All Levels",
      body: "Assistive interfaces, regional-language access, public-health and education tooling, and applied ML where the model is the means rather than the demo. Judged on who it helps, not on how novel the stack is.",
      art: "/art/track-good.svg",
      accent: "52,211,153",
    },
    {
      index: "03",
      tab: "Sponsor Track",
      title: "Sponsor Track: a live brief from a partner team",
      badge: "Partner Brief",
      body: "A scoped problem contributed by a partner engineering team, shipped with their APIs and their mentors in the room. Teams here compete on equal footing and stay eligible for every main prize.",
      art: "/art/track-sponsor.svg",
      accent: "251,191,36",
    },
  ],
};

export const format = {
  heading: "Competition Format",
  eyebrow: "Two Rounds",
  intro:
    "Mumbai Builds runs in two rounds. Round 1 filters on thinking; Round 2 filters on shipping.",
  rounds: [
    {
      tag: "Round 1",
      title: "Online Qualification",
      body: "Pick a problem statement, submit your approach and a working proof of concept entirely online. No travel, no cost — just a clear plan and evidence you can build it.",
      accent: "green" as const,
      icon: "01",
    },
    {
      tag: "Round 2",
      title: "24-Hour Hybrid Sprint",
      body: "Shortlisted teams get the final problem statement, then build for 24 hours — partly remote, concluding in person at the Grand Finale in Mumbai.",
      accent: "blue" as const,
      icon: "02",
    },
  ],
  highlight: {
    title: "One Grand Finale, ₹50,000 on the table",
    body: "The sprint closes with live presentations and evaluation on 7 February 2027.",
    footnote: "(Round 1 is fully online — only finalists travel.)",
  },
  cta: { label: "View Round 1 Brief", href: site.briefHref },
  note: "Tracks: Urban Innovation & Fintech · Tech for Good / Accessibility / AI-ML · Sponsor Track — full statements publish 11 October 2026.",
};

/* ---------------------------------------------------------------- finale */

export const finale = {
  heading: "Grand Finale",
  eyebrow: "Sunday, 7 February 2027",
  window: "8:00 AM – 6:00 PM",
  intro:
    "One room, ten hours, and a working build at the end of it. Here is how the day runs.",
  schedule: [
    { time: "8:00 AM", title: "Check-in", body: "ID verification, team confirmation, table allotment." },
    { time: "8:45 AM", title: "Breakfast", body: "Eat before the clock starts. You will forget later." },
    { time: "9:30 AM", title: "Sponsor Session", body: "Partner teams walk through their APIs, credits and constraints." },
    { time: "10:30 AM", title: "Building", body: "Heads down. Mentors circulate through the floor all day." },
    { time: "1:30 PM", title: "Lunch", body: "Served on the floor so momentum survives the break." },
    { time: "3:30 PM", title: "Presentation & Evaluation", body: "Live demos to the jury, followed by questions." },
    { time: "5:30 PM", title: "Results", body: "Winners announced and prizes awarded on stage." },
  ],
};

/* ----------------------------------------------------------------- value */

export const value = {
  badge: "Why It's Worth Your Weekend",
  heading: "What You Take Away",
  blurb:
    "Mumbai Builds is built around five things that outlast the scoreboard.",
  items: [
    {
      title: "Real-World Problem Solving",
      body: "Statements come from people with the problem, not from a template. You ship against real constraints.",
    },
    {
      title: "Industry Mentorship",
      body: "Working engineers and product people on the floor all day, reviewing your architecture while you can still change it.",
    },
    {
      title: "Sponsor Technologies",
      body: "Hands-on access to partner platforms, APIs and credits, with the teams who built them in the room.",
    },
    {
      title: "Networking",
      body: "Inter-college teams, mentors and partner engineers in one place — the introductions tend to outlast the prize.",
    },
    {
      title: "Recognition",
      body: "Finalists and winners featured across Mumbai Builds channels and shared with the partner network.",
    },
  ],
};

/* -------------------------------------------------------------- partners */

export const partners = {
  badge: "2027 Edition",
  heading: "Partners",
  blurb:
    "Mumbai Builds is onboarding knowledge, academic, venue and platform partners for the 2027 edition. If your team wants a brief in front of the region's student builders, the slots below are open.",
  groups: [
    { title: "Knowledge Partner", count: 1 },
    { title: "Academic Partners", count: 2 },
    { title: "Venue Partner", count: 1 },
    { title: "Platform Partners", count: 3 },
    { title: "Community Partners", count: 4 },
  ],
};

/* ------------------------------------------------------- mentors & jury */

export const mentors = {
  heading: "Meet Our Mentors",
  blurb: "Industry practitioners on the floor, guiding student builders through the sprint",
  role: "Mentor",
  people: [
    { name: "Urban Mobility", detail: "To be announced" },
    { name: "Payments & Fintech", detail: "To be announced" },
    { name: "Applied AI / ML", detail: "To be announced" },
    { name: "Accessibility", detail: "To be announced" },
    { name: "Backend & Infrastructure", detail: "To be announced" },
    { name: "Product Design", detail: "To be announced" },
    { name: "Data Engineering", detail: "To be announced" },
    { name: "Security", detail: "To be announced" },
  ],
};

export const jury = {
  heading: "Meet Our Jury",
  blurb: "Evaluating what teams actually shipped in twenty-four hours",
  role: "Jury",
  people: [
    { name: "Product & Design", detail: "To be announced" },
    { name: "AI / ML", detail: "To be announced" },
    { name: "Fintech", detail: "To be announced" },
    { name: "Social Impact", detail: "To be announced" },
  ],
};

/* -------------------------------------------------------------- sponsors */

export const sponsors = {
  badge: "Exclusive Opportunity",
  heading: "Call for Sponsors",
  blurbParts: [
    "Put your platform in front of the region's undergraduate builders and gain ",
    "direct student reach",
    ", ",
    "early talent access",
    ", and ",
    "campus-scale impact",
    ".",
  ],
  why: {
    title: "Why Sponsor?",
    body: "Mumbai Builds concentrates the most motivated undergraduate builders across Mumbai, Thane, Pune and Raigad into one weekend. Sponsoring puts your brand at the ",
    emphasis: "centre of how they learn to ship",
    tail: ".",
  },
  ctas: [
    { label: "Become a Sponsor", href: "mailto:gandhipiyush07@gmail.com?subject=Mumbai%20Builds%20Sponsorship", primary: true },
    { label: "Download Deck", href: "#sponsors", primary: false },
  ],
  cards: [
    { title: "Student Reach", body: "Engage undergraduate builders across Mumbai, Thane, Pune and Raigad." },
    { title: "Brand Visibility", body: "Prominent exposure across the event, our channels and partner campuses." },
    { title: "Talent Pipeline", body: "Watch candidates build under pressure before anyone interviews them." },
    { title: "Sponsor Track", body: "Put a live brief and your own APIs directly into the competition." },
  ],
};

/* --------------------------------------------------------------- journey */

export const journey = {
  heading: "Our Journey",
  blurb: "Concept visuals for the 2027 edition — the real gallery fills in after the finale",
  tiles: Array.from({ length: 12 }, (_, i) => ({
    src: `/art/gallery-${String(i + 1).padStart(2, "0")}.svg`,
    alt: `Mumbai Builds concept visual ${i + 1}`,
  })),
};

/* ------------------------------------------------------------ organizers */

export type Person = {
  name: string;
  role: string;
  affiliation?: string;
  bio?: string;
  email?: string;
  phone?: string;
  instagram?: string;
  linkedin?: string;
  x?: string;
  art: string;
};

export const organizers: { heading: string; groups: { title: string; people: Person[] }[] } = {
  heading: "ORGANIZERS",
  groups: [
    {
      title: "Mumbai Builds Core",
      people: [
        {
          name: "Piyush Gandhi",
          role: "Organizer",
          email: "gandhipiyush07@gmail.com",
          phone: "+91 9423194031",
          art: "/art/avatar-01.svg",
        },
        {
          name: "Ashish Bansode",
          role: "Organizer",
          email: "ashishrsb@gmail.com",
          phone: "+91 9969887121",
          art: "/art/avatar-02.svg",
        },
        {
          name: "Meeti Doshi",
          role: "Organizer",
          email: "meetidoshi09@gmail.com",
          phone: "+91 9136770139",
          art: "/art/avatar-03.svg",
        },
        {
          name: "Tanishq Deshpande",
          role: "Organizer",
          email: "tanishqdeshpande123@gmail.com",
          phone: "+91 8104626783",
          art: "/art/avatar-04.svg",
        },
        {
          name: "Anuj Desai",
          role: "Organizer",
          email: "Anuj.desai986@gmail.com",
          phone: "+91 9820568227",
          art: "/art/avatar-05.svg",
        },
      ],
    },
  ],
};

export const team = {
  heading: "Our Team",
  blurb: "The crew behind the 2027 edition",
  people: [
    { name: "Operations", role: "Run of day", detail: "To be announced", art: "/art/avatar-04.svg" },
    { name: "Technology", role: "Platform & judging", detail: "To be announced", art: "/art/avatar-05.svg" },
    { name: "Design", role: "Brand & collateral", detail: "To be announced", art: "/art/avatar-06.svg" },
    { name: "Campus Relations", role: "Colleges & outreach", detail: "To be announced", art: "/art/avatar-07.svg" },
    { name: "Partnerships", role: "Sponsors & mentors", detail: "To be announced", art: "/art/avatar-08.svg" },
    { name: "Content", role: "Comms & social", detail: "To be announced", art: "/art/avatar-09.svg" },
    { name: "Volunteers", role: "Finale floor", detail: "To be announced", art: "/art/avatar-10.svg" },
    { name: "Support", role: "Participant help desk", detail: "To be announced", art: "/art/avatar-11.svg" },
  ],
};

/* -------------------------------------------------------------------- faq */

export const faqs = [
  {
    question: "What is Mumbai Builds?",
    answer:
      "Mumbai Builds is a Mumbai-wide student innovation platform that connects promising builders with industry, technology, mentors, and real-world problems. It runs as a two-round hackathon: an online qualification round, then a 24-hour hybrid sprint that concludes at the Grand Finale in Mumbai.",
  },
  {
    question: "Who can participate?",
    answer:
      "Undergraduate students aged 18 or above who are enrolled in Mumbai, Thane, Pune or Raigad. Please carry a valid college ID and a government photo ID for verification at check-in.",
  },
  {
    question: "What is the team size and can I participate solo?",
    answer:
      "Teams must have 2 to 4 members. Solo entries are not accepted — Mumbai Builds is deliberately a team event. Inter-college teams are allowed and encouraged.",
  },
  {
    question: "Is there a registration fee?",
    answer: "No. Registration is completely free, but registration is mandatory for every participant.",
  },
  {
    question: "What is the event timeline?",
    answer:
      "Registration opens 10 October 2026 and Round 1 problem statements go live 11 October 2026. The initial registration deadline is 12 January 2027, extended registration and Round 1 submissions close 17 January 2027, the final problem statement releases 6 February 2027, and the Grand Finale is 7 February 2027.",
  },
  {
    question: "What is the competition format?",
    answer:
      "Round 1 is an online qualification round — you pick a problem statement and submit your approach and proof of concept remotely. Round 2 is a 24-hour hybrid sprint for shortlisted teams, concluding in person at the Grand Finale.",
  },
  {
    question: "What tracks can I build for?",
    answer:
      "There are three tracks: Urban Innovation & Fintech; Tech for Good / Accessibility / AI-ML; and the Sponsor Track, which is a live brief contributed by a partner engineering team. Sponsor Track teams remain fully eligible for all main prizes.",
  },
  {
    question: "What are the prizes and recognition?",
    answer:
      "The prize pool is ₹50,000 — ₹30,000 for first place, ₹15,000 for second and ₹5,000 for third. Winners and standout projects are also featured across Mumbai Builds channels and shared with the partner network.",
  },
  {
    question: "What are the key takeaways for participants?",
    answer:
      "Real-world problem solving, mentorship from working engineers, hands-on access to sponsor technologies, networking across colleges and partner teams, and recognition for what you shipped.",
  },
  {
    question: "What should I bring to the Grand Finale?",
    answer:
      "A laptop is compulsory — bring your own device fully charged, plus your charger and any hardware you need. Carry your college ID and government ID. The organisers are not responsible for lost belongings.",
  },
  {
    question: "How does team registration work?",
    answer:
      "One member registers on behalf of the whole team and fills in every teammate's details in the form. Do not register individually if you are part of a team; one entry covers all 2 to 4 members.",
  },
  {
    question: "Where is the Grand Finale and how are teams selected for it?",
    answer:
      "The Grand Finale runs 8:00 AM to 6:00 PM on Sunday, 7 February 2027 at a venue in Mumbai announced closer to the date. Finalists are shortlisted purely on their Round 1 online submissions.",
  },
  {
    question: "Can my team have members from different colleges?",
    answer:
      "Yes. Inter-college teams are allowed, as long as every member is an undergraduate student aged 18+ enrolled in Mumbai, Thane, Pune or Raigad.",
  },
  {
    question: "Is travel or accommodation covered?",
    answer:
      "Travel and accommodation are not reimbursed. Round 1 is fully online, so only finalists need to travel. Breakfast and lunch are provided on the day of the Grand Finale.",
  },
];

/* -------------------------------------------------------------- community */

export const community = {
  heading: "Join Our Community",
  blurb:
    "Connect with student builders, mentors and organisers from across Mumbai, Thane, Pune and Raigad. Get problem-statement drops, teammate hunts, workshop invites and event updates first.",
  ctas: [
    { label: "Join the Builders Group", href: "#community" },
    { label: "Follow Mumbai Builds", href: "#community" },
  ],
};

/* ----------------------------------------------------------------- footer */

export const footer = {
  columns: [
    {
      title: "Mumbai Builds",
      blurb: "A student innovation platform for the region's builders",
      links: [
        [
          { label: "Overview", href: "#overview" },
          { label: "Instagram", href: "#community" },
          { label: "LinkedIn", href: "#community" },
        ],
        [
          { label: "Twitter/X", href: "#community" },
          { label: "YouTube", href: "#community" },
          { label: "Builders Group", href: "#community" },
        ],
      ],
    },
    {
      title: "Reach the Organisers",
      blurb: "Questions, partnerships and press",
      links: [
        [
          { label: "Piyush Gandhi", href: "mailto:gandhipiyush07@gmail.com" },
          { label: "Ashish Bansode", href: "mailto:ashishrsb@gmail.com" },
          { label: "Meeti Doshi", href: "mailto:meetidoshi09@gmail.com" },
        ],
        [
          { label: "+91 9423194031", href: "tel:+919423194031" },
          { label: "+91 9969887121", href: "tel:+919969887121" },
          { label: "+91 9136770139", href: "tel:+919136770139" },
        ],
      ],
    },
  ],
  copyright: "© 2026 Mumbai Builds. All Rights Reserved.",
};
