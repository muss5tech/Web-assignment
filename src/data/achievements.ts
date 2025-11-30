export enum AchievementCategory {
    Technical = 'technical',
    Project = 'project',
    Leadership = 'leadership',
    Education = 'education',
    Community = 'community',
}

export enum AchievementStatus {
    Completed = 'completed',
    InProgress = 'in-progress',
    Planned = 'planned',
}

export enum TechStack {
    NextJS = 'Next.js',
    TypeScript = 'TypeScript',
    Firebase = 'Firebase',
    Flutter = 'Flutter',
    BloC = 'BloC',
    AIIntegration = 'AI Integration',
    PaymentSystems = 'Payment Systems',
    GoogleAnalytics = 'Google Analytics',
    BigQuery = 'BigQuery',
    ReactJS = 'React.js',
    Bootstrap = 'Bootstrap',
    DotNetCore = '.NET Core',
    GitHubActions = 'GitHub Actions',
    MicroFrontend = 'Micro Frontend',
    Sentry = 'Sentry',
    Slack = 'Slack',
    GooglePlay = 'Google Play',
    TailwindCSS = 'Tailwind CSS',
    ZegoCloud = 'ZegoCloud',
    SDKDevelopment = 'SDK Development',
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    category: AchievementCategory;
    status: AchievementStatus;
    date: string;
    impact: string;
    techStack?: TechStack[];
}

