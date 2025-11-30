export interface SocialLink {
  name: string;
  url: string;
  username: string;
  icon: 'github' | 'linkedin' | 'email' | 'phone';
}

export interface Profile {
  name: string;
  fullName: string;
  role: string;
  bio: string;
  location: string;
  yearsOfExperience: string;
  isAvailable: boolean;
  socials: SocialLink[];
  cvUrl?: string;
}

export const profile: Profile = {
  name: 'Mus',
  fullName: 'Mus Nguyen',
  role: 'Frontend Developer',
  bio: `Frontend Developer with 2+ years of experience building responsive, high-performance web and mobile applications. I prioritize creating maintainable solutions, considering the long-term impact on the overall system and its stability.

In the age of AI-driven development, I leverage and manage tools like Cursor and Claude as AI agents under my guidance to boost delivery speed, enforce architecture, and maintain high code quality.`,
  location: 'Ho Chi Minh City, Vietnam',
  yearsOfExperience: '2+',
  isAvailable: true,
  socials: [
    {
      name: 'GitHub',
      url: 'https://github.com/muss5tech',
      username: 'muss5tech',
      icon: 'github',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/muss5tech',
      username: 'muss5tech',
      icon: 'linkedin',
    },
    {
      name: 'Email',
      url: 'mailto:mus@s5tech.co',
      username: 'muss5tech',
      icon: 'email',
    },
    {
      name: 'Phone',
      url: 'tel:+1234567890',
      username: '+1234567890',
      icon: 'phone',
    },
  ],
  cvUrl: '#',
};
