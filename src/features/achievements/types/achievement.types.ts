import { Achievement, AchievementCategory, AchievementStatus, TechStack } from '../../../data/achievements';

export type EditableValue =
  | string
  | AchievementCategory
  | AchievementStatus
  | TechStack[];

export interface EditingState {
  id: string;
  field: keyof Achievement;
  value: EditableValue;
}

export interface AchievementFilters {
  search?: string;
  category?: AchievementCategory | '';
  status?: AchievementStatus | '';
  dateFrom?: Date | null;
  dateTo?: Date | null;
}

export interface AchievementDisplayProps {
  achievement: Achievement;
}

export interface AchievementActionHandlers {
  onEdit?: (achievement: Achievement) => void;
  onDelete?: (id: string, title: string) => void;
  onView?: (achievement: Achievement) => void;
}

export interface AchievementRowComponentProps extends AchievementDisplayProps, AchievementActionHandlers {
  editing: EditingState | null;
  onStartEdit: (
    id: string,
    field: keyof Achievement,
    value: EditableValue | undefined
  ) => void;
  onChangeEditingValue: (value: EditableValue) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onRowClick: (achievement: Achievement) => void;
}
