import type { FocusArea } from "@/types";

export const profile = {
  name: "Md Forhad Hussain",
  firstName: "Forhad",
  title: "Full Stack Developer (MERN)",
  location: "Dhaka, Bangladesh",
  pitch:
    "I help teams ship fast, reliable, and clean web applications end-to-end.",
  availability: "Open to full-time, internship & freelance roles",
  stats: [
    { value: "2+", label: "Projects shipped" },
    { value: "15+", label: "Technologies used" },
    { value: "MERN", label: "Core stack" },
  ],
  seoDescription:
    "Md Forhad Hussain is a Full Stack Developer (MERN) from Dhaka, Bangladesh, building modern, responsive and secure web applications with TypeScript, React, Next.js, Node.js and MongoDB.",
  keywords: [
    "Md Forhad Hussain",
    "Full Stack Developer",
    "MERN Stack",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "Bangladesh",
    "Dhaka",
    "Portfolio",
  ],

  bio: [
    "I'm a Full-Stack Web Developer specializing in modern, responsive, and secure web applications. I focus on smooth user interfaces and robust backend architecture, with a strong emphasis on performance and clean architecture.",
    "My primary stack is TypeScript, the MERN ecosystem, and production frameworks like Next.js, which lets me take multi-tier projects from initial component design all the way to cloud deployment.",
    "Beyond core engineering, I'm keen on AI-driven innovation and on partner relations: bridging technical implementation with strategic collaboration. I'm actively looking to join a collaborative tech team where I can apply my analytical mindset, coding skills, and problem-solving abilities to high-impact development.",
  ],

  focusAreas: [
    {
      title: "Full-Stack Engineering & Component Architecture",
      description:
        "Reusable, well-structured components on the front end and robust, secure APIs on the back end.",
      icon: "code",
    },
    {
      title: "AI-Driven Applications & Next-Gen Tech",
      description:
        "Exploring cutting-edge ecosystems and AI-assisted workflows to build better products, faster.",
      icon: "sparkles",
    },
    {
      title: "Partner Relations & Cross-Functional Teamwork",
      description:
        "Connecting technical implementation with strategic collaboration across teams.",
      icon: "users",
    },
  ] satisfies FocusArea[],

  quickFacts: [
    { label: "Based in", value: "Dhaka, Bangladesh" },
    { label: "Main stack", value: "TypeScript · MERN · Next.js" },
    { label: "Looking for", value: "Junior / full-time roles, internships, freelance" },
    { label: "Training", value: "Programming Hero" },
  ],

  contact: {
    email: "sumon639424@gmail.com",
    // International format (Bangladesh +880) without "+" for wa.me links.
    whatsappNumber: "8801722205887",
    github: "https://github.com/forhadcodes",
    linkedin: "https://www.linkedin.com/in/md-forhad-hussain-489b3b435",
  },

  photo: "/images/profile.jpg",
  resumePath: "/resume.pdf",

  nav: [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ],
} as const;

export const whatsappUrl = `https://wa.me/${profile.contact.whatsappNumber}`;
export const mailtoUrl = `mailto:${profile.contact.email}`;
