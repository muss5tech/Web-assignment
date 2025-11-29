import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
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
import AchievementDetailDialog from './AchievementDetailDialog';
import AchievementRow from './AchievementRow';
import { tableStyles, typographyStyles } from '../styles/achievementStyles';

type EditableValue =
  | string
  | AchievementCategory
  | AchievementStatus
  | TechStack[];

interface EditingState {
  id: string;
  field: keyof Achievement;
  value: string | AchievementCategory | AchievementStatus | TechStack[];
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
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
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

  const handleRowClick = (achievement: Achievement) => {
    if (!editing) {
      setSelectedAchievement(achievement);
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

  const handleCloseDialog = () => {
    setSelectedAchievement(null);
  };

  const paginatedAchievements = filteredAchievements.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (!filteredAchievements.length) {
    return (
      <Box sx={tableStyles.emptyState}>
        <Typography variant="h6" sx={typographyStyles.emptyTitle}>
          No achievements found
        </Typography>
        <Typography variant="body2" sx={typographyStyles.emptySubtitle}>
          Try adjusting your filters or add a new achievement.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={tableStyles.container}>
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table
          size="small"
          sx={{
            minWidth: 800,
            '& thead tr': tableStyles.headerRow,
            '& thead th': tableStyles.headerCell,
            '& tbody tr': {
              '&:nth-of-type(odd)': tableStyles.rowOdd,
              '&:nth-of-type(even)': tableStyles.rowEven,
              '&:hover': tableStyles.rowHover,
            },
            '& tbody td': tableStyles.bodyCell,
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
                onRowClick={handleRowClick}
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

      <Box sx={tableStyles.paginationContainer}>
        <TablePagination
          component="div"
          count={filteredAchievements.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          sx={tableStyles.pagination}
        />
      </Box>

      <AchievementDetailDialog
        open={!!selectedAchievement}
        achievement={selectedAchievement}
        onClose={handleCloseDialog}
      />
    </Box>
  );
};

export default AchievementsTable;