// src/types/skills.ts
export interface Skill {
    name: string;
    icon: string;
    color: string;
}

export interface SkillCategory {
    title: string;
    skills: Skill[];
}