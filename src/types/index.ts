export interface Screenshot {
  src: string;
  alt: string;
}

export interface TitledText {
  title: string;
  body: string;
}

/** A real problem hit during the build and how it was solved. */
export interface Challenge {
  title: string;
  /** What went wrong / why it was hard. */
  difficulty: string;
  /** The fix, in the author's own approach. */
  solution: string;
}

export interface CaseStudy {
  problem: string;
  solution: string;
  role: string;
  techDecisions: TitledText[];
  challenges: Challenge[];
  outcome: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  /** Optional native-language title shown next to the English one. */
  localizedTitle?: string;
  featured?: boolean;
  /** One line, used on cards and in SEO. */
  tagline: string;
  /** Longer overview, used on the case-study page. */
  description: string;
  features: string[];
  highlights: string[];
  techStack: string[];
  /** Leave undefined until the link is real; the button is hidden when missing. */
  liveUrl?: string;
  githubLinks: ProjectLink[];
  screenshots: Screenshot[];
  caseStudy: CaseStudy;
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface FocusArea {
  title: string;
  description: string;
  icon: "code" | "sparkles" | "users";
}

export interface TimelineItem {
  period: string;
  title: string;
  org: string;
  description: string;
  kind: "education" | "experience";
}
