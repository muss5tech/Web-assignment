import { zodResolver } from '@hookform/resolvers/zod';
import { Edit } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Chip,
  Dialog,
  DialogContent,
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
import { CATEGORY_COLOR_MAP, DIALOG_TITLE_TYPOGRAPHY, STATUS_COLOR_MAP } from '../constants';
import { dialogStyles } from '../styles/achievementStyles';
import {
  autocompleteChipSx,
  autocompleteTextFieldSx,
  baseTextFieldSx,
  dialogContentContainer,
  dialogFooterContainer,
  dialogHeaderContainer,
  dialogHeaderIconBox,
  selectTextFieldSx,
  viewModeLabelSx,
  viewModeValueSx,
} from '../styles/dialogComponentStyles';
import UIButton from '@/components/ui/UIButton';
import FormFieldLabel from './FormFieldLabel';

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
    >
      <Box sx={dialogHeaderContainer}>
        <Box display="flex" alignItems="center" gap={2}>
          <Box sx={dialogHeaderIconBox}>
            <Edit className="w-5 h-5" style={{ color: 'white' }} />
          </Box>
          <Typography
            sx={{
              ...DIALOG_TITLE_TYPOGRAPHY,
              color: (theme) =>
                theme.palette.mode === 'light'
                  ? 'rgb(15,23,42)'
                  : 'rgb(226,232,240)',
            }}
          >
            {isEditMode ? 'Edit Achievement' : 'Achievement Details'}
          </Typography>
        </Box>
      </Box>

      <DialogContent sx={dialogContentContainer}>
        {!isEditMode ? (
          <Box>
            <Box mb={3}>
              <Typography variant="caption" sx={viewModeLabelSx}>
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
              <Typography variant="caption" sx={viewModeLabelSx}>
                Description
              </Typography>
              <Typography variant="body1" sx={viewModeValueSx}>
                {achievement.description}
              </Typography>
            </Box>

            <Grid container spacing={2} mb={3}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="caption" sx={viewModeLabelSx}>
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
                <Typography variant="caption" sx={viewModeLabelSx}>
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
                <Typography variant="caption" sx={viewModeLabelSx}>
                  Date
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, ...viewModeValueSx }}>
                  {dayjs(achievement.date).format('MMMM DD, YYYY')}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Box mb={3}>
              <Typography variant="caption" sx={viewModeLabelSx}>
                Impact
              </Typography>
              <Typography variant="body1" sx={viewModeValueSx}>
                {achievement.impact}
              </Typography>
            </Box>

            {achievement.techStack && achievement.techStack.length > 0 && (
              <Box>
                <Typography variant="caption" sx={viewModeLabelSx}>
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
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 12 }}>
                <Box>
                  <FormFieldLabel>Achievement Title</FormFieldLabel>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        size="small"
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        placeholder="Enter achievement title"
                        sx={baseTextFieldSx}
                      />
                    )}
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Box>
                  <FormFieldLabel>Description</FormFieldLabel>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        rows={4}
                        size="small"
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        placeholder="Describe your achievement"
                        sx={baseTextFieldSx}
                      />
                    )}
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Box>
                  <FormFieldLabel>Category</FormFieldLabel>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        select
                        size="small"
                        error={!!errors.category}
                        helperText={errors.category?.message}
                        sx={selectTextFieldSx}
                      >
                        {Object.values(AchievementCategory).map((cat) => (
                          <MenuItem key={cat} value={cat}>
                            {cat}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Box>
                  <FormFieldLabel>Status</FormFieldLabel>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        select
                        size="small"
                        error={!!errors.status}
                        helperText={errors.status?.message}
                        sx={selectTextFieldSx}
                      >
                        {Object.values(AchievementStatus).map((stat) => (
                          <MenuItem key={stat} value={stat}>
                            {stat}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Box>
                  <FormFieldLabel>Date</FormFieldLabel>
                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type="date"
                        size="small"
                        error={!!errors.date}
                        helperText={errors.date?.message}
                        slotProps={{
                          inputLabel: { shrink: true },
                        }}
                        sx={selectTextFieldSx}
                      />
                    )}
                  />
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Box>
                  <FormFieldLabel>Tech Stack</FormFieldLabel>
                  <Controller
                    name="techStack"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControl fullWidth error={!!errors.techStack} size="small">
                        <Autocomplete
                          multiple
                          size="small"
                          options={Object.values(TechStack)}
                          value={value || []}
                          onChange={(_, newValue) => onChange(newValue)}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select technologies"
                              error={!!errors.techStack}
                              size="small"
                              sx={autocompleteTextFieldSx}
                            />
                          )}
                          renderValue={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip
                                {...getTagProps({ index })}
                                key={option}
                                label={option}
                                size="small"
                                sx={autocompleteChipSx}
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
                </Box>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Box>
                  <FormFieldLabel>Impact</FormFieldLabel>
                  <Controller
                    name="impact"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        rows={3}
                        size="small"
                        error={!!errors.impact}
                        helperText={errors.impact?.message}
                        placeholder="Describe the impact of this achievement"
                        sx={baseTextFieldSx}
                      />
                    )}
                  />
                </Box>
              </Grid>
            </Grid>
          </form>
        )}
      </DialogContent>

      <Box sx={dialogFooterContainer}>
        {!isEditMode ? (
          <>
            <UIButton
              type="button"
              variant="outline"
              onClick={handleClose}
            >
              Close
            </UIButton>
            <UIButton type="button" variant="primary" onClick={handleEditToggle}>
              Edit
            </UIButton>
          </>
        ) : (
          <>
            <UIButton
              type="button"
              variant="outline"
              onClick={handleEditToggle}
              disabled={isSubmitting}
            >
              Cancel
            </UIButton>
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
      </Box>
    </Dialog>
  );
};

export default AchievementDetailDialog;
