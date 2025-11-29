import { Add, Clear } from '@mui/icons-material';
import { Box, Button, Grid, MenuItem, Paper, TextField } from '@mui/material';
import { parseAsIsoDateTime, parseAsString, useQueryState } from 'nuqs';
import { useState } from 'react';
import {
  AchievementCategory,
  AchievementStatus,
} from '../../../data/achievements';
import AchievementDialog from './AchievementDialog';

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
  const [openDialog, setOpenDialog] = useState(false);

  const handleClearFilters = () => {
    setSearch('');
    setCategory('');
    setStatus('');
    setDateFrom(null);
    setDateTo(null);
  };

  return (
    <>
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          border: '1px solid rgba(148,163,184,0.35)',
          background:
            'linear-gradient(135deg, rgba(15,23,42,0.92), rgba(30,64,175,0.35))',
          boxShadow:
            '0 18px 45px rgba(15,23,42,0.95), 0 0 0 1px rgba(15,23,42,0.9)',
          // Override global Tailwind :focus-visible ring to avoid double focus border
          '& input:focus-visible': {
            outline: 'none',
            boxShadow: 'none !important',
          },
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              size="small"
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search achievements..."
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
            />
          </Grid>
          <Grid size={{ xs: 12, md: 1 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Clear />}
              onClick={handleClearFilters}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
          >
            Add Achievement
          </Button>
        </Box>
      </Paper>
      <AchievementDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </>
  );
};

export default AchievementFilters;
