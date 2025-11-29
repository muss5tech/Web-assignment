import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Button as MuiButton,
  TextField,
} from '@mui/material';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Button from '../../../components/ui/Button';
import {
  AchievementCategory,
  AchievementStatus,
  TechStack,
} from '../../../data/achievements';
import { useAppDispatch } from '../../../store/hooks';
import { createAchievement } from '../achievements.thunks';
import {
  AchievementFormData,
  achievementSchema,
} from '../schema/achievement.schema';

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
      sx={{
        borderRadius: 4,
        border: (theme) =>
          theme.palette.mode === 'light'
            ? '1px solid rgba(203,213,225,0.8)'
            : '1px solid rgba(148,163,184,0.4)',
        background: (theme) =>
          theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,0.95))'
            : 'radial-gradient(circle at top left, rgba(56,189,248,0.12), transparent 55%), rgba(15,23,42,0.98)',
        boxShadow: (theme) =>
          theme.palette.mode === 'light'
            ? '0 8px 32px rgba(148,163,184,0.2), 0 0 0 1px rgba(203,213,225,0.3)'
            : '0 24px 60px rgba(15,23,42,0.95), 0 0 0 1px rgba(15,23,42,0.9)',
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          letterSpacing: 0.4,
          fontSize: 20,
          color: (theme) =>
            theme.palette.mode === 'light'
              ? 'rgb(15,23,42)'
              : 'rgb(226,232,240)',
          pb: 1,
        }}
      >
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
            sx={{
              color: (theme) =>
                theme.palette.mode === 'light'
                  ? 'rgb(71,85,105)'
                  : 'rgb(148,163,184)',
              '&:hover': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'rgba(241,245,249,0.8)'
                    : 'rgba(30,41,59,0.8)',
              },
            }}
          >
            Cancel
          </MuiButton>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AchievementDialog;
