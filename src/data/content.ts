/**
 * Single source of truth for all portfolio text.
 * Edit the data below — components read from `content` and never hard-code copy.
 */

export type NavLink = { label: string; href: string };

export type Project = {
  title: string;
  description: string;
  stack: string[];
  link: string;
  year?: string;
};

export type SkillGroup = { label: string; items: string[] };

export type ExperienceRole = {
  title: string;
  period: string;
  summary: string;
};

export type ExperienceItem = {
  company: string;
  location: string;
  roles: ExperienceRole[];
};

export type EducationEntry = {
  degree: string;
  school: string;
  period: string;
  note?: string;
};

export type Certification = {
  title: string;
  detail: string;
  date?: string;
};

export const content = {
  identity: {
    name: "Daffa Ahmad Rivaldi",
    positioning: "Full-Stack Developer",
    intro:
      "I build web interfaces and backend APIs, with experience in deployment, business intelligence, and end-to-end delivery.",
    location: "Lille, France",
    origin: "originally from Jakarta, Indonesia",
    email: "daffarivaldi06@gmail.com",
    github: "https://github.com/daffarivaldi06",
    linkedin: "https://www.linkedin.com/in/daffaahmad06/",
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ] as NavLink[],

  about: [
    "Technology professional with a background spanning software engineering, project management and business intelligence. Graduated cum laude in Informatics Engineering.",
    "Currently pursuing a Master's in IT for Smart and Sustainable Mobility at Université Polytechnique Hauts-de-France. Interested in building efficient technical solutions, managing end-to-end delivery, and using data to drive business goals.",
  ],

  experience: [
    {
      company: "PT Kognitif Skema Indonesia",
      location: "Jakarta",
      roles: [
        {
          title: "Project Manager",
          period: "Nov 2024 – Aug 2025",
          summary:
            "Oversaw daily progress, ran vendor and user meetings, and aligned deliverables with business goals. Managed deployment, versioning and maintenance across SIT, UAT and Production; ran post-implementation reviews.",
        },
        {
          title: "DevOps",
          period: "Sep 2023 – Aug 2025",
          summary:
            "Deployed images for SIT/UAT testing; maintained SIT/UAT servers and databases.",
        },
        {
          title: "Java Developer",
          period: "Sep 2023 – Jan 2024",
          summary:
            "Built Spring Boot functions connecting applications to a Hardware Security Module (HSM), with hashing for secure connections.",
        },
      ],
    },
    {
      company: "PT Visidata Anugerah Mitra",
      location: "Jakarta",
      roles: [
        {
          title: "Business Intelligence",
          period: "May 2022 – Sep 2023",
          summary:
            "Built interactive dashboards, developed calculation functions for data inputs, and embedded dashboards into websites.",
        },
      ],
    },
    {
      company: "PT Periksa Solusi Indonesia",
      location: "Jakarta",
      roles: [
        {
          title: "Fullstack Developer",
          period: "Mar 2021 – May 2022",
          summary:
            "Built 50+ REST APIs with Node.js, assisted frontend work with PHP and TypeScript, built hospital CRUD forms and documentation features, fixed bugs.",
        },
      ],
    },
  ] as ExperienceItem[],

  projects: [
    {
      title: "Transport-Mobility-Analytics",
      // TODO: verify details of this repo and refine the description (inferred from the repo name)
      description: "Analytics work for transport and mobility datasets.",
      stack: ["JavaScript"],
      link: "https://github.com/daffarivaldi06/Transport-Mobility-Analytics",
    },
    {
      title: "multimodal-routing-web",
      // TODO: verify details of this repo and refine the description (inferred from the repo name)
      description: "Web application for multimodal routing.",
      stack: ["TypeScript"],
      link: "https://github.com/daffarivaldi06/multimodal-routing-web",
    },
    {
      title: "Natural-Language-to-Multimodal-Routing-Agent",
      // TODO: verify details of this repo and refine the description (inferred from the repo name)
      description: "Agent that maps natural-language input onto multimodal routing.",
      stack: ["TypeScript"],
      link: "https://github.com/daffarivaldi06/Natural-Language-to-Multimodal-Routing-Agent",
    },
    {
      title: "Decision Support System for Credit Approval",
      description: "Decision support system for credit approval based on the CoCoSo method.",
      stack: ["CoCoSo method"],
      year: "2023",
      link: "https://bit.ly/dss-cocoso",
    },
    {
      title: "Paragon Scholarship Social Project",
      // TODO: add the project link if one exists
      description: "Website for a social project supporting elementary school teachers.",
      stack: ["Web"],
      year: "2020",
      link: "https://github.com/daffarivaldi06",
    },
  ] as Project[],

  skills: [
    {
      label: "Languages & frameworks",
      items: [
        "Java",
        "Spring Boot",
        "Node.js",
        "Angular",
        "PHP",
        "Laravel",
        "JavaScript",
        "TypeScript",
        "React",
        "SQL",
      ],
    },
    {
      label: "Data & analytics",
      items: ["Tableau"],
    },
    {
      label: "DevOps",
      items: [
        "Deployment",
        "Environment management (SIT/UAT/Prod)",
        "Server and database maintenance",
      ],
    },
  ] as SkillGroup[],

  education: [
    {
      degree: "Master IT for Smart and Sustainable Mobility (IT4SSM)",
      school: "Université Polytechnique Hauts-de-France",
      period: "Ongoing",
    },
    {
      degree: "B.Sc. Informatics Engineering",
      school: "State Polytechnic of Jakarta",
      period: "2019 – 2023",
      note: "GPA 3.51/4.00 · cum laude",
    },
    {
      degree: "Professional Degree in Software Engineering",
      school: "CEP-CCIT University of Indonesia",
      period: "2018 – 2020",
      note: "GPA 3.59/4.00 · dual certification with NIIT, India",
    },
  ] as EducationEntry[],

  certifications: [
    {
      title: "Tableau Certified Associate (Consultant)",
      detail: "Tableau",
      date: "May 2023",
    },
    {
      title: "Finalist — Business Design in IT Field",
      detail: "National Polytechnic Informatics Student Competition",
      date: "Nov 2022",
    },
    {
      title: "IELTS Overall 7.0",
      detail: "International English language proficiency",
      date: "Dec 2024",
    },
  ] as Certification[],
};

export type Content = typeof content;
