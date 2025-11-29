export interface PersonalInfo {
  name: string;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  location: string;
  bio: string;
  shortBio: string;
}

export interface TechStack {
  category: string;
  categoryLabel: string;
  items: TechItem[];
}

export interface TechItem {
  name: string;
  icon?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  isCurrent: boolean;
  description: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
}

export const personalInfo: PersonalInfo = {
  name: 'Mus',
  fullName: 'Mus Nguyen',
  title: 'Frontend Developer',
  email: 'muss5tech',
  phone: '+12 34567890',
  github: 'muss5tech',
  linkedin: 'muss5tech',
  location: 'Ho Chi Minh City, Vietnam',
  bio: `Frontend Developer with 2+ years of experience building responsive, high-performance web and mobile applications. I prioritize creating maintainable solutions, considering the long-term impact on the overall system and its stability.

In the age of AI-driven development, I leverage and manage tools like Cursor and Claude as AI agents under my guidance to boost delivery speed, enforce architecture, and maintain high code quality.`,
  shortBio:
    "Let's connect and collaborate! I'm passionate about creating exceptional user experiences.",
};

export const techStack: TechStack[] = [
  {
    category: 'frontend',
    categoryLabel: '< Frontend />',
    items: [
      { name: 'React.js' },
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'Vite' },
      { name: 'Redux' },
      { name: 'MobX' },
      { name: 'Tailwind CSS' },
      { name: 'Shadcn UI' },
      { name: 'Ant Design' },
      { name: 'MUI' },
      { name: 'Bootstrap' },
      { name: 'WordPress' },
    ],
  },
  {
    category: 'mobile',
    categoryLabel: '< Mobile />',
    items: [
      { name: 'Flutter' },
      { name: 'BloC' },
      { name: 'GetX' },
      { name: 'Firebase' },
      { name: 'Google Analytics' },
      { name: 'Google Play' },
      { name: 'App Store' },
    ],
  },
  {
    category: 'backend',
    categoryLabel: '< Backend />',
    items: [
      { name: 'Node.js' },
      { name: 'Express.js' },
      { name: 'Next.js' },
      { name: 'Supabase' },
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'MongoDB' },
      { name: 'RESTful APIs' },
      { name: 'JWT & OAuth' },
    ],
  },
  {
    category: 'devops',
    categoryLabel: '< DevOps />',
    items: [
      { name: 'Docker' },
      { name: 'GitHub Actions' },
      { name: 'AWS EC2' },
      { name: 'AWS S3' },
    ],
  },
  {
    category: 'others',
    categoryLabel: '< Others />',
    items: [
      { name: 'n8n' },
      { name: 'AI Integration' },
      { name: 'Sentry' },
      { name: 'Agile' },
      { name: 'Jira' },
      { name: 'Technical Documentation' },
    ],
  },
];

