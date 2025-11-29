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
import { useState } from 'react';
import {
  AchievementCategory,
  AchievementStatus,
} from '../../../data/achievements';
import { SEARCH_PLACEHOLDER } from '../constants';
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
  const [searchParam, setSearchParam] = useQueryState(
    'search',
    parseAsString.withDefault('')
  );
  const [categoryParam, setCategoryParam] = useQueryState(
    'category',
    parseAsString.withDefault('')
  );
  const [statusParam, setStatusParam] = useQueryState(
    'status',
    parseAsString.withDefault('')
  );
  const [dateFromParam, setDateFromParam] = useQueryState('dateFrom', parseAsIsoDateTime);
  const [dateToParam, setDateToParam] = useQueryState('dateTo', parseAsIsoDateTime);

  const [localSearch, setLocalSearch] = useState(searchParam);
  const [localCategory, setLocalCategory] = useState(categoryParam);
  const [localStatus, setLocalStatus] = useState(statusParam);
  const [localDateFrom, setLocalDateFrom] = useState(dateFromParam);
  const [localDateTo, setLocalDateTo] = useState(dateToParam);

  const handleSearch = () => {
    setSearchParam(localSearch);
    setCategoryParam(localCategory);
    setStatusParam(localStatus);
    setDateFromParam(localDateFrom);
    setDateToParam(localDateTo);
  };

  const handleClearFilters = () => {
    setLocalSearch('');
    setLocalCategory('');
    setLocalStatus('');
    setLocalDateFrom(null);
    setLocalDateTo(null);
    setSearchParam('');
    setCategoryParam('');
    setStatusParam('');
    setDateFromParam(null);
    setDateToParam(null);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyUp={handleSearchKeyPress}
              placeholder={SEARCH_PLACEHOLDER}
              sx={fieldSx}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <TextField
              fullWidth
              size="small"
              select
              label="Category"
              value={localCategory}
              onChange={(e) => setLocalCategory(e.target.value)}
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
              value={localStatus}
              onChange={(e) => setLocalStatus(e.target.value)}
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
              value={localDateFrom ? localDateFrom.toISOString().split('T')[0] : ''}
              onChange={(e) =>
                setLocalDateFrom(e.target.value ? new Date(e.target.value) : null)
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
              value={localDateTo ? localDateTo.toISOString().split('T')[0] : ''}
              onChange={(e) =>
                setLocalDateTo(e.target.value ? new Date(e.target.value) : null)
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
            onClick={handleSearch}
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
