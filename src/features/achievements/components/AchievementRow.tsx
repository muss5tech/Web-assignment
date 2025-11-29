import { Cancel, Delete, Edit, Save } from '@mui/icons-material';
import {
  Box,
  Chip,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import {
  Achievement,
  AchievementCategory,
  AchievementStatus,
  TechStack,
} from '../../../data/achievements';

type EditableValue =
  | string
  | AchievementCategory
  | AchievementStatus
  | TechStack[];

interface AchievementRowProps {
  achievement: Achievement;
  editing: {
    id: string;
    field: keyof Achievement;
    value: EditableValue;
  } | null;
  onStartEdit: (
    id: string,
    field: keyof Achievement,
    value: EditableValue | undefined
  ) => void;
  onChangeEditingValue: (value: EditableValue) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDelete: (id: string, title: string) => void;
}

const categoryColorMap: Record<
  AchievementCategory,
  'primary' | 'secondary' | 'success' | 'warning' | 'info'
> = {
  [AchievementCategory.Technical]: 'primary',
  [AchievementCategory.Project]: 'secondary',
  [AchievementCategory.Leadership]: 'warning',
  [AchievementCategory.Education]: 'info',
  [AchievementCategory.Community]: 'success',
};

const getCategoryColor = (category: AchievementCategory) =>
  categoryColorMap[category] ?? 'default';

const getStatusColor = (status: AchievementStatus) =>
  status === AchievementStatus.Completed ? 'success' : 'warning';

const CategoryChip = ({
  category,
  onClick,
}: {
  category: AchievementCategory;
  onClick?: () => void;
}) => (
  <Chip
    label={category}
    color={getCategoryColor(category)}
    size="small"
    onClick={onClick}
    sx={
      onClick
        ? {
            cursor: 'pointer',
          }
        : {}
    }
  />
);

const StatusChip = ({
  status,
  onClick,
}: {
  status: AchievementStatus;
  onClick?: () => void;
}) => (
  <Chip
    label={status}
    color={getStatusColor(status)}
    size="small"
    onClick={onClick}
    sx={
      onClick
        ? {
            cursor: 'pointer',
          }
        : {}
    }
  />
);

const TechStackChips = ({ techStack }: { techStack?: TechStack[] }) => {
  if (!techStack?.length) return null;
  const visible = techStack.slice(0, 3);
  const remaining = techStack.length - visible.length;

  return (
    <Box display="flex" flexWrap="wrap" gap={0.5}>
      {visible.map((tech, idx) => (
        <Chip key={idx} label={tech} size="small" variant="outlined" />
      ))}
      {remaining > 0 && (
        <Chip label={`+${remaining}`} size="small" variant="outlined" />
      )}
    </Box>
  );
};

const AchievementRow = ({
  achievement,
  editing,
  onStartEdit,
  onChangeEditingValue,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}: AchievementRowProps) => {
  const renderEditableCell = (
    field: keyof Achievement,
    value: string
  ): JSX.Element => {
    const isEditing = editing?.id === achievement.id && editing?.field === field;

    if (isEditing) {
      return (
        <TextField
          fullWidth
          size="small"
          value={editing.value}
          onChange={(e) => onChangeEditingValue(e.target.value)}
          autoFocus
          multiline={field === 'description' || field === 'impact'}
          rows={field === 'description' || field === 'impact' ? 3 : 1}
        />
      );
    }

    return (
      <Box
        onClick={() => onStartEdit(achievement.id, field, value)}
        sx={{
          cursor: 'pointer',
          '&:hover': { backgroundColor: 'action.hover' },
          p: 1,
          borderRadius: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{ maxWidth: field === 'title' ? 200 : 300 }}
          fontWeight={field === 'title' ? 'medium' : 'normal'}
        >
          {value}
        </Typography>
      </Box>
    );
  };

  const renderCategoryCell = () => {
    const isEditing =
      editing?.id === achievement.id && editing?.field === 'category';

    if (isEditing) {
      return (
        <FormControl fullWidth size="small">
          <Select
            value={editing.value}
            onChange={(e) =>
              onChangeEditingValue(e.target.value as AchievementCategory)
            }
            autoFocus
          >
            {Object.values(AchievementCategory).map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    return (
      <CategoryChip
        category={achievement.category}
        onClick={() =>
          onStartEdit(achievement.id, 'category', achievement.category)
        }
      />
    );
  };

  const renderStatusCell = () => {
    const isEditing =
      editing?.id === achievement.id && editing?.field === 'status';

    if (isEditing) {
      return (
        <FormControl fullWidth size="small">
          <Select
            value={editing.value}
            onChange={(e) =>
              onChangeEditingValue(e.target.value as AchievementStatus)
            }
            autoFocus
          >
            {Object.values(AchievementStatus).map((stat) => (
              <MenuItem key={stat} value={stat}>
                {stat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    }

    return (
      <StatusChip
        status={achievement.status}
        onClick={() =>
          onStartEdit(achievement.id, 'status', achievement.status)
        }
      />
    );
  };

  const renderDateCell = () => {
    const isEditing = editing?.id === achievement.id && editing?.field === 'date';

    if (isEditing) {
      return (
        <TextField
          fullWidth
          size="small"
          type="date"
          value={editing.value}
          onChange={(e) => onChangeEditingValue(e.target.value)}
          autoFocus
        />
      );
    }

    return (
      <Box
        onClick={() => onStartEdit(achievement.id, 'date', achievement.date)}
        sx={{
          cursor: 'pointer',
          '&:hover': { backgroundColor: 'action.hover' },
          p: 1,
          borderRadius: 1,
        }}
      >
        {dayjs(achievement.date).format('MMM DD, YYYY')}
      </Box>
    );
  };

  const renderActionsCell = () => {
    const isEditingRow = editing?.id === achievement.id;

    if (isEditingRow) {
      return (
        <Box display="flex" justifyContent="flex-end" gap={0.5}>
          <IconButton size="small" color="success" onClick={onSaveEdit}>
            <Save fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={onCancelEdit}>
            <Cancel fontSize="small" />
          </IconButton>
        </Box>
      );
    }

    return (
      <Box display="flex" justifyContent="flex-end" gap={0.5}>
        <IconButton
          size="small"
          color="primary"
          onClick={() => onStartEdit(achievement.id, 'title', achievement.title)}
        >
          <Edit fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={() => onDelete(achievement.id, achievement.title)}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Box>
    );
  };

  return (
    <TableRow
      hover
      sx={{
        transition: 'background-color 180ms ease, transform 120ms ease',
      }}
    >
      <TableCell>{renderEditableCell('title', achievement.title)}</TableCell>
      <TableCell>
        {renderEditableCell('description', achievement.description)}
      </TableCell>
      <TableCell>{renderCategoryCell()}</TableCell>
      <TableCell>{renderStatusCell()}</TableCell>
      <TableCell>{renderDateCell()}</TableCell>
      <TableCell>{renderEditableCell('impact', achievement.impact)}</TableCell>
      <TableCell>
        <TechStackChips techStack={achievement.techStack} />
      </TableCell>
      <TableCell>{renderActionsCell()}</TableCell>
    </TableRow>
  );
};

export default AchievementRow;


