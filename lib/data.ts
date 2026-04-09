export interface Speaker {
  name: string;
  company: string;
  talk: string;
  bio: string;
  status: "confirmed" | "pending";
  initials: string;
  photo: string;
}

export interface ProgramBlock {
  time: string;
  title: string;
  description: string;
  type: "talk" | "break" | "panel" | "block-header";
  speaker?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  company: string;
  year: number;
}

export const speakers: Speaker[] = [
  {
    name: "Zdeněk Huspenina",
    company: "Blogic",
    talk: "AI Business Solutions — od AI agentů po prediktivní analytiku",
    bio: "Head of AI Business Solutions ve společnosti Blogic. Specializuje se na transformaci komplexních firemních výzev do škálovatelných řešení poháněných umělou inteligencí.",
    status: "confirmed",
    initials: "ZH",
    photo: "/recnici/zdenek_huspenina.png",
  },
  {
    name: "Radek Štěrba",
    company: "Microsoft",
    talk: "Copilot+ PC — nová třída zařízení s lokální AI",
    bio: "Technical Specialist pro Microsoft. 16 let zkušeností z Intelu v oblasti retailu a technologické edukace. Zaměřen na Windows 11, bezpečnost a moderní AI včetně Copilot+ PC.",
    status: "confirmed",
    initials: "RS",
    photo: "/recnici/radek_sterba.png",
  },
  {
    name: "David Fogl",
    company: "Continero / MingleMinds.ai",
    talk: "AI v praxi — od chatbotů po video analýzu",
    bio: "Founder Continero a MingleMinds.ai. 10+ let v software testování a vývoji. Buduje a vede týmy, které navrhují, implementují a provozují AI řešení end to end.",
    status: "confirmed",
    initials: "DF",
    photo: "/recnici/david_fogl.png",
  },
  {
    name: "Martin Pernica",
    company: "Elixeum / Flying Rat Studio",
    talk: "AI není zaměstnanec — jak s ní pracovat v praxi",
    bio: "CEO Flying Rat Studio a CTO Elixeum. Kombinuje hluboký technický background s praktickou zkušeností s nasazováním AI do reálních produktů. Místo hype přináší realistický pohled.",
    status: "confirmed",
    initials: "MP",
    photo: "/recnici/martin_pernica.png",
  },
  {
    name: "Dalibor Mráz",
    company: "ČERNÁ.AI / Webvalley",
    talk: "AI-driven region — jak transformovat kraj pomocí AI",
    bio: "Lídr platformy ČERNÁ.AI. Ambicí je transformovat Moravskoslezský kraj v AI-driven region prostřednictvím mezinárodních misí a strategických partnerství. AI director firmy Webvalley.",
    status: "confirmed",
    initials: "DM",
    photo: "/recnici/dalibor_mraz.png",
  },
  {
    name: "Marek Olbert",
    company: "Continental Barum",
    talk: "Strojové vidění",
    bio: "Manufacturing Systems Manager ve společnosti Continental Barum s.r.o. Jak AI vidí do procesů fabriky a co z těch dat dokáže vytáhnout.",
    status: "confirmed",
    initials: "MO",
    photo: "/recnici/martin_olbert.png",
  },
];

