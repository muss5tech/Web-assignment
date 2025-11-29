import { AchievementCategory, AchievementStatus } from '../../../data/achievements';
import { CATEGORY_COLOR_MAP, STATUS_COLOR_MAP } from '../constants/achievement.constants';

export const getCategoryColor = (
  category: AchievementCategory
): 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'default' => {
  return CATEGORY_COLOR_MAP[category] ?? 'default';
};

export const getStatusColor = (
  status: AchievementStatus
): 'success' | 'warning' | 'info' | 'default' => {
  return STATUS_COLOR_MAP[status] ?? 'default';
};

export const meetsMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

export const meetsMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength;
};

export const isWithinLengthRange = (
  value: string,
  minLength: number,
  maxLength: number
): boolean => {
  const length = value.trim().length;
  return length >= minLength && length <= maxLength;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const splitVisibleItems = <T>(
  items: T[],
  maxVisible: number
): { visible: T[]; remaining: number } => {
  const visible = items.slice(0, maxVisible);
  const remaining = Math.max(0, items.length - maxVisible);
  return { visible, remaining };
};

export const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === 'string' && value.trim().length > 0;
};

export const isValidDateString = (value: unknown): boolean => {
  if (typeof value !== 'string') return false;
  const date = new Date(value);
  return !isNaN(date.getTime());
};
