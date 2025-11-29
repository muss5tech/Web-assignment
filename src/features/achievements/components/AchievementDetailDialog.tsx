import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  Box,
  Button as MuiButton,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  Achievement,
  AchievementCategory,
  AchievementStatus,
  TechStack,
} from '../../../data/achievements';
import { useAppDispatch } from '../../../store/hooks';
import {
  AchievementFormData,
  achievementSchema,
} from '../schema/achievement.schema';
import { updateAchievement } from '../achievements.thunks';
import { dialogStyles } from '../styles/achievementStyles';
import UIButton from '@/components/ui/UIButton';
import { CATEGORY_COLOR_MAP, STATUS_COLOR_MAP } from '../constants/achievement.constants';

interface AchievementDetailDialogProps {
  open: boolean;
  achievement: Achievement | null;
  onClose: () => void;
}

const AchievementDetailDialog = ({
  open,
  achievement,
  onClose,
}: AchievementDetailDialogProps) => {
  const dispatch = useAppDispatch();
  const [isEditMode, setIsEditMode] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AchievementFormData>({
    resolver: zodResolver(achievementSchema),
    defaultValues: {
      title: '',
      description: '',
      category: AchievementCategory.Technical,
      status: AchievementStatus.Completed,
      date: dayjs().format('YYYY-MM-DD'),
      impact: '',
      techStack: [],
    },
  });

  useEffect(() => {
    if (achievement) {
      reset({
        title: achievement.title,
        description: achievement.description,
        category: achievement.category,
        status: achievement.status,
        date: achievement.date,
        impact: achievement.impact,
        techStack: achievement.techStack || [],
      });
    }
  }, [achievement, reset]);

  const onSubmit = async (data: AchievementFormData) => {
    if (!achievement) return;

    try {
      await dispatch(
        updateAchievement({
          ...achievement,
          ...data,
        })
      ).unwrap();
      toast.success('Achievement updated successfully');
      setIsEditMode(false);
    } catch (error) {
      toast.error('Failed to update achievement');
    }
  };

  const handleClose = () => {
    setIsEditMode(false);
    onClose();
  };

  const handleEditToggle = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsEditMode(!isEditMode);
  };

  if (!achievement) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={dialogStyles.paper}
    >
      <DialogTitle sx={dialogStyles.title}>
        {isEditMode ? 'Edit Achievement' : 'Achievement Details'}
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {!isEditMode ? (
          <Box>
            <Box mb={3}>
              <Typography
                variant="caption"
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'rgb(71,85,105)'
                      : 'rgb(148,163,184)',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontWeight: 600,
                }}
              >
                Title
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mt: 0.5,
                  color: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'rgb(15,23,42)'
                      : 'rgb(226,232,240)',
                }}
              >
                {achievement.title}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box mb={3}>
              <Typography
                variant="caption"
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'rgb(71,85,105)'
                      : 'rgb(148,163,184)',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontWeight: 600,
                }}
              >
                Description
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 1,
                  lineHeight: 1.7,
                  color: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'rgb(51,65,85)'
                      : 'rgb(203,213,225)',
                }}
              >
                {achievement.description}
              </Typography>
            </Box>

            <Grid container spacing={2} mb={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgb(71,85,105)'
                        : 'rgb(148,163,184)',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    fontWeight: 600,
                  }}
                >
                  Category
                </Typography>
                <Box mt={1}>
                  <Chip
                    label={achievement.category}
                    color={CATEGORY_COLOR_MAP[achievement.category]}
                    size="small"
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgb(71,85,105)'
                        : 'rgb(148,163,184)',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    fontWeight: 600,
                  }}
                >
                  Status
                </Typography>
                <Box mt={1}>
                  <Chip
                    label={achievement.status}
                    color={STATUS_COLOR_MAP[achievement.status]}
                    size="small"
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgb(71,85,105)'
                        : 'rgb(148,163,184)',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    fontWeight: 600,
                  }}
                >
                  Date
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    color: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgb(51,65,85)'
                        : 'rgb(203,213,225)',
                  }}
                >
                  {dayjs(achievement.date).format('MMMM DD, YYYY')}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Box mb={3}>
              <Typography
                variant="caption"
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'rgb(71,85,105)'
                      : 'rgb(148,163,184)',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                  fontWeight: 600,
                }}
              >
                Impact
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mt: 1,
                  lineHeight: 1.7,
                  color: (theme) =>
                    theme.palette.mode === 'light'
                      ? 'rgb(51,65,85)'
                      : 'rgb(203,213,225)',
                }}
              >
                {achievement.impact}
              </Typography>
            </Box>

            {achievement.techStack && achievement.techStack.length > 0 && (
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgb(71,85,105)'
                        : 'rgb(148,163,184)',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                    fontWeight: 600,
                  }}
                >
                  Tech Stack
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                  {achievement.techStack.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        ) : (
          <form id="edit-achievement-form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid sx={{ pt: 2 }} size={{ xs: 12 }}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Title"
                      error={!!errors.title}
                      helperText={errors.title?.message}
                      placeholder="Enter achievement title"
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={4}
                      label="Description"
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      placeholder="Describe your achievement"
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      label="Category"
                      error={!!errors.category}
                      helperText={errors.category?.message}
                    >
                      {Object.values(AchievementCategory).map((cat) => (
                        <MenuItem key={cat} value={cat}>
                          {cat}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      select
                      label="Status"
                      error={!!errors.status}
                      helperText={errors.status?.message}
                    >
                      {Object.values(AchievementStatus).map((stat) => (
                        <MenuItem key={stat} value={stat}>
                          {stat}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="date"
                      label="Date"
                      error={!!errors.date}
                      helperText={errors.date?.message}
                      slotProps={{
                        inputLabel: { shrink: true },
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="techStack"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <FormControl fullWidth error={!!errors.techStack}>
                      <Autocomplete
                        multiple
                        options={Object.values(TechStack)}
                        value={value || []}
                        onChange={(_, newValue) => onChange(newValue)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Tech Stack"
                            placeholder="Select technologies"
                            error={!!errors.techStack}
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
                      {errors.techStack && (
                        <FormHelperText>
                          {errors.techStack.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  name="impact"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      multiline
                      rows={3}
                      label="Impact"
                      error={!!errors.impact}
                      helperText={errors.impact?.message}
                      placeholder="Describe the impact of this achievement"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </form>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1.5 }}>
        {!isEditMode ? (
          <>
            <MuiButton
              type="button"
              onClick={handleClose}
              sx={dialogStyles.cancelButton}
            >
              Close
            </MuiButton>
            <UIButton type="button" variant="primary" onClick={handleEditToggle}>
              Edit
            </UIButton>
          </>
        ) : (
          <>
            <MuiButton
              type="button"
              onClick={handleEditToggle}
              disabled={isSubmitting}
              sx={dialogStyles.cancelButton}
            >
              Cancel
            </MuiButton>
            <UIButton
              type="submit"
              form="edit-achievement-form"
              variant="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </UIButton>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AchievementDetailDialog;
