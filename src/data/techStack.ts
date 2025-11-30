export interface TechItem {
  name: string;
  icon?: string;
}

export interface TechCategory {
  title: string;
  tag: string;
  color: string;
  items: TechItem[];
}

export const techStack: TechCategory[] = [
  {
    title: 'Frontend',
    tag: '< Frontend />',
    color: 'tech-frontend',
    items: [
      { name: 'React.js' },
      { name: 'Vite' },
      { name: 'Next.js' },
      { name: 'Vercel' },
      { name: 'Clerk' },
      { name: 'Redux' },
      { name: 'MobX' },
      { name: 'Tailwind CSS' },
      { name: 'Shadcn UI' },
      { name: 'Ant Design' },
      { name: 'MUI' },
      { name: 'Bootstrap' },
      { name: 'TypeScript' },
      { name: 'WordPress' },
    ],
  },
  {
    title: 'Mobile',
    tag: '< Mobile />',
    color: 'tech-mobile',
    items: [
      { name: 'Flutter' },
      { name: 'Google Play' },
      { name: 'App Store' },
      { name: 'BloC' },
      { name: 'GetX' },
      { name: 'Firebase' },
      { name: 'Google Analytics' },
    ],
  },
  {
    title: 'Backend',
    tag: '< Backend />',
    color: 'tech-backend',
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
    title: 'DevOps',
    tag: '< DevOps />',
    color: 'tech-devops',
    items: [
      { name: 'Docker' },
      { name: 'GitHub Actions' },
      { name: 'AWS EC2' },
      { name: 'AWS S3' },
    ],
  },
  {
    title: 'Others',
    tag: '< Others />',
    color: 'tech-others',
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
