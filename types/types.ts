// types.ts
export interface User {
  id: string;
  email: string;
  credits: number;
}

export interface Resume {
  resumeId: string;
  userId: string;
  credits: number;
  resumeData: ResumeData;
  htmlTemplate: string;
  lastUpdated: string;
}

export interface ResumeData {
  header: Header;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
}

export interface Header {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface Experience {
  title: string;
  company: string;
  years: string;
  achievements: string[];
}

export interface Education {
  degree: string;
  school: string;
  year: string;
}

export interface Project {
  name: string;
  description: string;
}

export interface Certification {
  name: string;
  year: string;
}

export type AuthMode = 'login' | 'signup';
export type ActiveTab = 'builder' | 'preview';
export type ActiveSection = 'header' | 'summary' | 'skills' | 'experience' | 'education' | 'projects' | 'certifications';
export type Template = 'modern' | 'classic' | 'minimal'|'creative' | 'professional';
export type NotificationType = 'success' | 'error' | 'info';