
import { ReactNode } from 'react';

export enum ProjectCategory {
  ALL = 'All',
  UNITY = 'Unity Games',
  WEB_GAMES = 'Web Games',
  WEB_APPS = 'Web Apps',
}

export interface Project {
  id: number;
  title: string;
  description: string;
  category: ProjectCategory;
  imageUrl: string;
  demoUrl?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  skills: string[];
  contributions: string[];
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  icon: ReactNode;
}