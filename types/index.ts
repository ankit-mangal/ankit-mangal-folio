export interface BentoCardData {
  id: string;
  type:
    | "profile"
    | "about"
    | "education"
    | "experience"
    | "skills"
    | "projects"
    | "contact"
    | "contact-form"
    | "machine-coding";
  colSpan: 1 | 2 | 3;
  title?: string;
  content?: any;
  className?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  url: string;
}

export interface Experience {
  company: string;
  position: string;
  duration: string;
  location: string;
  companyUrl?: string;
  projects?: Array<{
    name: string;
    description: string;
  }>;
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  location: string;
  mapEmbedUrl: string;
}