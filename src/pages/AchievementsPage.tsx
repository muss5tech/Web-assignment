import { cn } from '@/utils/helpers';
import { Box, CircularProgress, Container } from '@mui/material';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { selectAchievementsLoading } from '../features/achievements/achievements.selectors';
import { fetchAchievements } from '../features/achievements/achievements.thunks';
import AchievementFilters from '../features/achievements/components/AchievementFilters';
import AchievementsTable from '../features/achievements/components/AchievementsTable';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const AchievementsPage = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAchievementsLoading);

  useEffect(() => {
    dispatch(fetchAchievements());
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <NuqsAdapter>
      <Container
        maxWidth="xl"
        sx={{
          pt: { xs: 10, md: 12 },
          pb: 6,
        }}
      >
        <Toaster position="top-right" richColors />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <h4
              className={cn(
                'text-center text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-display font-bold mb-6'
              )}
            >
              <span className="gradient-text"> My Achievements</span>
            </h4>
          </Box>
        </Box>
        <AchievementFilters />
        <AchievementsTable />
      </Container>
    </NuqsAdapter>
  );
};

export default AchievementsPage;