export const experiences: Experience[] = [
  {
    id: 'abc',
    company: 'ABC Technology',
    role: 'Frontend Developer',
    period: 'Current',
    isCurrent: true,
    description: [
      'Developed and optimized high-performance, SEO-friendly web platforms for merchants and users with Next.js and React.',
      'Drove product iteration by implementing and managing advanced analytics via Firebase SDK, configuring funnels in Google Analytics, and preparing data in BigQuery to support BI analysis and inform key feature development.',
      'Contributed to team growth by hosting technical workshops and training new developers on core technologies.',
      'Collaborated with cross-functional teams by providing weekly progress reports for over 20 company staff.',
      'Built a custom dynamic linking system with Next.js to replace Google Dynamic Links, providing a more flexible and maintainable solution to seamlessly redirect users to the mobile app.',
      'Built cross-platform ABC app for both Android and iOS with Flutter, integrated dynamic link system, AI-powered chatbot, and 9Pay payment gateway.',
      'Managed the full app lifecycle, from distributing internal test builds via Firebase App Distribution to publishing final releases on the Google Play and App Store.',
    ],
    technologies: [
      'Next.js',
      'React.js',
      'TypeScript',
      'MobX',
      'Tailwind CSS',
      'Shadcn UI',
      'Flutter',
      'BloC',
      'Firebase',
      'Google Analytics',
      'Google Play',
      'App Store',
      'AI Integration',
      'Payment Systems',
    ],
  },
  {
    id: 'dev',
    company: 'DEV JSC',
    role: 'Software Developer',
    period: '2023 - 2024',
    isCurrent: false,
    description: [
      'Developed an internal CMS using React and .NET Core, allowing real-time service customization for customers.',
      'Integrated Sentry with Slack for real-time error tracking, significantly reducing bug resolution time.',
      'Implemented CI/CD pipelines using GitHub Actions to automate the build and distribution of test builds to testers via Firebase App Distribution.',
      'Developed and maintained cross-platform DEV app for both Android and iOS with Flutter and GetX for state management, implementing the MVVM architecture.',
      'Applied a Micro-frontend architecture using Flutter and BloC to manage complex features of an internal IMT app, facilitating a scalable, modular development process.',
      'Developed this OTT functionality into a standalone SDK for external clients.',
      'Integrated a full-featured CMS, OTT features using ZegoCloud, EcoPay – FinViet payment gateway.',
    ],
    technologies: [
      'React.js',
      'Bootstrap',
      'TypeScript',
      'Flutter',
      'GetX',
      'BloC',
      'Micro Frontend',
      'Firebase',
      'Sentry',
      'GitHub Actions',
      'Payment Systems',
    ],
  },
  {
    id: 'freelance',
    company: 'Freelance',
    role: 'Full Stack Developer',
    period: '2022 - 2023',
    isCurrent: false,
    description: [
      'Worked on various client projects building full-stack web applications.',
      'Developed custom solutions using React, Node.js, and modern web technologies.',
    ],
    technologies: [
      'React.js',
      'Node.js',
      'TypeScript',
      'PostgreSQL',
      'MongoDB',
    ],
  },
  {
    id: 'education',
    company: 'University of Information Technology - HCM VNU',
    role: 'Bachelor of Computer Science',
    period: '2020 - 2024',
    isCurrent: false,
    description: [
      'Studied Computer Science with focus on Software Engineering.',
      'Participated in various programming competitions and hackathons.',
    ],
    technologies: [],
  },
];

export const projects: Project[] = [
  {
    id: 'video-conference',
    title: 'Video Conferencing Platform',
    description:
      'Developed a full-featured video conferencing platform using Next.js, Clerk, and Getstream, enabling secure authentication, real-time meetings, screen sharing, and recording.',
    technologies: [
      'Next.js',
      'Clerk',
      'GetStream',
      'TypeScript',
      'Tailwind CSS',
      'Shadcn UI',
    ],
  },
  {
    id: 'class-management',
    title: 'University Class Management System',
    description:
      'Built a university-wide class management system to address existing inefficiencies at UIT, providing separate admin, teacher, and student portals for centralized control, grading, and student activities.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn UI'],
  },
  {
    id: 'photo-social',
    title: 'Photo Social Network App',
    description:
      'Led the development of a photo social network app using Flutter and BloC for a dynamic UI with Firebase to handle backend services, including user authentication, image storage, and real-time engagement features. The application was successfully published on the Google Play Store.',
    technologies: ['Flutter', 'BloC', 'Firebase', 'Google Play'],
  },
  {
    id: 'product-api',
    title: 'RESTful Product API',
    description:
      'Designed and built a RESTful API from the ground up using Node.js, Express.js, and MySQL to manage a collection of products.',
    technologies: [
      'Node.js',
      'Express.js',
      'Docker',
      'MySQL',
      'RESTful APIs',
      'JavaScript',
    ],
  },
];

export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Tech Stack', href: '#tech-stack' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];
