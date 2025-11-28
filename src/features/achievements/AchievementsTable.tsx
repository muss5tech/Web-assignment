import { useState } from 'react';
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
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectAllAchievements } from './achievements.selectors';
import { deleteAchievement } from './achievements.thunks';
import { Achievement, AchievementCategory, AchievementStatus } from '../../data/achievements';

const AchievementsTable = () => {
    const dispatch = useAppDispatch();
    const achievements = useAppSelector(selectAllAchievements);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDelete = async (id: string, title: string) => {
        try {
            await dispatch(deleteAchievement(id)).unwrap();
            toast.success(`Achievement "${title}" deleted successfully`);
        } catch (error) {
            toast.error('Failed to delete achievement');
        }
    };

    const getCategoryColor = (category: AchievementCategory) => {
        const colors: Record<AchievementCategory, 'primary' | 'secondary' | 'success' | 'warning' | 'info'> = {
            [AchievementCategory.Technical]: 'primary',
            [AchievementCategory.Project]: 'secondary',
            [AchievementCategory.Leadership]: 'warning',
            [AchievementCategory.Education]: 'info',
            [AchievementCategory.Community]: 'success',
        };
        return colors[category] || 'default';
    };

    const getStatusColor = (status: AchievementStatus) => {
        return status === AchievementStatus.Completed ? 'success' : 'warning';
    };

    const paginatedAchievements = achievements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (achievements.length === 0) {
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
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Impact</TableCell>
                            <TableCell>Tech Stack</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedAchievements.map((achievement: Achievement) => (
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
                                    <Chip label={achievement.category} color={getCategoryColor(achievement.category)} size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip label={achievement.status} color={getStatusColor(achievement.status)} size="small" />
                                </TableCell>
                                <TableCell>{dayjs(achievement.date).format('MMM DD, YYYY')}</TableCell>
                                <TableCell>
                                    <Typography variant="body2" sx={{ maxWidth: 250 }}>
                                        {achievement.impact}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" flexWrap="wrap" gap={0.5}>
                                        {achievement.techStack?.slice(0, 3).map((tech, index) => (
                                            <Chip key={index} label={tech} size="small" variant="outlined" />
                                        ))}
                                        {achievement.techStack && achievement.techStack.length > 3 && (
                                            <Chip label={`+${achievement.techStack.length - 3}`} size="small" variant="outlined" />
                                        )}
                                    </Box>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton size="small" color="primary">
                                        <Edit fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => handleDelete(achievement.id, achievement.title)}
                                    >
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={achievements.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default AchievementsTable;