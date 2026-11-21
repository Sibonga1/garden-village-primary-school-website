export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Staff", href: "#staff" },
];

export const moreLinksLeft: NavLink[] = [
  { label: "Sports", href: "#programs" },
  { label: "Code of Conduct", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const moreLinksRight: NavLink[] = [
  { label: "Careers", href: "#staff" },
  { label: "Fundraising", href: "#fundraising" },
  { label: "Events", href: "#events" },
];

export const heroStats = [
  { value: 420, suffix: "+", label: "Happy Learners" },
  { value: 28, suffix: "", label: "Dedicated Teachers" },
  { value: 17, suffix: "yrs", label: "Of Excellence" },
  { value: 96, suffix: "%", label: "Pass Rate" },
];

export const aboutParagraphs = [
  "Welcome to Garden Village Education Is Power, a place where young minds grow, dreams are nurtured, and every child is given the opportunity to shine.",
  "We are a primary school committed to creating a safe, supportive, and inspiring learning environment where children can develop academically, socially, and creatively.",
  "We believe that education is the foundation of a brighter future and that every learner deserves the opportunity to reach their full potential.",
  "Our goal is to build confident, responsible, and curious young individuals through quality education, dedicated teaching, and a strong sense of community.",
];

export const aboutClosing = [
  "At Garden Village Education Is Power, we don't just teach children — we help shape tomorrow's leaders.",
];

export const aboutMottos = [
  "Education is Power.",
  "Knowledge is Growth.",
  "The Future Starts Here.",
];

export type Program = {
  title: string;
  description: string;
  icon: string; // lucide icon name
  accent: string;
};

export const programs: Program[] = [
  {
    title: "Academics",
    description:
      "A rigorous, CAPS-aligned curriculum across literacy, numeracy, sciences and languages — taught by caring, qualified teachers.",
    icon: "BookOpen",
    accent: "var(--gv-leaf)",
  },
  {
    title: "Sports & Wellness",
    description:
      "Soccer, netball, athletics and swimming build teamwork, resilience and healthy habits for life.",
    icon: "Trophy",
    accent: "var(--gv-gold)",
  },
  {
    title: "Arts & Culture",
    description:
      "Music, drama, dance and visual arts give every learner a stage to express their unique voice.",
    icon: "Palette",
    accent: "var(--gv-red)",
  },
  {
    title: "Green Gardeners",
    description:
      "Our flagship eco-club where learners grow vegetables, tend orchards and lead sustainability projects.",
    icon: "Sprout",
    accent: "var(--gv-lime)",
  },
  {
    title: "Code & Robotics",
    description:
      "Future-ready skills in coding, robotics and design thinking — empowering young problem-solvers.",
    icon: "Cpu",
    accent: "#7cd1f0",
  },
  {
    title: "Aftercare & Mentorship",
    description:
      "Safe, structured aftercare with homework support, mentorship and wholesome enrichment.",
    icon: "HeartHandshake",
    accent: "#f0877c",
  },
];

export type StaffMember = {
  name: string;
  role: string;
  image: string;
  subjects: string[];
  quote: string;
};

export const staff: StaffMember[] = [
  {
    name: "Mrs. Summer Ndlovu",
    role: "Head of Foundation Phase",
    image: "/images/staff-1.png",
    subjects: ["Grade R–3", "Literacy"],
    quote: "Every child blooms in their own season.",
  },
  {
    name: "Mr. Thabo Maluleke",
    role: "Sports & Wellness Lead",
    image: "/images/staff-2.png",
    subjects: ["Physical Ed.", "Life Skills"],
    quote: "Discipline on the field, character for life.",
  },
  {
    name: "Ms. Lerato Khumalo",
    role: "Arts & Culture Coordinator",
    image: "/images/staff-3.png",
    subjects: ["Music", "Drama"],
    quote: "Creativity is the soul of learning.",
  },
  {
    name: "Mr. Sipho Dlamini",
    role: "School Principal",
    image: "/images/staff-4.png",
    subjects: ["Leadership", "Mentorship"],
    quote: "Education is the seed of a brighter tomorrow.",
  },
];

export type Testimonial = {
  name: string;
  relation: string;
  text: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: "Naledi Mokoena",
    relation: "Parent of Grade 4 learner",
    text: "Garden Village has been a second home for my daughter. Her confidence has blossomed and she actually looks forward to school every morning.",
    rating: 5,
  },
  {
    name: "Jabu Sithole",
    relation: "Parent of twins in Grade 1",
    text: "The teachers genuinely care. The Green Gardeners program taught my boys where food comes from — they now run our home vegetable patch!",
    rating: 5,
  },
  {
    name: "Refilwe Adams",
    relation: "Alumni, Class of 2014",
    text: "The values I learned here — curiosity, kindness, responsibility — still guide me today. I'm proud to be a Garden Village graduate.",
    rating: 5,
  },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What grades does Garden Village Primary School offer?",
    a: "We offer Grade R (Reception year) through Grade 7, following the South African CAPS curriculum with enrichment in arts, sport, sustainability and technology.",
  },
  {
    q: "How do I enrol my child?",
    a: "Enrolment opens in August each year. Complete the online enquiry form on this page, and our admissions team will contact you within 48 hours to schedule a campus visit and assessment.",
  },
  {
    q: "Do you offer aftercare and transport?",
    a: "Yes. Our aftercare runs until 17:30 with homework support, meals and enrichment activities. We also operate supervised bus routes across the greater Garden Village area.",
  },
  {
    q: "What is your approach to discipline and wellbeing?",
    a: "We follow a restorative, values-led approach grounded in respect, responsibility and community. Our full-time counsellor and wellbeing team support every learner.",
  },
  {
    q: "Can I support the school through donations or fundraising?",
    a: "Absolutely. Visit our Fundraising section or contact our office. Every contribution — from stationary to scholarships — plants a seed for a child's future.",
  },
];

