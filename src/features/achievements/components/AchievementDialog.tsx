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
import {
  AchievementFormData,
  achievementSchema,
} from '../schema/achievement.schema';
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
      <Box
        sx={{
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'linear-gradient(90deg, rgba(241,245,249,0.98), rgba(226,232,240,0.85))'
              : 'linear-gradient(90deg, rgba(15,23,42,0.95), rgba(30,64,175,0.55))',
          borderBottom: (theme) =>
            theme.palette.mode === 'light'
              ? '1px solid rgba(203,213,225,0.8)'
              : '1px solid rgba(148,163,184,0.4)',
          px: 3,
          py: 2.5,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: 'linear-gradient(135deg, rgba(59,130,246,0.9), rgba(37,99,235,0.9))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
            }}
          >
            <Add className="w-4 h-4" />
          </Box>
          <Typography
            sx={{
              fontWeight: 700,
              letterSpacing: 0.4,
              fontSize: 20,
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

      {/* Form Content */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ px: 3, py: 3 }}>
          <Grid container spacing={2.5}>
            {/* Title Field */}
            <Grid size={{ xs: 12 }}>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgb(30,41,59)'
                        : 'rgb(219,234,254)',
                    fontWeight: 600,
                    fontSize: 12,
                    textTransform: 'uppercase',
                    letterSpacing: 0.8,
                    mb: 1,
                    display: 'block',
                  }}
                >
                  Achievement Title
                </Typography>
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
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                              ? 'rgba(255,255,255,0.9)'
                              : 'rgba(15,23,42,0.8)',
                          '& fieldset': {
                            borderColor: (theme) =>
                              theme.palette.mode === 'light'
                                ? 'rgba(203,213,225,0.6)'
                                : 'rgba(148,163,184,0.3)',
                          },
                          '&:hover fieldset': {
                            borderColor: (theme) =>
                              theme.palette.mode === 'light'
                                ? 'rgba(59,130,246,0.5)'
                                : 'rgba(59,130,246,0.6)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: (theme) =>
                              theme.palette.mode === 'light'
                                ? 'rgba(59,130,246,0.8)'
                                : 'rgba(59,130,246,0.9)',
                            borderWidth: 1.5,
                          },
                        },
                      }}
                    />
                  )}
                />
              </Box>
            </Grid>

            {/* Description Field */}
            <Grid size={{ xs: 12 }}>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgb(30,41,59)'
                        : 'rgb(219,234,254)',
                    fontWeight: 600,
                    fontSize: 12,
                    textTransform: 'uppercase',
                    letterSpacing: 0.8,
                    mb: 1,
                    display: 'block',
                  }}
                >
                  Description
                </Typography>
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
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                              ? 'rgba(255,255,255,0.9)'
                              : 'rgba(15,23,42,0.8)',
                          '& fieldset': {
                            borderColor: (theme) =>
                              theme.palette.mode === 'light'
                                ? 'rgba(203,213,225,0.6)'
                                : 'rgba(148,163,184,0.3)',
                          },
                          '&:hover fieldset': {
                            borderColor: (theme) =>
                              theme.palette.mode === 'light'
                                ? 'rgba(59,130,246,0.5)'
                                : 'rgba(59,130,246,0.6)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: (theme) =>
                              theme.palette.mode === 'light'
                                ? 'rgba(59,130,246,0.8)'
                                : 'rgba(59,130,246,0.9)',
                            borderWidth: 1.5,
                          },
                        },
                      }}
                    />
                  )}
                />
              </Box>
            </Grid>

            {/* Category and Status Row */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgb(30,41,59)'
                        : 'rgb(219,234,254)',
                    fontWeight: 600,
                    fontSize: 12,
                    textTransform: 'uppercase',
                    letterSpacing: 0.8,
                    mb: 1,
                    display: 'block',
                  }}
                >
                  Category
                </Typography>
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
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                              ? 'rgba(255,255,255,0.9)'
                              : 'rgba(15,23,42,0.8)',
                          '& fieldset': {
                            borderColor: (theme) =>
                              theme.palette.mode === 'light'
                                ? 'rgba(203,213,225,0.6)'
                                : 'rgba(148,163,184,0.3)',
                          },
                        },
                      }}
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
                <Typography
                  variant="caption"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgb(30,41,59)'
                        : 'rgb(219,234,254)',
                    fontWeight: 600,
                    fontSize: 12,
                    textTransform: 'uppercase',
                    letterSpacing: 0.8,
                    mb: 1,
                    display: 'block',
                  }}
                >
                  Status
                </Typography>
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
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                              ? 'rgba(255,255,255,0.9)'
                              : 'rgba(15,23,42,0.8)',
                          '& fieldset': {
                            borderColor: (theme) =>
                              theme.palette.mode === 'light'
                                ? 'rgba(203,213,225,0.6)'
                                : 'rgba(148,163,184,0.3)',
                          },
                        },
                      }}
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

            {/* Date and Tech Stack Row */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgb(30,41,59)'
                        : 'rgb(219,234,254)',
                    fontWeight: 600,
                    fontSize: 12,
                    textTransform: 'uppercase',
                    letterSpacing: 0.8,
                    mb: 1,
                    display: 'block',
                  }}
                >
                  Date
                </Typography>
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
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                              ? 'rgba(255,255,255,0.9)'
                              : 'rgba(15,23,42,0.8)',
                          '& fieldset': {
                            borderColor: (theme) =>
                              theme.palette.mode === 'light'
                                ? 'rgba(203,213,225,0.6)'
                                : 'rgba(148,163,184,0.3)',
                          },
                        },
                      }}
                    />
                  )}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgb(30,41,59)'
                        : 'rgb(219,234,254)',
                    fontWeight: 600,
                    fontSize: 12,
                    textTransform: 'uppercase',
                    letterSpacing: 0.8,
                    mb: 1,
                    display: 'block',
                  }}
                >
                  Tech Stack
                </Typography>
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
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: (theme) =>
                                  theme.palette.mode === 'light'
                                    ? 'rgba(255,255,255,0.9)'
                                    : 'rgba(15,23,42,0.8)',
                                '& fieldset': {
                                  borderColor: (theme) =>
                                    theme.palette.mode === 'light'
                                      ? 'rgba(203,213,225,0.6)'
                                      : 'rgba(148,163,184,0.3)',
                                },
                              },
                            }}
                          />
                        )}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              {...getTagProps({ index })}
                              key={option}
                              label={option}
                              size="small"
                              sx={{
                                backgroundColor: (theme) =>
                                  theme.palette.mode === 'light'
                                    ? 'rgba(59,130,246,0.15)'
                                    : 'rgba(59,130,246,0.25)',
                                color: (theme) =>
                                  theme.palette.mode === 'light'
                                    ? 'rgb(30,58,138)'
                                    : 'rgb(191,219,254)',
                                border: (theme) =>
                                  theme.palette.mode === 'light'
                                    ? '1px solid rgba(59,130,246,0.3)'
                                    : '1px solid rgba(59,130,246,0.4)',
                              }}
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

            {/* Impact Field */}
            <Grid size={{ xs: 12 }}>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: (theme) =>
                      theme.palette.mode === 'light'
                        ? 'rgb(30,41,59)'
                        : 'rgb(219,234,254)',
                    fontWeight: 600,
                    fontSize: 12,
                    textTransform: 'uppercase',
                    letterSpacing: 0.8,
                    mb: 1,
                    display: 'block',
                  }}
                >
                  Impact
                </Typography>
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
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                              ? 'rgba(255,255,255,0.9)'
                              : 'rgba(15,23,42,0.8)',
                          '& fieldset': {
                            borderColor: (theme) =>
                              theme.palette.mode === 'light'
                                ? 'rgba(203,213,225,0.6)'
                                : 'rgba(148,163,184,0.3)',
                          },
                          '&:hover fieldset': {
                            borderColor: (theme) =>
                              theme.palette.mode === 'light'
                                ? 'rgba(59,130,246,0.5)'
                                : 'rgba(59,130,246,0.6)',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: (theme) =>
                              theme.palette.mode === 'light'
                                ? 'rgba(59,130,246,0.8)'
                                : 'rgba(59,130,246,0.9)',
                            borderWidth: 1.5,
                          },
                        },
                      }}
                    />
                  )}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Footer Actions with Gradient */}
        <Box
          sx={{
            borderTop: (theme) =>
              theme.palette.mode === 'light'
                ? '1px solid rgba(203,213,225,0.8)'
                : '1px solid rgba(30,64,175,0.4)',
            background: (theme) =>
              theme.palette.mode === 'light'
                ? 'linear-gradient(90deg, rgba(248,250,252,0.98), rgba(241,245,249,0.95))'
                : 'linear-gradient(90deg, rgba(15,23,42,0.96), rgba(15,23,42,0.9))',
            px: 3,
            py: 2,
            display: 'flex',
            gap: 2,
            justifyContent: 'flex-end',
          }}
        >
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
