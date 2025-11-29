import { Clear } from '@mui/icons-material';
import {
  Box,
  Grid,
  MenuItem,
  Paper,
  SxProps,
  TextField,
  Theme,
} from '@mui/material';

import UIButton from '@/components/ui/UIButton';
import { parseAsIsoDateTime, parseAsString, useQueryState } from 'nuqs';
import {
  AchievementCategory,
  AchievementStatus,
} from '../../../data/achievements';
import { paperStyles } from '../styles/achievementStyles';

const fieldSx: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    color: 'rgb(226,232,240)',
    borderRadius: '0.5rem',
    '& fieldset': {
      borderColor: 'rgba(99,102,241,0.5)',
      borderRadius: '0.5rem',
    },
    '&:hover fieldset': {
      borderColor: 'rgb(129,140,248)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgb(129,140,248)',
      boxShadow: '0 0 0 1px rgba(99,102,241,0.7)',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(148,163,184,0.9)',
    '&.Mui-focused': {
      color: 'rgb(129,140,248)',
    },
  },
  '& .MuiSelect-icon': {
    color: 'rgb(129,140,248)',
  },
};

const AchievementFilters = () => {
  const [search, setSearch] = useQueryState(
    'search',
    parseAsString.withDefault('')
  );
  const [category, setCategory] = useQueryState(
    'category',
    parseAsString.withDefault('')
  );
  const [status, setStatus] = useQueryState(
    'status',
    parseAsString.withDefault('')
  );
  const [dateFrom, setDateFrom] = useQueryState('dateFrom', parseAsIsoDateTime);
  const [dateTo, setDateTo] = useQueryState('dateTo', parseAsIsoDateTime);

  const handleClearFilters = () => {
    setSearch('');
    setCategory('');
    setStatus('');
    setDateFrom(null);
    setDateTo(null);
  };

  return (
    <>
      <Paper sx={paperStyles.container}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              size="small"
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search achievements..."
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              fullWidth
              size="small"
              select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={fieldSx}
            >
              <MenuItem value="">All Categories</MenuItem>
              {Object.values(AchievementCategory).map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              fullWidth
              size="small"
              select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={fieldSx}
            >
              <MenuItem value="">All Status</MenuItem>
              {Object.values(AchievementStatus).map((stat) => (
                <MenuItem key={stat} value={stat}>
                  {stat}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Date From"
              value={dateFrom ? dateFrom.toISOString().split('T')[0] : ''}
              onChange={(e) =>
                setDateFrom(e.target.value ? new Date(e.target.value) : null)
              }
              slotProps={{
                inputLabel: { shrink: true },
              }}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Date To"
              value={dateTo ? dateTo.toISOString().split('T')[0] : ''}
              onChange={(e) =>
                setDateTo(e.target.value ? new Date(e.target.value) : null)
              }
              slotProps={{
                inputLabel: { shrink: true },
              }}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 1 }} />
        </Grid>
        <Box
          mt={2}
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={{ xs: 1.5, sm: 2 }}
        >
          <UIButton
            variant="outline"
            onClick={handleClearFilters}
            className="w-full sm:w-auto"
          >
            <Clear />
            Clear
          </UIButton>

          <UIButton
            variant="primary"
            onClick={() => { }}
            className="w-full sm:w-auto"
          >
            Search
          </UIButton>
        </Box>
      </Paper>
    </>
  );
};

export default AchievementFilters;
