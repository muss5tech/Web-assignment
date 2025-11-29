import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  Button as MuiButton,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  AchievementCategory,
  AchievementStatus,
  TechStack,
} from '../../../data/achievements';
import UIButton from '../../../components/ui/UIButton';
import { useAppDispatch } from '../../../store/hooks';
import {
  AchievementFormData,
  achievementSchema,
} from '../schema/achievement.schema';
import { createAchievement } from '../achievements.thunks';
import { dialogStyles } from '../styles/achievementStyles';

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
      <DialogTitle sx={dialogStyles.title}>
        Add New Achievement
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ pt: 1 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
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
                      renderValue={(value, getTagProps) =>
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
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, pt: 1.5 }}>
          <MuiButton
            onClick={handleClose}
            disabled={isSubmitting}
            sx={dialogStyles.cancelButton}
          >
            Cancel
          </MuiButton>
          <UIButton type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create'}
          </UIButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AchievementDialog;
