import { Cancel, Delete, Edit, Save } from '@mui/icons-material';
import {
  Autocomplete,
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
import { MAX_VISIBLE_TECH_STACK } from '../constants/achievement.constants';
import {
  AchievementRowComponentProps
} from '../types/achievement.types';
import {
  getCategoryColor,
  getStatusColor,
  splitVisibleItems,
} from '../utils/achievement.utils';

interface AchievementRowProps extends AchievementRowComponentProps {}

const CategoryChip = ({ category }: { category: AchievementCategory }) => (
  <Chip
    label={category}
    color={getCategoryColor(category)}
    size="small"
  />
);

const StatusChip = ({ status }: { status: AchievementStatus }) => (
  <Chip
    label={status}
    color={getStatusColor(status)}
    size="small"
  />
);

const TechStackChips = ({ techStack }: { techStack?: TechStack[] }) => {
  if (!techStack?.length) return null;
  const { visible, remaining } = splitVisibleItems(techStack, MAX_VISIBLE_TECH_STACK);

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
  onRowClick,
  onStartEdit,
  onChangeEditingValue,
  onSaveEdit,
  onCancelEdit,
  onDelete,
}: AchievementRowProps) => {
  const isEditingRow = editing?.id === achievement.id;

  const handleRowClick = (e: React.MouseEvent) => {
    if (isEditingRow) return;
    const target = e.target as HTMLElement;
    if (
      target.closest('button') ||
      target.closest('[role="button"]') ||
      target.closest('input') ||
      target.closest('[role="combobox"]')
    ) {
      return;
    }
    onRowClick(achievement);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onStartEdit(achievement.id, 'title', achievement.title);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(achievement.id, achievement.title);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSaveEdit();
  };

  const handleCancelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCancelEdit();
  };

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
          onClick={(e) => e.stopPropagation()}
          autoFocus
          multiline={field === 'description' || field === 'impact'}
          rows={field === 'description' || field === 'impact' ? 3 : 1}
        />
      );
    }

    return (
      <Box
        onClick={(e) => {
          if (isEditingRow) {
            e.stopPropagation();
            onStartEdit(achievement.id, field, value);
          }
        }}
        sx={{
          cursor: isEditingRow ? 'pointer' : 'default',
          '&:hover': isEditingRow ? { backgroundColor: 'action.hover' } : {},
          p: 1,
          borderRadius: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            maxWidth: field === 'title' ? 200 : field === 'impact' ? 250 : 300,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
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
        <FormControl fullWidth size="small" onClick={(e) => e.stopPropagation()}>
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
      <Box
        onClick={(e) => {
          if (isEditingRow) {
            e.stopPropagation();
            onStartEdit(achievement.id, 'category', achievement.category);
          }
        }}
        sx={{
          cursor: isEditingRow ? 'pointer' : 'default',
          p: 1,
        }}
      >
        <CategoryChip category={achievement.category} />
      </Box>
    );
  };

  const renderStatusCell = () => {
    const isEditing =
      editing?.id === achievement.id && editing?.field === 'status';

    if (isEditing) {
      return (
        <FormControl fullWidth size="small" onClick={(e) => e.stopPropagation()}>
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
      <Box
        onClick={(e) => {
          if (isEditingRow) {
            e.stopPropagation();
            onStartEdit(achievement.id, 'status', achievement.status);
          }
        }}
        sx={{
          cursor: isEditingRow ? 'pointer' : 'default',
          p: 1,
        }}
      >
        <StatusChip status={achievement.status} />
      </Box>
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
          onClick={(e) => e.stopPropagation()}
          autoFocus
        />
      );
    }

    return (
      <Box
        onClick={(e) => {
          if (isEditingRow) {
            e.stopPropagation();
            onStartEdit(achievement.id, 'date', achievement.date);
          }
        }}
        sx={{
          cursor: isEditingRow ? 'pointer' : 'default',
          '&:hover': isEditingRow ? { backgroundColor: 'action.hover' } : {},
          p: 1,
          borderRadius: 1,
        }}
      >
        <Typography variant="body2">
          {dayjs(achievement.date).format('MMM DD, YYYY')}
        </Typography>
      </Box>
    );
  };

  const renderTechStackCell = () => {
    const isEditing =
      editing?.id === achievement.id && editing?.field === 'techStack';

    if (isEditing) {
      return (
        <FormControl fullWidth size="small" onClick={(e) => e.stopPropagation()}>
          <Autocomplete
            multiple
            size="small"
            options={Object.values(TechStack)}
            value={(editing.value as TechStack[]) || []}
            onChange={(_, newValue) => onChangeEditingValue(newValue as TechStack[])}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select technologies"
                size="small"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option}
                  label={option}
                  size="small"
                />
              ))
            }
          />
        </FormControl>
      );
    }

    return (
      <Box
        onClick={(e) => {
          if (isEditingRow) {
            e.stopPropagation();
            onStartEdit(achievement.id, 'techStack', achievement.techStack || []);
          }
        }}
        sx={{
          cursor: isEditingRow ? 'pointer' : 'default',
          '&:hover': isEditingRow ? { backgroundColor: 'action.hover' } : {},
          p: 1,
          borderRadius: 1,
        }}
      >
        <TechStackChips techStack={achievement.techStack} />
      </Box>
    );
  };

  const renderActionsCell = () => {
    if (isEditingRow) {
      return (
        <Box display="flex" justifyContent="flex-end" gap={0.5}>
          <IconButton size="small" color="success" onClick={handleSaveClick}>
            <Save fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={handleCancelClick}>
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
          onClick={handleEditClick}
        >
          <Edit fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={handleDeleteClick}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Box>
    );
  };

  return (
    <TableRow
      hover={!isEditingRow}
      onClick={handleRowClick}
      sx={{
        cursor: isEditingRow ? 'default' : 'pointer',
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
      <TableCell>{renderTechStackCell()}</TableCell>
      <TableCell>{renderActionsCell()}</TableCell>
    </TableRow>
  );
};

export default AchievementRow;