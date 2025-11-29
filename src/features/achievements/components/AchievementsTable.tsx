import { Cancel, Delete, Edit, Save } from '@mui/icons-material';
import {
  Box,
  Chip,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import {
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsString,
  useQueryState,
} from 'nuqs';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import {
  Achievement,
  AchievementCategory,
  AchievementStatus,
  TechStack,
} from '../../../data/achievements';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectAllAchievements } from '../achievements.selectors';
import { deleteAchievement, updateAchievement } from '../achievements.thunks';

interface EditingState {
  id: string;
  field: keyof Achievement;
  value: string | AchievementCategory | AchievementStatus | TechStack[];
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

const AchievementsTable = () => {
  const dispatch = useAppDispatch();
  const achievements = useAppSelector(selectAllAchievements);

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(0));
  const [rowsPerPage, setRowsPerPage] = useQueryState(
    'rowsPerPage',
    parseAsInteger.withDefault(10)
  );
  const [search] = useQueryState('search', parseAsString.withDefault(''));
  const [category] = useQueryState('category', parseAsString.withDefault(''));
  const [status] = useQueryState('status', parseAsString.withDefault(''));
  const [dateFrom] = useQueryState('dateFrom', parseAsIsoDateTime);
  const [dateTo] = useQueryState('dateTo', parseAsIsoDateTime);
  const [editing, setEditing] = useState<EditingState | null>(null);

