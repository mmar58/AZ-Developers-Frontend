
import React from 'react';
import { Project, ProjectCategory, TeamMember, ProcessStep } from './types';

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Games', href: '/games' },
  { name: 'Process', href: '/#process' },
  { name: 'Team', href: '/team' }
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Galaxy Raiders',
    description: 'An epic space shooter built with Unity, featuring stunning 3D graphics and intense dogfights.',
    category: ProjectCategory.UNITY,
    imageUrl: 'https://picsum.photos/seed/galaxy/600/400',
    demoUrl: '#',
  },
  {
    id: 2,
    title: 'Pixel Jump',
    description: 'A retro-style platformer for the web. Easy to learn, hard to master. Built with Phaser.js.',
    category: ProjectCategory.WEB_GAMES,
    imageUrl: 'https://picsum.photos/seed/pixel/600/400',
    demoUrl: '#',
  },
  {
    id: 3,
    title: 'ProjectFlow',
    description: 'A sleek and intuitive project management web app built with React and Node.js for agile teams.',
    category: ProjectCategory.WEB_APPS,
    imageUrl: 'https://picsum.photos/seed/flow/600/400',
    demoUrl: '#',
  },
  {
    id: 4,
    title: 'Mystic Forest RPG',
    description: 'A story-driven role-playing game with a rich world and complex characters, developed in Unity.',
    category: ProjectCategory.UNITY,
    imageUrl: 'https://picsum.photos/seed/mystic/600/400',
    demoUrl: '#',
  },
  {
    id: 5,
    title: 'Code Racer',
    description: 'A competitive typing game for developers. Race against others by accurately typing code snippets.',
    category: ProjectCategory.WEB_GAMES,
    imageUrl: 'https://picsum.photos/seed/racer/600/400',
    demoUrl: '#',
  },
  {
    id: 6,
    title: 'DataViz Pro',
    description: 'A powerful data visualization dashboard that transforms complex datasets into insightful charts.',
    category: ProjectCategory.WEB_APPS,
    imageUrl: 'https://picsum.photos/seed/dataviz/600/400',
    demoUrl: '#',
  },
  {
    id: 7,
    title: 'VR Escape Room',
    description: 'An immersive virtual reality puzzle game. Work together with friends to solve challenges and escape.',
    category: ProjectCategory.UNITY,
    imageUrl: 'https://picsum.photos/seed/vr/600/400',
    demoUrl: '#',
  },
  {
    id: 8,
    title: 'Quick-Draw Online',
    description: 'A fast-paced multiplayer drawing and guessing game, perfect for parties and hangouts.',
    category: ProjectCategory.WEB_GAMES,
    imageUrl: 'https://picsum.photos/seed/draw/600/400',
    demoUrl: '#',
  },
  {
    id: 10,
    title: 'Tic Tac Toe',
    description: 'Play classic Tic Tac Toe against a friend on your browser!',
    category: ProjectCategory.WEB_GAMES,
    imageUrl: 'https://picsum.photos/seed/tictactoe/600/400',
    demoUrl: '/games/tic-tac-toe'
  },
  {
    id: 9,
    title: 'E-Shopify',
    description: 'A fully-featured e-commerce platform with a custom CMS and integrated payment gateways.',
    category: ProjectCategory.WEB_APPS,
    imageUrl: 'https://picsum.photos/seed/eshop/600/400',
    demoUrl: '#',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    username: 'alex-johnson',
    role: 'Lead Unity Developer',
    imageUrl: 'https://picsum.photos/seed/alex/400/400',
    bio: "A seasoned game developer with over a decade of experience in the Unity engine. Alex specializes in gameplay mechanics, performance optimization, and leading development teams from concept to launch. He's passionate about creating immersive and unforgettable gaming experiences.",
    skills: ["Unity", "C#", "3D Modeling", "VR/AR Development", "Performance Optimization", "Shader Programming"],
    contributions: [
      "Led the development of 'Galaxy Raiders' and 'VR Escape Room'.",
      "Architected the core gameplay systems for 5+ major titles.",
      "Mentored junior developers and improved team-wide coding standards."
    ],
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: 2,
    name: 'Brenda Smith',
    username: 'brenda-smith',
    role: 'Senior Frontend Engineer',
    imageUrl: 'https://picsum.photos/seed/brenda/400/400',
    bio: "Brenda is a creative frontend developer who excels at building beautiful, responsive, and highly interactive user interfaces. With a keen eye for design and a mastery of modern web technologies, she turns complex requirements into elegant solutions.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Web Performance", "UI/UX Design"],
    contributions: [
        "Developed the entire frontend for 'ProjectFlow' and 'DataViz Pro'.",
        "Implemented the responsive design system used across all our web projects.",
        "Reduced page load times by 40% through strategic code splitting and optimization."
    ],
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: 3,
    name: 'Carlos Rivera',
    username: 'carlos-rivera',
    role: 'Backend & DevOps',
    imageUrl: 'https://picsum.photos/seed/carlos/400/400',
    bio: "Carlos is the backbone of our operations, ensuring our applications are scalable, secure, and always online. He has deep expertise in cloud infrastructure, database management, and building robust APIs that power our games and web apps.",
    skills: ["Node.js", "Python", "Docker", "Kubernetes", "AWS", "PostgreSQL", "CI/CD"],
    contributions: [
      "Designed and deployed the scalable cloud infrastructure for all our online services.",
      "Built the secure authentication and payment gateway for 'E-Shopify'.",
      "Automated the entire build, test, and deployment pipeline, reducing deployment time by 90%."
    ],
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    id: 4,
    name: 'Diana Chen',
    username: 'diana-chen',
    role: 'UI/UX Designer',
    imageUrl: 'https://picsum.photos/seed/diana/400/400',
    bio: "Diana believes that great design is about solving problems. She combines user research, wireframing, and visual design to create intuitive and delightful experiences for our players and users. Her work is central to making our products not just functional, but enjoyable.",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Interaction Design", "Design Systems"],
    contributions: [
      "Created the complete UI/UX design for 'Pixel Jump' and 'ProjectFlow'.",
      "Conducted user testing sessions that led to a 50% increase in user engagement on key projects.",
      "Established the company's design system and component library."
    ],
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'Discover',
    description: 'We start by understanding your vision, goals, and target audience to lay a solid foundation.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Design',
    description: 'Our team creates intuitive UI/UX designs and prototypes that are both beautiful and user-friendly.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Develop',
    description: 'Using cutting-edge tech, our engineers write clean, efficient, and scalable code to bring the design to life.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Deploy & Iterate',
    description: 'We handle the launch, monitor performance, and provide ongoing support for continuous improvement.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];