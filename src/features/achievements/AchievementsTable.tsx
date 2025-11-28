import { useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
    Chip,
    IconButton,
    Box,
    Typography,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import { useQueryState, parseAsInteger, parseAsString, parseAsIsoDateTime } from 'nuqs';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectAllAchievements } from './achievements.selectors';
import { deleteAchievement } from './achievements.thunks';
import { AchievementCategory, AchievementStatus } from '../../data/achievements';

const categoryColorMap: Record<AchievementCategory, 'primary' | 'secondary' | 'success' | 'warning' | 'info'> = {
    [AchievementCategory.Technical]: 'primary',
    [AchievementCategory.Project]: 'secondary',
    [AchievementCategory.Leadership]: 'warning',
    [AchievementCategory.Education]: 'info',
    [AchievementCategory.Community]: 'success',
};

const getCategoryColor = (category: AchievementCategory) => categoryColorMap[category] ?? 'default';
const getStatusColor = (status: AchievementStatus) => (status === AchievementStatus.Completed ? 'success' : 'warning');

const CategoryChip = ({ category }: { category: AchievementCategory }) => (
    <Chip label={category} color={getCategoryColor(category)} size="small" />
);

const StatusChip = ({ status }: { status: AchievementStatus }) => (
    <Chip label={status} color={getStatusColor(status)} size="small" />
);

const TechStackChips = ({ techStack }: { techStack?: string[] }) => {
    if (!techStack?.length) return null;
    const visible = techStack.slice(0, 3);
    const remaining = techStack.length - visible.length;

    return (
        <Box display="flex" flexWrap="wrap" gap={0.5}>
            {visible.map((tech, idx) => (
                <Chip key={idx} label={tech} size="small" variant="outlined" />
            ))}
            {remaining > 0 && <Chip label={`+${remaining}`} size="small" variant="outlined" />}
        </Box>
    );
};

const ActionsCell = ({ id, title, onDelete }: { id: string; title: string; onDelete: (id: string, title: string) => void }) => (
    <Box display="flex" justifyContent="flex-end" gap={0.5}>
        <IconButton size="small" color="primary">
            <Edit fontSize="small" />
        </IconButton>
        <IconButton size="small" color="error" onClick={() => onDelete(id, title)}>
            <Delete fontSize="small" />
        </IconButton>
    </Box>
);

const AchievementsTable = () => {
    const dispatch = useAppDispatch();
    const achievements = useAppSelector(selectAllAchievements);

    const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(0));
    const [rowsPerPage, setRowsPerPage] = useQueryState('rowsPerPage', parseAsInteger.withDefault(10));
    const [search] = useQueryState('search', parseAsString.withDefault(''));
    const [category] = useQueryState('category', parseAsString.withDefault(''));
    const [status] = useQueryState('status', parseAsString.withDefault(''));
    const [dateFrom] = useQueryState('dateFrom', parseAsIsoDateTime.withDefault(new Date()));
    const [dateTo] = useQueryState('dateTo', parseAsIsoDateTime.withDefault(new Date()));

    const filteredAchievements = useMemo(() => {
        return achievements.filter((a) => {
            const titleMatch = a.title.toLowerCase().includes(search.toLowerCase());
            const descMatch = a.description.toLowerCase().includes(search.toLowerCase());
            const matchesSearch = !search || titleMatch || descMatch;
            const matchesCategory = !category || a.category === category;
            const matchesStatus = !status || a.status === status;
            const achievementDate = new Date(a.date);
            const matchesDateFrom = !dateFrom || achievementDate >= dateFrom;
            const matchesDateTo = !dateTo || achievementDate <= dateTo;

            return matchesSearch && matchesCategory && matchesStatus && matchesDateFrom && matchesDateTo;
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

    const paginatedAchievements = filteredAchievements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (!filteredAchievements.length) {
        return (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    No achievements found
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {['Title', 'Description', 'Category', 'Status', 'Date', 'Impact', 'Tech Stack', 'Actions'].map((header) => (
                                <TableCell key={header} align={header === 'Actions' ? 'right' : 'left'}>
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>
                        {paginatedAchievements.map((achievement) => (
                            <TableRow key={achievement.id} hover>
                                <TableCell>
                                    <Typography variant="body2" fontWeight="medium">
                                        {achievement.title}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="body2" sx={{ maxWidth: 300 }}>
                                        {achievement.description}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <CategoryChip category={achievement.category} />
                                </TableCell>
                                <TableCell>
                                    <StatusChip status={achievement.status} />
                                </TableCell>
                                <TableCell>{dayjs(achievement.date).format('MMM DD, YYYY')}</TableCell>
                                <TableCell>
                                    <Typography variant="body2" sx={{ maxWidth: 250 }}>
                                        {achievement.impact}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <TechStackChips techStack={achievement.techStack} />
                                </TableCell>
                                <TableCell>
                                    <ActionsCell id={achievement.id} title={achievement.title} onDelete={handleDelete} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={filteredAchievements.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Paper>
    );
};

export default AchievementsTable;
