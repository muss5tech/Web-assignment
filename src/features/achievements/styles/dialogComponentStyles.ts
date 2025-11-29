import { SxProps, Theme } from '@mui/material';
import { getThemedValue } from './achievementStyles';

export const dialogHeaderContainer = {
  background: (theme: Theme) =>
    getThemedValue(
      theme,
      'linear-gradient(90deg, rgba(241,245,249,0.98), rgba(226,232,240,0.85))',
      'linear-gradient(90deg, rgba(15,23,42,0.95), rgba(30,64,175,0.55))'
    ),
  borderBottom: (theme: Theme) =>
    getThemedValue(
      theme,
      '1px solid rgba(203,213,225,0.8)',
      '1px solid rgba(148,163,184,0.4)'
    ),
  px: 3,
  py: 2.5,
} as const;

export const dialogHeaderIconBox = {
  width: 40,
  height: 40,
  borderRadius: 2,
  background: 'linear-gradient(135deg, rgba(59,130,246,0.9), rgba(37,99,235,0.9))',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
} as const;

export const dialogFooterContainer = {
  borderTop: (theme: Theme) =>
    getThemedValue(
      theme,
      '1px solid rgba(203,213,225,0.8)',
      '1px solid rgba(30,64,175,0.4)'
    ),
  background: (theme: Theme) =>
    getThemedValue(
      theme,
      'linear-gradient(90deg, rgba(248,250,252,0.98), rgba(241,245,249,0.95))',
      'linear-gradient(90deg, rgba(15,23,42,0.96), rgba(15,23,42,0.9))'
    ),
  px: 3,
  py: 2,
  display: 'flex',
  gap: 2,
  justifyContent: 'flex-end',
} as const;


const inputBackgroundColors = {
  light: 'rgba(255,255,255,0.9)',
  dark: 'rgba(15,23,42,0.8)',
} as const;

const inputBorderColors = {
  default: {
    light: 'rgba(203,213,225,0.6)',
    dark: 'rgba(148,163,184,0.3)',
  },
  hover: {
    light: 'rgba(59,130,246,0.5)',
    dark: 'rgba(59,130,246,0.6)',
  },
  focused: {
    light: 'rgba(59,130,246,0.8)',
    dark: 'rgba(59,130,246,0.9)',
  },
} as const;

export const baseTextFieldSx: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: (theme: Theme) =>
      getThemedValue(
        theme,
        inputBackgroundColors.light,
        inputBackgroundColors.dark
      ),
    '& fieldset': {
      borderColor: (theme: Theme) =>
        getThemedValue(
          theme,
          inputBorderColors.default.light,
          inputBorderColors.default.dark
        ),
    },
    '&:hover fieldset': {
      borderColor: (theme: Theme) =>
        getThemedValue(
          theme,
          inputBorderColors.hover.light,
          inputBorderColors.hover.dark
        ),
    },
    '&.Mui-focused fieldset': {
      borderColor: (theme: Theme) =>
        getThemedValue(
          theme,
          inputBorderColors.focused.light,
          inputBorderColors.focused.dark
        ),
      borderWidth: 1.5,
    },
  },
};

export const selectTextFieldSx: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: (theme: Theme) =>
      getThemedValue(
        theme,
        inputBackgroundColors.light,
        inputBackgroundColors.dark
      ),
    '& fieldset': {
      borderColor: (theme: Theme) =>
        getThemedValue(
          theme,
          inputBorderColors.default.light,
          inputBorderColors.default.dark
        ),
    },
  },
};

const chipBackgroundColors = {
  light: 'rgba(59,130,246,0.1)',
  dark: 'rgba(59,130,246,0.2)',
} as const;

const chipTextColors = {
  light: 'rgb(37,99,235)',
  dark: 'rgb(147,197,253)',
} as const;

const chipBorderColors = {
  light: 'rgba(59,130,246,0.3)',
  dark: 'rgba(59,130,246,0.4)',
} as const;

export const autocompleteTextFieldSx: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: (theme: Theme) =>
      getThemedValue(
        theme,
        inputBackgroundColors.light,
        inputBackgroundColors.dark
      ),
    '& fieldset': {
      borderColor: (theme: Theme) =>
        getThemedValue(
          theme,
          inputBorderColors.default.light,
          inputBorderColors.default.dark
        ),
    },
  },
};

export const autocompleteChipSx: SxProps<Theme> = {
  backgroundColor: (theme: Theme) =>
    getThemedValue(theme, chipBackgroundColors.light, chipBackgroundColors.dark),
  color: (theme: Theme) =>
    getThemedValue(theme, chipTextColors.light, chipTextColors.dark),
  borderColor: (theme: Theme) =>
    getThemedValue(theme, chipBorderColors.light, chipBorderColors.dark),
  fontWeight: 500,
  fontSize: 13,
};

export const dialogContentContainer = {
  px: 3,
  py: 3,
} as const;

export const viewModeLabelSx: SxProps<Theme> = {
  color: (theme: Theme) =>
    getThemedValue(theme, 'rgb(71,85,105)', 'rgb(148,163,184)'),
  textTransform: 'uppercase' as const,
  letterSpacing: 0.5,
  fontWeight: 600,
};

export const viewModeValueSx: SxProps<Theme> = {
  mt: 1,
  lineHeight: 1.7,
  color: (theme: Theme) =>
    getThemedValue(theme, 'rgb(51,65,85)', 'rgb(203,213,225)'),
};

export const viewModeSecondaryTextSx: SxProps<Theme> = {
  mt: 1,
  color: (theme: Theme) =>
    getThemedValue(theme, 'rgb(51,65,85)', 'rgb(203,213,225)'),
};
