import { zodResolver } from '@hookform/resolvers/zod';
import { Add } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Chip,
  Dialog,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import UIButton from '../../../components/ui/UIButton';
import {
  AchievementCategory,
  AchievementStatus,
  TechStack,
} from '../../../data/achievements';
import { useAppDispatch } from '../../../store/hooks';
import { createAchievement } from '../achievements.thunks';
import { DIALOG_TITLE_TYPOGRAPHY } from '../constants';
import {
  AchievementFormData,
  achievementSchema,
} from '../schema/achievement.schema';
import { dialogStyles } from '../styles/achievementStyles';
import {
  autocompleteChipSx,
  autocompleteTextFieldSx,
  baseTextFieldSx,
  dialogContentContainer,
  dialogFooterContainer,
  dialogHeaderContainer,
  dialogHeaderIconBox,
  selectTextFieldSx
} from '../styles/dialogComponentStyles';
import FormFieldLabel from './FormFieldLabel';

interface AchievementDialogProps {
  open: boolean;
  onClose: () => void;
}

const AchievementDialog = ({ open, onClose }: AchievementDialogProps) => {
  const dispatch = useAppDispatch();

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

  const onSubmit = async (data: AchievementFormData) => {
    try {
      await dispatch(createAchievement(data)).unwrap();
      toast.success('Achievement created successfully');
      reset();
      onClose();
    } catch (error) {
      toast.error('Failed to create achievement');
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={dialogStyles.paper}
    >
      <Box sx={dialogHeaderContainer}>
        <Box display="flex" alignItems="center" gap={2}>
          <Box sx={dialogHeaderIconBox}>
            <Add className="w-4 h-4" />
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
            Add New Achievement
          </Typography>
        </Box>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={dialogContentContainer}>
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
                      placeholder="Enter a descriptive title..."
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
                      placeholder="Describe what you achieved and the context..."
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
                            placeholder="Select technologies..."
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
                        <FormHelperText>{errors.techStack.message}</FormHelperText>
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
                      placeholder="Describe the measurable impact and outcomes..."
                      sx={baseTextFieldSx}
                    />
                  )}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box sx={dialogFooterContainer}>
          <UIButton
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </UIButton>
          <UIButton type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Achievement'}
          </UIButton>
        </Box>
      </form>
    </Dialog>
  );
};

export default AchievementDialog;
