import { useEffect } from 'react';
import { Container, Box, Typography, CircularProgress } from '@mui/material';
import { Toaster } from 'sonner';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAchievements } from './achievements.thunks';
import { selectAchievementsLoading } from './achievements.selectors';
import AchievementsTable from './AchievementsTable';
import AchievementFilters from './AchievementFilters';
import ThemeToggle from '../../components/ThemeToggle';

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
        <NuqsAdapter>
            <Container maxWidth="xl" sx={{ py: 4 }}>
                <Toaster position="top-right" richColors />
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                    <Box>
                        <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                            Achievements Management
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Manage and track your professional achievements
                        </Typography>
                    </Box>
                    <ThemeToggle />
                </Box>
                <AchievementFilters />
                <AchievementsTable />
            </Container>
        </NuqsAdapter>
    );
};

export default AchievementsPage;