import { AchievementCategory, AchievementStatus } from '../../../data/achievements';

export const CATEGORY_COLOR_MAP: Record<
  AchievementCategory,
  'primary' | 'secondary' | 'success' | 'warning' | 'info'
> = {
  [AchievementCategory.Technical]: 'primary',
  [AchievementCategory.Project]: 'secondary',
  [AchievementCategory.Leadership]: 'warning',
  [AchievementCategory.Education]: 'info',
  [AchievementCategory.Community]: 'success',
} as const;

export const STATUS_COLOR_MAP: Record<
  AchievementStatus,
  'success' | 'warning' | 'info'
> = {
  [AchievementStatus.Completed]: 'success',
  [AchievementStatus.InProgress]: 'warning',
  [AchievementStatus.Planned]: 'info',
} as const;

export const MAX_VISIBLE_TECH_STACK = 3;
export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25] as const;
export const DEFAULT_ROWS_PER_PAGE = 10;

export const TITLE_MIN_LENGTH = 3;
export const TITLE_MAX_LENGTH = 100;

export const DESCRIPTION_MIN_LENGTH = 10;
export const DESCRIPTION_MAX_LENGTH = 500;

export const IMPACT_MIN_LENGTH = 10;
export const IMPACT_MAX_LENGTH = 500;

export const VALIDATION_MESSAGES = {
  title: {
    required: 'Title is required',
    minLength: `Title must be at least ${TITLE_MIN_LENGTH} characters`,
    maxLength: `Title must not exceed ${TITLE_MAX_LENGTH} characters`,
  },
  description: {
    required: 'Description is required',
    minLength: `Description must be at least ${DESCRIPTION_MIN_LENGTH} characters`,
    maxLength: `Description must not exceed ${DESCRIPTION_MAX_LENGTH} characters`,
  },
  impact: {
    required: 'Impact is required',
    minLength: `Impact must be at least ${IMPACT_MIN_LENGTH} characters`,
    maxLength: `Impact must not exceed ${IMPACT_MAX_LENGTH} characters`,
  },
  category: {
    required: 'Category is required',
  },
  status: {
    required: 'Status is required',
  },
  date: {
    required: 'Date is required',
    invalid: 'Invalid date format',
  },
  techStack: {
    required: 'At least one technology is required',
  },
} as const;

export const API_DELAY_MS = 500;
export const API_DELETE_DELAY_MS = 300;

export const SEARCH_DEBOUNCE_MS = 300;
export const SEARCH_PLACEHOLDER = 'Search achievements...';

export const EMPTY_STATE_MESSAGES = {
  noAchievements: {
    title: 'No achievements yet',
    subtitle: 'Get started by adding your first achievement',
  },
  noResults: {
    title: 'No achievements found',
    subtitle: 'Try adjusting your search or filters',
  },
} as const;

export const FIELD_LABEL_TYPOGRAPHY = {
  fontSize: 12,
  fontWeight: 600,
  textTransform: 'uppercase' as const,
  letterSpacing: 0.8,
  marginBottom: 1,
  display: 'block' as const,
} as const;

export const DIALOG_TITLE_TYPOGRAPHY = {
  fontWeight: 700,
  fontSize: 20,
  letterSpacing: 0.4,
} as const;