export const footerLinks = {
  School: [
    { label: "About Us", href: "#about" },
    { label: "Our Staff", href: "#staff" },
    { label: "Programs", href: "#programs" },
    { label: "Events", href: "#events" },
  ],
  Admissions: [
    { label: "Enrolment", href: "#contact" },
    { label: "Fees & Bursaries", href: "#faq" },
    { label: "Open Days", href: "#events" },
    { label: "Code of Conduct", href: "#about" },
  ],
  Community: [
    { label: "Fundraising", href: "#fundraising" },
    { label: "Careers", href: "#staff" },
    { label: "Newsletter", href: "#newsletter" },
    { label: "Contact", href: "#contact" },
  ],
};

export const contactInfo = {
  address: "12 Acacia Lane, Garden Village, Western Cape, South Africa",
  phone: "+27 21 555 0142",
  email: "hello@gardenvillage.school",
  hours: "Mon–Fri, 07:30 – 16:30",
};

/* ====================================================================== */
/*  Page-specific content (used by the multi-page views)                   */
/* ====================================================================== */

export type Value = { title: string; description: string; icon: string };

export const values: Value[] = [
  {
    title: "Curiosity",
    description: "We ask, we wonder, we explore. Questions are the seeds of learning.",
    icon: "Sparkles",
  },
  {
    title: "Kindness",
    description: "We treat each other with respect and compassion, every single day.",
    icon: "Heart",
  },
  {
    title: "Responsibility",
    description: "We own our choices and care for our community and our planet.",
    icon: "Sprout",
  },
  {
    title: "Community",
    description: "We grow together — learners, families and teachers as one village.",
    icon: "Users",
  },
];

export type TimelineItem = { year: string; title: string; text: string };

