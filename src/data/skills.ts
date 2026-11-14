import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    name: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript"],
  },
  {
    name: "Frontend",
    items: [
      "React.js",
      "Next.js (App Router)",
      "Tailwind CSS",
      "DaisyUI",
      "Responsive layouts",
    ],
  },
  {
    name: "Backend",
    items: ["Node.js", "Express.js", "Next.js API Routes"],
  },
  {
    name: "Database & Auth",
    items: [
      "MongoDB Atlas",
      "Better Auth",
      "Google & GitHub OAuth",
      "JWT (HTTPOnly cookies)",
    ],
  },
  {
    name: "Tools & Workflow",
    items: ["Git", "GitHub", "Vercel", "Netlify", "Claude Code", "Developer utilities"],
  },
];
