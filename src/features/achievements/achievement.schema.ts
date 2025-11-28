import { z } from 'zod';
import { AchievementCategory, AchievementStatus, TechStack } from '../../data/achievements';

export const achievementSchema = z.object({
    title: z
        .string()
        .min(3, { message: 'Title must be at least 3 characters' })
        .max(100, { message: 'Title must be less than 100 characters' }),

    description: z
        .string()
        .min(10, { message: 'Description must be at least 10 characters' })
        .max(500, { message: 'Description must be less than 500 characters' }),

    category: z
        .enum(AchievementCategory)
        .refine((val) => Object.values(AchievementCategory).includes(val), {
            message: 'Please select a valid category',
        }),

    status: z
        .enum(AchievementStatus)
        .refine((val) => Object.values(AchievementStatus).includes(val), {
            message: 'Please select a valid status',
        }),

    date: z.string().min(1, { message: 'Date is required' }),

    impact: z
        .string()
        .min(10, { message: 'Impact must be at least 10 characters' })
        .max(200, { message: 'Impact must be less than 200 characters' }),

    techStack: z
        .array(z.enum(TechStack))
        .optional()
        .refine(
            (arr) => arr?.every((val) => Object.values(TechStack).includes(val)) ?? true,
            { message: 'Invalid tech stack item' }
        ),
});

export type AchievementFormData = z.infer<typeof achievementSchema>;