  const filteredAchievements = useMemo(() => {
    return achievements.filter((a) => {
      const titleMatch = a.title.toLowerCase().includes(search.toLowerCase());
      const descMatch = a.description
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesSearch = !search || titleMatch || descMatch;
      const matchesCategory = !category || a.category === category;
      const matchesStatus = !status || a.status === status;
      const achievementDate = new Date(a.date);
      const matchesDateFrom = !dateFrom || achievementDate >= dateFrom;
      const matchesDateTo = !dateTo || achievementDate <= dateTo;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesDateFrom &&
        matchesDateTo
      );
    });
  }, [achievements, search, category, status, dateFrom, dateTo]);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (id: string, title: string) => {
    try {
      await dispatch(deleteAchievement(id)).unwrap();
      toast.success(`Achievement "${title}" deleted successfully`);
    } catch {
      toast.error('Failed to delete achievement');
    }
  };

  const handleEditClick = (
    id: string,
    field: keyof Achievement,
    value:
      | string
      | AchievementCategory
      | AchievementStatus
      | TechStack[]
      | undefined
  ) => {
    setEditing({ id, field, value: value || '' });
  };

  const handleSaveEdit = async () => {
    if (!editing) return;

    const achievement = achievements.find((a) => a.id === editing.id);
    if (!achievement) return;

    if (
      editing.field === 'title' &&
      typeof editing.value === 'string' &&
      editing.value.length < 3
    ) {
      toast.error('Title must be at least 3 characters');
      return;
    }

    if (
      editing.field === 'description' &&
      typeof editing.value === 'string' &&
      editing.value.length < 10
    ) {
      toast.error('Description must be at least 10 characters');
      return;
    }

    if (
      editing.field === 'impact' &&
      typeof editing.value === 'string' &&
      editing.value.length < 10
    ) {
      toast.error('Impact must be at least 10 characters');
      return;
    }

    try {
      const updatedAchievement = {
        ...achievement,
        [editing.field]: editing.value,
      };
      await dispatch(updateAchievement(updatedAchievement)).unwrap();
      toast.success('Achievement updated successfully');
      setEditing(null);
    } catch {
      toast.error('Failed to update achievement');
    }
  };

  const handleCancelEdit = () => {
    setEditing(null);
  };

  const renderEditableCell = (
    achievement: Achievement,
    field: keyof Achievement,
    value: string
  ) => {
    const isEditing =
      editing?.id === achievement.id && editing?.field === field;

    if (isEditing) {
      return (
        <TextField
          fullWidth
          size="small"
          value={editing.value}
          onChange={(e) => setEditing({ ...editing, value: e.target.value })}
          autoFocus
          multiline={field === 'description' || field === 'impact'}
          rows={field === 'description' || field === 'impact' ? 3 : 1}
        />
      );
    }

    return (
      <Box
        onClick={() => handleEditClick(achievement.id, field, value)}
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

  const renderCategoryCell = (achievement: Achievement) => {
    const isEditing =
      editing?.id === achievement.id && editing?.field === 'category';

    if (isEditing) {
      return (
        <FormControl fullWidth size="small">
          <Select
            value={editing.value}
            onChange={(e) =>
              setEditing({
                ...editing,
                value: e.target.value as AchievementCategory,
              })
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
          handleEditClick(achievement.id, 'category', achievement.category)
        }
      />
    );
  };

  const renderStatusCell = (achievement: Achievement) => {
    const isEditing =
      editing?.id === achievement.id && editing?.field === 'status';

    if (isEditing) {
      return (
        <FormControl fullWidth size="small">
          <Select
            value={editing.value}
            onChange={(e) =>
              setEditing({
                ...editing,
                value: e.target.value as AchievementStatus,
              })
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
          handleEditClick(achievement.id, 'status', achievement.status)
        }
      />
    );
  };

  const renderDateCell = (achievement: Achievement) => {
    const isEditing =
      editing?.id === achievement.id && editing?.field === 'date';

    if (isEditing) {
      return (
        <TextField
          fullWidth
          size="small"
          type="date"
          value={editing.value}
          onChange={(e) => setEditing({ ...editing, value: e.target.value })}
          autoFocus
        />
      );
    }

    return (
      <Box
        onClick={() =>
          handleEditClick(achievement.id, 'date', achievement.date)
        }
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

  const ActionsCell = ({ achievement }: { achievement: Achievement }) => {
    const isEditingRow = editing?.id === achievement.id;

    if (isEditingRow) {
      return (
        <Box display="flex" justifyContent="flex-end" gap={0.5}>
          <IconButton size="small" color="success" onClick={handleSaveEdit}>
            <Save fontSize="small" />
          </IconButton>
          <IconButton size="small" color="error" onClick={handleCancelEdit}>
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
          onClick={() =>
            handleEditClick(achievement.id, 'title', achievement.title)
          }
        >
          <Edit fontSize="small" />
        </IconButton>
        <IconButton
          size="small"
          color="error"
          onClick={() => handleDelete(achievement.id, achievement.title)}
        >
          <Delete fontSize="small" />
        </IconButton>
      </Box>
    );
  };

  const paginatedAchievements = filteredAchievements.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (!filteredAchievements.length) {
    return (
      <Box
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: 3,
          border: (theme) =>
            theme.palette.mode === 'light'
              ? '1px solid rgba(203,213,225,0.8)'
              : '1px solid rgba(255,255,255,0.06)',
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'linear-gradient(135deg, rgba(248,250,252,0.95), rgba(226,232,240,0.5))'
              : 'linear-gradient(135deg, rgba(15,23,42,0.85), rgba(30,64,175,0.35))',
          boxShadow: (theme) =>
            theme.palette.mode === 'light'
              ? '0 4px 12px rgba(148,163,184,0.15)'
              : '0 18px 45px rgba(15,23,42,0.8)',
          color: (theme) =>
            theme.palette.mode === 'light'
              ? 'rgba(15,23,42,0.9)'
              : 'rgba(226,232,240,0.9)',
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, letterSpacing: 0.3, mb: 0.5 }}
        >
          No achievements found
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'light'
                ? 'rgba(71,85,105,0.9)'
                : 'rgba(148,163,184,0.9)',
          }}
        >
          Try adjusting your filters or add a new achievement.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        borderRadius: 3,
        border: (theme) =>
          theme.palette.mode === 'light'
            ? '1px solid rgba(203,213,225,0.8)'
            : '1px solid rgba(148,163,184,0.35)',
        background: (theme) =>
          theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,0.95))'
            : 'linear-gradient(135deg, rgba(15,23,42,0.92), rgba(30,64,175,0.35))',
        boxShadow: (theme) =>
          theme.palette.mode === 'light'
            ? '0 4px 12px rgba(148,163,184,0.15), 0 0 0 1px rgba(203,213,225,0.3)'
            : '0 22px 60px rgba(15,23,42,0.95), 0 0 0 1px rgba(15,23,42,0.9)',
        overflow: 'hidden',
      }}
    >
      <TableContainer>
        <Table
          size="small"
          sx={{
            '& thead tr': {
              background: (theme) =>
                theme.palette.mode === 'light'
                  ? 'linear-gradient(90deg, rgba(241,245,249,0.98), rgba(226,232,240,0.85))'
                  : 'linear-gradient(90deg, rgba(15,23,42,0.95), rgba(30,64,175,0.55))',
            },
            '& thead th': {
              color: (theme) =>
                theme.palette.mode === 'light'
                  ? 'rgb(30,41,59)'
                  : 'rgb(219,234,254)',
              fontWeight: 600,
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: 0.13,
              borderBottom: (theme) =>
                theme.palette.mode === 'light'
                  ? '1px solid rgba(203,213,225,0.8)'
                  : '1px solid rgba(148,163,184,0.4)',
              paddingY: 1.5,
            },
            '& tbody tr': {
              '&:nth-of-type(odd)': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'rgba(255,255,255,0.95)'
                    : 'rgba(15,23,42,0.9)',
              },
              '&:nth-of-type(even)': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'rgba(248,250,252,0.95)'
                    : 'rgba(15,23,42,0.85)',
              },
              '&:hover': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'rgba(226,232,240,0.5)'
                    : 'rgba(30,64,175,0.35)',
              },
            },
            '& tbody td': {
              borderBottom: (theme) =>
                theme.palette.mode === 'light'
                  ? '1px solid rgba(203,213,225,0.5)'
                  : '1px solid rgba(30,64,175,0.35)',
              color: (theme) =>
                theme.palette.mode === 'light'
                  ? 'rgb(51,65,85)'
                  : 'rgb(226,232,240)',
              fontSize: 13,
            },
          }}
        >
          <TableHead>
            <TableRow>
              {[
                'Title',
                'Description',
                'Category',
                'Status',
                'Date',
                'Impact',
                'Tech Stack',
                'Actions',
              ].map((header) => (
                <TableCell
                  key={header}
                  align={header === 'Actions' ? 'right' : 'left'}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedAchievements.map((achievement) => (
              <TableRow
                key={achievement.id}
                hover
                sx={{
                  transition:
                    'background-color 180ms ease, transform 120ms ease',
                }}
              >
                <TableCell>
                  {renderEditableCell(achievement, 'title', achievement.title)}
                </TableCell>
                <TableCell>
                  {renderEditableCell(
                    achievement,
                    'description',
                    achievement.description
                  )}
                </TableCell>
                <TableCell>{renderCategoryCell(achievement)}</TableCell>
                <TableCell>{renderStatusCell(achievement)}</TableCell>
                <TableCell>{renderDateCell(achievement)}</TableCell>
                <TableCell>
                  {renderEditableCell(
                    achievement,
                    'impact',
                    achievement.impact
                  )}
                </TableCell>
                <TableCell>
                  <TechStackChips techStack={achievement.techStack} />
                </TableCell>
                <TableCell>
                  <ActionsCell achievement={achievement} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          borderTop: (theme) =>
            theme.palette.mode === 'light'
              ? '1px solid rgba(203,213,225,0.8)'
              : '1px solid rgba(30,64,175,0.4)',
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'linear-gradient(90deg, rgba(248,250,252,0.98), rgba(241,245,249,0.95))'
              : 'linear-gradient(90deg, rgba(15,23,42,0.96), rgba(15,23,42,0.9))',
        }}
      >
        <TablePagination
          component="div"
          count={filteredAchievements.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{
            color: (theme) =>
              theme.palette.mode === 'light'
                ? 'rgb(71,85,105)'
                : 'rgb(148,163,184)',
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows':
              {
                fontSize: 12,
              },
            '.MuiTablePagination-actions button': {
              color: (theme) =>
                theme.palette.mode === 'light'
                  ? 'rgb(51,65,85)'
                  : 'rgb(226,232,240)',
            },
            '.MuiInputBase-root': {
              color: (theme) =>
                theme.palette.mode === 'light'
                  ? 'rgb(51,65,85)'
                  : 'rgb(226,232,240)',
            },
            '.MuiSvgIcon-root': {
              color: (theme) =>
                theme.palette.mode === 'light'
                  ? 'rgb(71,85,105)'
                  : 'rgb(148,163,184)',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default AchievementsTable;
