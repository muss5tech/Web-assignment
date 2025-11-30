export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  isCurrent?: boolean;
  description: string[];
  techStack: string[];
}

export const experiences: ExperienceItem[] = [
  {
    id: 'abc-technology',
    company: 'ABC Technology',
    role: 'Frontend Developer',
    period: '2023 - Present',
    isCurrent: true,
    description: [
      'Developed and optimized high-performance, SEO-friendly web platforms for merchants and users with Next.js and React.',
      'Drove product iteration by implementing and managing advanced analytics via Firebase SDK, configuring funnels in Google Analytics, and preparing data in BigQuery to support BI analysis.',
      'Contributed to team growth by hosting technical workshops and training new developers on core technologies.',
      'Collaborated with cross-functional teams by providing weekly progress reports for over 20 company staff.',
      'Built a custom dynamic linking system with Next.js to replace Google Dynamic Links, providing a more flexible and maintainable solution.',
      'Built cross-platform ABC app for both Android and iOS with Flutter, integrated dynamic link system, AI-powered chatbot, and 9Pay payment gateway.',
      'Managed the full app lifecycle, from distributing internal test builds via Firebase App Distribution to publishing final releases on Google Play and App Store.',
    ],
    techStack: [
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
    id: 'dev-jsc',
    company: 'DEV JSC',
    role: 'Mobile Developer',
    period: '2022 - 2023',
    description: [
      'Developed an internal CMS using React and .NET Core, allowing real-time service customization for customers.',
      'Integrated Sentry with Slack for real-time error tracking, significantly reducing bug resolution time.',
      'Implemented CI/CD pipelines using GitHub Actions to automate the build and distribution of test builds via Firebase App Distribution.',
      'Developed and maintained cross-platform DEV app for both Android and iOS with Flutter and GetX for state management, implementing the MVVM architecture.',
      'Applied a Micro-frontend architecture using Flutter and BloC to manage complex features of an internal IMT app.',
      'Developed OTT functionality into a standalone SDK for external clients.',
      'Integrated a full-featured CMS, OTT features using ZegoCloud, EcoPay – FinViet payment gateway.',
    ],
    techStack: [
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
    period: '2021 - 2022',
    description: [
      'Worked on various freelance projects building web applications and mobile apps.',
      'Collaborated directly with clients to understand requirements and deliver solutions.',
      'Gained experience across the full development stack from frontend to backend.',
    ],
    techStack: ['React.js', 'Node.js', 'Flutter', 'Firebase', 'PostgreSQL'],
  },
  {
    id: 'uit',
    company: 'University of Information Technology - HCM VNU',
    role: 'Student',
    period: '2020 - 2024',
    description: [
      'Bachelor of Science in Information Technology',
      'Focus on Software Engineering and Web Development',
      'Participated in various coding competitions and tech events',
    ],
    techStack: [],
  },
];