export const program: ProgramBlock[] = [
  {
    time: "8:30 — 9:00",
    title: "Registrace účastníků",
    description: "Akreditace a welcome drink",
    type: "break",
  },
  {
    time: "9:00 — 9:10",
    title: "Zahájení moderátorem",
    description: "Uvítání účastníků a představení programu",
    type: "talk",
    speaker: "David Fogl, Renata Brázdilová",
  },
  {
    time: "",
    title: "Blok 1: Digitální kancelář — strategie a realizace",
    description: "",
    type: "block-header",
  },
  {
    time: "9:10 — 9:40",
    title: "Architektura adopce",
    description: "Jak nastavit prostředí a systém, aby AI ve firmě dávala smysl a lidi ji brali.",
    type: "talk",
    speaker: "Dalibor Mráz",
  },
  {
    time: "9:40 — 10:10",
    title: "AI Agenti v administrativě",
    description: "Konkrétní ukázky v Outlooku a jinde — co ten \"digitální zaměstnanec\" reálně odpracuje.",
    type: "talk",
    speaker: "David Fogl",
  },
  {
    time: "10:10 — 10:40",
    title: "Coffee break",
    description: "Networking a občerstvení v demo zóně",
    type: "break",
  },
  {
    time: "",
    title: "Blok 2: Nástroje vs. Realita nasazení",
    description: "",
    type: "block-header",
  },
  {
    time: "10:40 — 11:10",
    title: "Microsoft Copilot — Váš standardní nástroj",
    description: "Co všechno AI v Office zvládne a jak vypadá moderní práce s dokumenty.",
    type: "talk",
    speaker: "Radek Štěrba, Microsoft",
  },
  {
    time: "11:10 — 11:40",
    title: "Realistický pohled na AI projekty",
    description: "Data, oprávnění, integrace a odpovědnost.",
    type: "talk",
    speaker: "Elixeum",
  },
  {
    time: "11:40 — 12:50",
    title: "Oběd",
    description: "Bufetový oběd, networking s řečníky a účastníky",
    type: "break",
  },
  {
    time: "",
    title: "Blok 3: Průmyslová data a integrace",
    description: "",
    type: "block-header",
  },
  {
    time: "12:50 — 13:20",
    title: "Case Study — TBD",
    description: "Reálný příklad integrace AI do vnitřních systémů.",
    type: "talk",
    speaker: "TBD",
  },
  {
    time: "13:20 — 13:50",
    title: "Strojové vidění",
    description: "Jak AI vidí do procesů fabriky a co z těch dat dokáže vytáhnout.",
    type: "talk",
    speaker: "Continental Barum",
  },
  {
    time: "13:50 — 14:15",
    title: "Coffee break",
    description: "Networking a občerstvení v demo zóně",
    type: "break",
  },
  {
    time: "",
    title: "Blok 4: Budoucnost",
    description: "",
    type: "block-header",
  },
  {
    time: "14:15 — 14:45",
    title: "Humanoidní robot",
    description: "Vizuální show a ukázka toho, že AI už není jen text v počítači.",
    type: "talk",
    speaker: "Blogic",
  },
  {
    time: "14:45+",
    title: "Networking",
    description: "Volný networking s řečníky a účastníky",
    type: "break",
  },
];

export const topics = [
  {
    icon: "brain",
    title: "Strategie a adopce AI",
    description:
      "Jak nastavit prostředí, aby AI ve firmě dávala smysl. Architektura adopce, AI agenti v administrativě a realistický pohled na AI projekty.",
  },
  {
    icon: "code",
    title: "Nástroje pro každý den",
    description:
      "Microsoft Copilot, AI agenti v Outlooku a dalších nástrojích. Praktické ukázky toho, co digitální zaměstnanec reálně odpracuje.",
  },
  {
    icon: "robot",
    title: "Průmysl a budoucnost",
    description:
      "Strojové vidění ve výrobě, humanoidní robot naživo. Jak AI vidí do procesů fabriky a co z dat dokáže vytáhnout.",
  },
] as const;

export const testimonials: Testimonial[] = [
  {
    quote: "Konečně konference, kde se nemluví o AI teoreticky, ale ukazují se reálné výsledky. Odcházela jsem s konkrétním plánem, co ve firmě změnit.",
    name: "Jana Nováková",
    company: "CFO, Plastika a.s.",
    year: 2025,
  },
  {
    quote: "Ta live ukázka robota byla něco neuvěřitelného. Hned jsme začali řešit automatizaci naší výrobní linky.",
    name: "Petr Dvořák",
    company: "Jednatel, DVR Manufacturing",
    year: 2025,
  },
  {
    quote: "Networking s lidmi, kteří AI reálně používají, měl pro nás větší hodnotu než rok hledání na internetu.",
    name: "Martin Kopecký",
    company: "CTO, DataPoint Solutions",
    year: 2025,
  },
  {
    quote: "Díky této konferenci jsme nasadili AI do zákaznického servisu a ušetříme 40 hodin měsíčně.",
    name: "Eva Bartošová",
    company: "HR Director, ZlinTech Group",
    year: 2025,
  },
];

