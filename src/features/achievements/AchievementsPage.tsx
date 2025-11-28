
import { useEffect } from 'react';
import { Container, Box, Typography, CircularProgress } from '@mui/material';
import { Toaster } from 'sonner';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAchievements } from './achievements.thunks';
import { selectAchievementsLoading } from './achievements.selectors';
import AchievementsTable from './AchievementsTable';
import AchievementFilters from './AchievementFilters';

const AchievementsPage = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectAchievementsLoading);

    useEffect(() => {
        dispatch(fetchAchievements());
    }, [dispatch]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Toaster position="top-right" richColors />
            <Box mb={4}>
                <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                    Achievements Management
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage and track your professional achievements
                </Typography>
            </Box>
            <AchievementFilters />
            <AchievementsTable />
        </Container>
    );
};

export default AchievementsPage;