export const timeline: TimelineItem[] = [
  { year: "2007", title: "Founded", text: "Garden Village opens its doors with 40 learners and 3 teachers." },
  { year: "2012", title: "New Wing", text: "We expand with a dedicated arts studio and library." },
  { year: "2017", title: "Green Gardeners", text: "Our flagship eco-club launches, now 120+ young gardeners strong." },
  { year: "2021", title: "Code & Robotics", text: "Future-ready skills lab opens with robotics kits and tablets." },
  { year: "2024", title: "Eco-Lab Campaign", text: "We begin fundraising for a solar-powered library & science garden." },
];

export type DonorTier = { name: string; amount: string; perk: string; accent: string };

export const donorTiers: DonorTier[] = [
  { name: "Seed", amount: "R100", perk: "A learner's stationery pack for a term", accent: "#c8e86a" },
  { name: "Sapling", amount: "R500", perk: "A month of aftercare for one learner", accent: "#2e9e3e" },
  { name: "Tree", amount: "R2,000", perk: "A robotics kit for the Code Lab", accent: "#f5c518" },
  { name: "Grove", amount: "R10,000", perk: "A named reading nook in the new library", accent: "#d42b1e" },
];

export type SchoolEvent = { date: string; month: string; title: string; time: string; place: string };

export const events: SchoolEvent[] = [
  { date: "14", month: "MAR", title: "Open Day & Campus Tour", time: "09:00 – 12:00", place: "Main Hall" },
  { date: "22", month: "APR", title: "Inter-house Athletics Day", time: "08:30 – 14:00", place: "Sports Field" },
  { date: "09", month: "MAY", title: "Heritage Assembly", time: "10:00 – 11:30", place: "Amphitheatre" },
  { date: "03", month: "JUN", title: "Green Gardeners Market", time: "09:00 – 13:00", place: "Eco-Garden" },
  { date: "28", month: "NOV", title: "Year-end Concert", time: "18:00 – 20:30", place: "Main Hall" },
];

export type Sport = { name: string; teams: string; season: string; icon: string };

export const sports: Sport[] = [
  { name: "Soccer", teams: "U9 · U11 · U13", season: "Terms 2 & 3", icon: "Volleyball" },
  { name: "Netball", teams: "U9 · U11 · U13", season: "Terms 2 & 3", icon: "Target" },
  { name: "Athletics", teams: "All ages", season: "Term 1", icon: "Zap" },
  { name: "Swimming", teams: "U8+", season: "Term 1 & 4", icon: "Waves" },
  { name: "Cricket", teams: "U11 · U13", season: "Term 1 & 4", icon: "Trophy" },
  { name: "Chess", teams: "All ages", season: "Year-round", icon: "Crown" },
];

export type ConductRule = { title: string; text: string };

export const conductRules: ConductRule[] = [
  { title: "Be Safe", text: "Move calmly, use equipment wisely, and look after yourself and others." },
  { title: "Be Kind", text: "Use respectful words, include everyone, and help a friend in need." },
  { title: "Be Ready to Learn", text: "Arrive on time, bring your tools, and give your best effort." },
  { title: "Be Responsible", text: "Own your choices, care for our school, and tell the truth." },
  { title: "Be Curious", text: "Ask questions, explore bravely, and celebrate mistakes as learning." },
  { title: "Be Green", text: "Protect nature, reduce waste, and tend our gardens with care." },
];

export type JobOpening = { title: string; type: string; location: string; grade: string };

export const jobOpenings: JobOpening[] = [
  { title: "Foundation Phase Teacher", type: "Full-time · Permanent", location: "On-site, Garden Village", grade: "Grade 1" },
  { title: "Mathematics & Science Teacher", type: "Full-time · Permanent", location: "On-site, Garden Village", grade: "Grade 6–7" },
  { title: "Sports & Wellness Coach", type: "Part-time · Contract", location: "On-site, Garden Village", grade: "All phases" },
  { title: "Aftercare Coordinator", type: "Full-time · Permanent", location: "On-site, Garden Village", grade: "Grade R–7" },
  { title: "Library & Literacy Assistant", type: "Part-time · Term-based", location: "On-site, Garden Village", grade: "All phases" },
];
