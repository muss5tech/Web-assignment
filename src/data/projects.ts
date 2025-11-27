export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'video-conferencing',
    title: 'Video Conferencing Platform',
    description:
      'Developed a full-featured video conferencing platform using Next.js, Clerk, and Getstream, enabling secure authentication, real-time meetings, screen sharing, and recording.',
    techStack: [
      'Next.js',
      'Clerk',
      'GetStream',
      'TypeScript',
      'Tailwind CSS',
      'Shadcn UI',
    ],
    featured: true,
  },
  {
    id: 'class-management',
    title: 'University Class Management System',
    description:
      'Built a university-wide class management system to address existing inefficiencies at UIT, providing separate admin, teacher, and student portals for centralized control, grading, and student activities.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn UI'],
    featured: true,
  },
  {
    id: 'photo-social-network',
    title: 'Photo Social Network App',
    description:
      'Led the development of a photo social network app using Flutter and BloC for a dynamic UI with Firebase to handle backend services, including user authentication, image storage, and real-time engagement features. Successfully published on the Google Play Store.',
    techStack: ['Flutter', 'BloC', 'Firebase', 'Google Play'],
    featured: true,
  },
  {
    id: 'product-api',
    title: 'Product Management RESTful API',
    description:
      'Designed and built a RESTful API from the ground up using Node.js, Express.js, and MySQL to manage a collection of products with full CRUD operations.',
    techStack: [
      'Node.js',
      'Express.js',
      'Docker',
      'MySQL',
      'RESTful APIs',
      'JavaScript',
    ],
    featured: false,
  },
];
