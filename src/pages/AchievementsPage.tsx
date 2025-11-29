import { UIButton } from '@/components/ui';
import { AchievementDialog, AchievementFilters, AchievementsTable, fetchAchievements, selectAchievementsLoading } from '@/features/achievements';
import { cn } from '@/utils/helpers';
import { Add } from '@mui/icons-material';
import { Box, CircularProgress, Container } from '@mui/material';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { useEffect, useState } from 'react';
import { Toaster } from 'sonner';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const AchievementsPage = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectAchievementsLoading);
  const [openDialog, setOpenDialog] = useState(false);

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
                'text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-display font-bold'
              )}
            >
              <span className="gradient-text">My Achievements</span>
            </h4>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <UIButton
              variant="primary"
              size="md"
              onClick={() => setOpenDialog(true)}
            >
              <Add className="w-4 h-4" />
              Add Achievement
            </UIButton>
          </Box>
        </Box>
        <AchievementFilters />
        <AchievementsTable />
        <AchievementDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        />
      </Container>
    </NuqsAdapter>
  );
};

export default AchievementsPage;