export const galleryPhotos = [
  { src: "/photos/JS1_6647.jpg", alt: "AI konference KHKZK 2025 — úvodní přednáška" },
  { src: "/photos/JS1_6651.jpg", alt: "Účastníci konference AI v praxi 2025" },
  { src: "/photos/JS1_6656.jpg", alt: "Přednáška o umělé inteligenci v podnikání" },
  { src: "/photos/JS1_6665.jpg", alt: "Networking během konference AI v praxi" },
  { src: "/photos/JS1_6670.jpg", alt: "Řečník na konferenci AI v praxi Zlín" },
  { src: "/photos/JS1_6671.jpg", alt: "Publikum konference o AI a robotice" },
  { src: "/photos/JS1_6679.jpg", alt: "Prezentace case study nasazení AI" },
  { src: "/photos/JS1_6684.jpg", alt: "Demo zóna s AI nástroji" },
  { src: "/photos/JS1_6693.jpg", alt: "Konferenční sál Interhotel Zlín 2025" },
  { src: "/photos/JS1_6702.jpg", alt: "Panelová diskuse o budoucnosti AI" },
  { src: "/photos/JS1_6707.jpg", alt: "Účastníci při networkingu" },
  { src: "/photos/JS1_6714.jpg", alt: "Live demo robotiky na konferenci" },
  { src: "/photos/JS1_6726.jpg", alt: "Přednáška o digitální transformaci" },
  { src: "/photos/JS1_6733.jpg", alt: "Konference AI v praxi — přestávka" },
  { src: "/photos/JS1_6737.jpg", alt: "Firemní zástupci na AI konferenci" },
  { src: "/photos/JS1_6738.jpg", alt: "Prezentace Microsoft Copilot" },
  { src: "/photos/JS1_6742.jpg", alt: "Zlínská AI konference — hlavní sál" },
  { src: "/photos/JS1_6745.jpg", alt: "Řečníci na pódiu konference KHKZK" },
  { src: "/photos/JS1_6755.jpg", alt: "Interakce s humanoidním robotem" },
  { src: "/photos/JS1_6756.jpg", alt: "Účastníci diskutují o AI řešeních" },
  { src: "/photos/JS1_6760.jpg", alt: "Konferenční materiály a program" },
  { src: "/photos/JS1_6773.jpg", alt: "Zahájení konference AI v praxi 2025" },
  { src: "/photos/JS1_6774.jpg", alt: "Moderátor konference na pódiu" },
  { src: "/photos/JS1_6779.jpg", alt: "Přednáška o AI agentech v praxi" },
  { src: "/photos/JS1_6783.jpg", alt: "Pohled na plný konferenční sál" },
  { src: "/photos/JS1_6789.jpg", alt: "Networking a výměna kontaktů" },
  { src: "/photos/JS1_6791.jpg", alt: "Demo zóna — kolaborativní roboti" },
  { src: "/photos/JS1_6798.jpg", alt: "Přestávka s kávou na AI konferenci" },
  { src: "/photos/JS1_6803.jpg", alt: "Prezentace AI case study z výroby" },
  { src: "/photos/JS1_6805.jpg", alt: "Panel řečníků konference Zlín" },
  { src: "/photos/JS1_6806.jpg", alt: "Účastníci v demo zóně" },
  { src: "/photos/JS1_6810.jpg", alt: "Otázky z publika na AI konferenci" },
  { src: "/photos/JS1_6814.jpg", alt: "Přednáška o strojovém vidění" },
  { src: "/photos/JS1_6816.jpg", alt: "Konference AI v praxi — závěr" },
  { src: "/photos/JS1_6818.jpg", alt: "Společná fotografie řečníků" },
  { src: "/photos/JS1_6820.jpg", alt: "Vystavovatelé na konferenci KHKZK" },
  { src: "/photos/JS1_6824.jpg", alt: "Prezentace o automatizaci procesů" },
  { src: "/photos/JS1_6826.jpg", alt: "Účastníci konference při obědu" },
  { src: "/photos/JS1_6828.jpg", alt: "Diskuse o AI strategii pro firmy" },
  { src: "/photos/JS1_6833.jpg", alt: "Konferenční prostor Interhotel Zlín" },
  { src: "/photos/JS1_6837.jpg", alt: "Registrace účastníků AI konference" },
  { src: "/photos/JS1_6842.jpg", alt: "Přednáška o robotice v průmyslu" },
  { src: "/photos/JS1_6845.jpg", alt: "Závěrečný networking konference" },
  { src: "/photos/JS1_6847.jpg", alt: "Účastníci s řečníky po přednášce" },
  { src: "/photos/JS1_6848.jpg", alt: "AI v praxi 2025 — hlavní stage" },
  { src: "/photos/JS1_6853.jpg", alt: "Prezentace o AI v zákaznickém servisu" },
  { src: "/photos/JS1_6856.jpg", alt: "Partneři konference AI v praxi" },
  { src: "/photos/JS1_6863.jpg", alt: "Technologická demo ukázka" },
  { src: "/photos/JS1_6871.jpg", alt: "Pohled na konferenci ze zákulisí" },
  { src: "/photos/JS1_6874.jpg", alt: "Řečník prezentuje AI řešení" },
  { src: "/photos/JS1_6877.jpg", alt: "Konference KHKZK — plné řady" },
  { src: "/photos/JS1_6884.jpg", alt: "Diskuse u stánku vystavovatele" },
  { src: "/photos/JS1_6886.jpg", alt: "AI konference Zlínský kraj 2025" },
  { src: "/photos/JS1_6889.jpg", alt: "Přednáška o prediktivní analytice" },
  { src: "/photos/JS1_6896.jpg", alt: "Účastníci opouštějí konferenci" },
  { src: "/photos/JS1_6898.jpg", alt: "Závěrečná fotografie AI v praxi 2025" },
  { src: "/photos/JS1_6899.jpg", alt: "Konference AI v praxi — atmosféra" },
];