export const achievements: Achievement[] = [
    {
        id: 'dynamic-linking-system',
        title: 'Custom Dynamic Linking System',
        description:
            'Built a custom dynamic linking system with Next.js to replace Google Dynamic Links, providing a more flexible and maintainable solution to seamlessly redirect users to the mobile app.',
        category: AchievementCategory.Technical,
        status: AchievementStatus.Completed,
        date: '2024-03-15',
        impact: 'Reduced maintenance costs and increased flexibility for deep linking across platforms',
        techStack: [TechStack.NextJS, TechStack.TypeScript, TechStack.Firebase],
    },
    {
        id: 'abc-app-launch',
        title: 'Cross-Platform ABC App Launch',
        description:
            'Successfully built and launched cross-platform ABC app for both Android and iOS with Flutter, integrated dynamic link system, AI-powered chatbot, and 9Pay payment gateway.',
        category: AchievementCategory.Project,
        status: AchievementStatus.Completed,
        date: '2024-06-20',
        impact: 'Delivered full-featured mobile app serving thousands of active users',
        techStack: [
            TechStack.Flutter,
            TechStack.BloC,
            TechStack.Firebase,
            TechStack.AIIntegration,
            TechStack.PaymentSystems,
        ],
    },
    {
        id: 'analytics-infrastructure',
        title: 'Advanced Analytics Infrastructure',
        description:
            'Implemented and managed advanced analytics via Firebase SDK, configured funnels in Google Analytics, and prepared data in BigQuery to support BI analysis.',
        category: AchievementCategory.Technical,
        status: AchievementStatus.Completed,
        date: '2024-01-10',
        impact: 'Enabled data-driven decision making for product development and improved user insights',
        techStack: [
            TechStack.Firebase,
            TechStack.GoogleAnalytics,
            TechStack.BigQuery,
        ],
    },
    {
        id: 'team-technical-workshops',
        title: 'Team Technical Training Program',
        description:
            'Contributed to team growth by hosting technical workshops and training new developers on core technologies.',
        category: AchievementCategory.Leadership,
        status: AchievementStatus.InProgress,
        date: '2023-09-01',
        impact: 'Accelerated onboarding process and improved team technical capabilities',
        techStack: [
            TechStack.NextJS,
            TechStack.ReactJS,
            TechStack.TypeScript,
            TechStack.Flutter,
        ],
    },
    {
        id: 'cms-real-time-system',
        title: 'Internal CMS Development',
        description:
            'Developed an internal CMS using React and .NET Core, allowing real-time service customization for customers.',
        category: AchievementCategory.Project,
        status: AchievementStatus.Completed,
        date: '2023-05-12',
        impact: 'Enabled real-time configuration for client services, reducing manual work by 70%',
        techStack: [
            TechStack.ReactJS,
            TechStack.Bootstrap,
            TechStack.TypeScript,
            TechStack.DotNetCore,
        ],
    },
    {
        id: 'cicd-automation',
        title: 'CI/CD Pipeline Implementation',
        description:
            'Implemented CI/CD pipelines using GitHub Actions to automate the build and distribution of test builds via Firebase App Distribution.',
        category: AchievementCategory.Technical,
        status: AchievementStatus.Completed,
        date: '2023-02-20',
        impact: 'Reduced deployment time by 80% and improved release reliability',
        techStack: [
            TechStack.GitHubActions,
            TechStack.Firebase,
            TechStack.Flutter,
        ],
    },
    {
        id: 'micro-frontend-architecture',
        title: 'Micro-Frontend Architecture',
        description:
            'Applied a Micro-frontend architecture using Flutter and BloC to manage complex features of an internal IMT app.',
        category: AchievementCategory.Technical,
        status: AchievementStatus.Completed,
        date: '2023-07-15',
        impact: 'Improved code maintainability and enabled parallel development across teams',
        techStack: [
            TechStack.Flutter,
            TechStack.BloC,
            TechStack.MicroFrontend,
        ],
    },
    {
        id: 'error-tracking-integration',
        title: 'Sentry-Slack Integration',
        description:
            'Integrated Sentry with Slack for real-time error tracking, significantly reducing bug resolution time.',
        category: AchievementCategory.Technical,
        status: AchievementStatus.Completed,
        date: '2022-11-08',
        impact: 'Decreased bug resolution time by 60% and improved team response time',
        techStack: [
            TechStack.Sentry,
            TechStack.Slack,
            TechStack.ReactJS,
        ],
    },
    {
        id: 'photo-social-network',
        title: 'Photo Social Network App',
        description:
            'Led the development of a photo social network app using Flutter and BloC with Firebase backend services. Successfully published on the Google Play Store.',
        category: AchievementCategory.Project,
        status: AchievementStatus.Completed,
        date: '2023-04-30',
        impact: 'Delivered production-ready mobile app with real-time engagement features',
        techStack: [
            TechStack.Flutter,
            TechStack.BloC,
            TechStack.Firebase,
            TechStack.GooglePlay,
        ],
    },
    {
        id: 'bachelor-degree',
        title: 'Bachelor of Computer Science',
        description:
            'Graduated from University of Information Technology - HCM VNU with focus on Software Engineering.',
        category: AchievementCategory.Education,
        status: AchievementStatus.Completed,
        date: '2024-06-01',
        impact: 'Solid foundation in computer science and software engineering principles',
    },
    {
        id: 'performance-optimization',
        title: 'Web Platform Performance Optimization',
        description:
            'Developed and optimized high-performance, SEO-friendly web platforms for merchants and users with Next.js and React.',
        category: AchievementCategory.Technical,
        status: AchievementStatus.InProgress,
        date: '2023-08-01',
        impact: 'Improved page load times and SEO rankings for e-commerce platforms',
        techStack: [
            TechStack.NextJS,
            TechStack.ReactJS,
            TechStack.TypeScript,
            TechStack.TailwindCSS,
        ],
    },
    {
        id: 'ott-sdk-development',
        title: 'OTT Functionality SDK',
        description:
            'Developed OTT functionality into a standalone SDK for external clients with ZegoCloud integration.',
        category: AchievementCategory.Project,
        status: AchievementStatus.Completed,
        date: '2023-03-25',
        impact: 'Enabled external clients to integrate streaming features into their applications',
        techStack: [
            TechStack.Flutter,
            TechStack.ZegoCloud,
            TechStack.SDKDevelopment,
        ],
    },
];
