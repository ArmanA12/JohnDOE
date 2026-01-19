import React from 'react';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  links: {
    website?: string;
    source?: string;
    paper?: string;
  };
  image?: string;
}

export interface Experience {
  company: string;
  role: string;
  logo: string;
  period: string;
}

export interface Hackathon {
  title: string;
  date: string;
  location: string;
  description: string;
  logo: string;
}

export type SkillCategory = 'frontend' | 'backend' | 'devops' | 'mobile' | 'language' | 'tools';

export interface Skill { 
  id: string; 
  name: string; 
  category: SkillCategory; 
  isKnown: boolean; 
  icon: React.ReactNode; 
}