export const conferenceInfo = {
  name: "AI v praxi 2026",
  subtitle: "Od experimentů k reálným výsledkům",
  date: "20. května 2026",
  dayOfWeek: "středa",
  eventDate: new Date("2026-05-20T09:00:00"),
  venue: "Interhotel Zlín",
  address: "náměstí Práce 2512, 760 01 Zlín",
  capacity: "150 — 200 účastníků",
  organizer: "Krajská hospodářská komora Zlínského kraje",
  pricing: {
    earlyBird: {
      label: "Early Bird",
      period: "9. 4. — 23. 4. 2026",
      member: { label: "Člen KHKZK", price: "2 390 Kč" },
      nonMember: { label: "Nečlen", price: "3 390 Kč" },
    },
    standard: {
      label: "Standardní",
      period: "od 24. 4. 2026",
      member: { label: "Člen KHKZK", price: "2 890 Kč" },
      nonMember: { label: "Nečlen", price: "3 890 Kč" },
    },
  },
  venueFeatures: [
    "Hlavní konferenční sál pro 200 osob",
    "Demo zóna s roboty a AI nástroji",
    "Networking lounge s kávou po celý den",
    "Oběd v ceně vstupenky",
    "Parkování zdarma u hotelu",
    "5 minut pěšky od centra Zlína",
  ],
};
