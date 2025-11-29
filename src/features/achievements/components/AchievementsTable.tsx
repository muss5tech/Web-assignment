import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
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
import AchievementRow from './AchievementRow';

type EditableValue =
  | string
  | AchievementCategory
  | AchievementStatus
  | TechStack[];

interface EditingState {
  id: string;
  field: keyof Achievement;
  value: EditableValue;
}

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
    value: EditableValue | undefined
  ) => {
    setEditing({ id, field, value: (value ?? '') as EditableValue });
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
          border: '1px solid rgba(255,255,255,0.06)',
          background:
            'linear-gradient(135deg, rgba(15,23,42,0.85), rgba(30,64,175,0.35))',
          boxShadow: '0 18px 45px rgba(15,23,42,0.8)',
          color: 'rgba(226,232,240,0.9)',
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, letterSpacing: 0.3, mb: 0.5 }}
        >
          No achievements found
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(148,163,184,0.9)' }}>
          Try adjusting your filters or add a new achievement.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        borderRadius: 3,
        border: '1px solid rgba(148,163,184,0.35)',
        background:
          'linear-gradient(135deg, rgba(15,23,42,0.92), rgba(30,64,175,0.35))',
        boxShadow:
          '0 22px 60px rgba(15,23,42,0.95), 0 0 0 1px rgba(15,23,42,0.9)',
        overflow: 'hidden',
      }}
    >
      <TableContainer>
        <Table
          size="small"
          sx={{
            '& thead tr': {
              background:
                'linear-gradient(135deg, rgba(15,23,42,0.92), rgba(30,64,175,0.35))',
            },
            '& thead th': {
              color: 'rgb(219,234,254)',
              fontWeight: 600,
              fontSize: 13,
              textTransform: 'uppercase',
              letterSpacing: 0.13,
              borderBottom: '1px solid rgba(148,163,184,0.4)',
              paddingY: 1.5,
            },
            '& tbody tr': {
              '&:nth-of-type(odd)': {
                backgroundColor: 'rgba(15,23,42,0.9)',
              },
              '&:nth-of-type(even)': {
                backgroundColor: 'rgba(15,23,42,0.85)',
              },
              '&:hover': {
                backgroundColor: 'rgba(30,64,175,0.35)',
              },
            },
            '& tbody td': {
              borderBottom: '1px solid rgba(30,64,175,0.35)',
              color: 'rgb(226,232,240)',
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
              <AchievementRow
                key={achievement.id}
                achievement={achievement}
                editing={editing}
                onStartEdit={handleEditClick}
                onChangeEditingValue={(value) =>
                  editing && setEditing({ ...editing, value })
                }
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
                onDelete={handleDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          borderTop: '1px solid rgba(30,64,175,0.4)',
          background:
            'linear-gradient(90deg, rgba(15,23,42,0.96), rgba(15,23,42,0.9))',
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
            color: 'rgb(148,163,184)',
            '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows':
              {
                fontSize: 12,
              },
            '.MuiTablePagination-actions button': {
              color: 'rgb(226,232,240)',
            },
            '.MuiInputBase-root': {
              color: 'rgb(226,232,240)',
            },
            '.MuiSvgIcon-root': {
              color: 'rgb(148,163,184)',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default AchievementsTable;
