import { Theme } from '@mui/material';

const colorPalette = {
  light: {
    slate: {
      50: 'rgb(248,250,252)',
      100: 'rgb(241,245,249)',
      200: 'rgb(226,232,240)',
      300: 'rgb(203,213,225)',
      400: 'rgb(148,163,184)',
      500: 'rgb(100,116,139)',
      600: 'rgb(71,85,105)',
      700: 'rgb(51,65,85)',
      800: 'rgb(30,41,59)',
      900: 'rgb(15,23,42)',
    },
  },
  dark: {
    slate: {
      900: 'rgb(15,23,42)',
      800: 'rgb(30,41,59)',
      700: 'rgb(51,65,85)',
      600: 'rgb(71,85,105)',
      500: 'rgb(100,116,139)',
      400: 'rgb(148,163,184)',
      300: 'rgb(203,213,225)',
      200: 'rgb(226,232,240)',
      100: 'rgb(241,245,249)',
    },
    blue: {
      400: 'rgb(96,165,250)',
      500: 'rgb(59,130,246)',
      600: 'rgb(37,99,235)',
      700: 'rgb(30,64,175)',
    },
    sky: {
      400: 'rgb(56,189,248)',
    },
  },
} as const;

const borderColors = {
  light: {
    default: 'rgba(203,213,225,0.8)',
    subtle: 'rgba(226,232,240,0.9)',
    divider: 'rgba(203,213,225,0.5)',
  },
  dark: {
    default: 'rgba(148,163,184,0.4)',
    subtle: 'rgba(148,163,184,0.35)',
    divider: 'rgba(30,64,175,0.35)',
    accent: 'rgba(30,64,175,0.4)',
  },
} as const;

export const borders = {
  light: {
    default: `1px solid ${borderColors.light.default}`,
    subtle: `1px solid ${borderColors.light.subtle}`,
  },
  dark: {
    default: `1px solid ${borderColors.dark.default}`,
    subtle: `1px solid ${borderColors.dark.subtle}`,
  },
} as const;

const gradients = {
  light: {
    container: {
      primary: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,0.95))',
      card: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))',
    },
    header: {
      default: 'linear-gradient(90deg, rgba(241,245,249,0.98), rgba(226,232,240,0.85))',
      footer: 'linear-gradient(90deg, rgba(248,250,252,0.98), rgba(241,245,249,0.95))',
    },
  },
  dark: {
    container: {
      primary: 'linear-gradient(135deg, rgba(15,23,42,0.92), rgba(30,64,175,0.35))',
      table: 'linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,64,175,0.45))',
    },
    dialog: {
      radial: 'radial-gradient(circle at top left, rgba(56,189,248,0.12), transparent 55%), rgba(15,23,42,0.98)',
    },
    header: {
      default: 'linear-gradient(90deg, rgba(15,23,42,0.95), rgba(30,64,175,0.55))',
      footer: 'linear-gradient(90deg, rgba(15,23,42,0.96), rgba(15,23,42,0.9))',
    },
  },
} as const;

export const backgrounds = {
  light: {
    container: gradients.light.container.primary,
    card: gradients.light.container.card,
  },
  dark: {
    container: gradients.dark.container.primary,
    dialog: gradients.dark.dialog.radial,
    table: gradients.dark.container.table,
  },
} as const;

const shadowValues = {
  light: {
    blur: {
      sm: 'rgba(148,163,184,0.15)',
      md: 'rgba(148,163,184,0.2)',
    },
    ring: 'rgba(203,213,225,0.3)',
  },
  dark: {
    blur: 'rgba(15,23,42,0.95)',
    ring: 'rgba(15,23,42,0.9)',
  },
} as const;

export const shadows = {
  light: {
    default: `0 4px 12px ${shadowValues.light.blur.sm}, 0 0 0 1px ${shadowValues.light.ring}`,
    elevated: `0 8px 32px ${shadowValues.light.blur.md}, 0 0 0 1px ${shadowValues.light.ring}`,
  },
  dark: {
    default: `0 18px 45px ${shadowValues.dark.blur}, 0 0 0 1px ${shadowValues.dark.ring}`,
    elevated: `0 24px 60px ${shadowValues.dark.blur}, 0 0 0 1px ${shadowValues.dark.ring}`,
  },
} as const;

export const getThemedValue = <T,>(theme: Theme, lightValue: T, darkValue: T): T => {
  return theme.palette.mode === 'light' ? lightValue : darkValue;
};

const textColors = {
  light: {
    primary: colorPalette.light.slate[900],
    secondary: colorPalette.light.slate[700],
    muted: colorPalette.light.slate[600],
    disabled: 'rgba(15,23,42,0.9)',
    hover: 'rgba(241,245,249,0.8)',
  },
  dark: {
    primary: colorPalette.dark.slate[200],
    secondary: colorPalette.dark.slate[300],
    muted: colorPalette.dark.slate[400],
    disabled: 'rgba(226,232,240,0.9)',
    hover: 'rgba(30,41,59,0.8)',
  },
} as const;

const dialogPaper = {
  borderRadius: 4,
  border: (theme: Theme) => getThemedValue(theme, borders.light.default, borders.dark.default),
  background: (theme: Theme) => getThemedValue(theme, backgrounds.light.container, backgrounds.dark.dialog),
  boxShadow: (theme: Theme) => getThemedValue(theme, shadows.light.elevated, shadows.dark.elevated),
} as const;

const dialogTitle = {
  fontWeight: 700,
  letterSpacing: 0.4,
  fontSize: 20,
  color: (theme: Theme) => getThemedValue(theme, textColors.light.primary, textColors.dark.primary),
  pb: 1,
} as const;

const dialogCancelButton = {
  color: (theme: Theme) => getThemedValue(theme, textColors.light.muted, textColors.dark.muted),
  '&:hover': {
    backgroundColor: (theme: Theme) => getThemedValue(theme, textColors.light.hover, textColors.dark.hover),
  },
} as const;

export const dialogStyles = {
  paper: dialogPaper,
  title: dialogTitle,
  cancelButton: dialogCancelButton,
};

const paperContainer = {
  p: 3,
  mb: 3,
  borderRadius: 3,
  border: (theme: Theme) => getThemedValue(theme, borders.light.default, borders.dark.default),
  background: (theme: Theme) => getThemedValue(theme, backgrounds.light.container, backgrounds.dark.table),
  boxShadow: (theme: Theme) => getThemedValue(theme, shadows.light.default, shadows.dark.default),
} as const;

export const paperStyles = {
  container: paperContainer,
};

const tableContainer = {
  borderRadius: 3,
  border: (theme: Theme) => getThemedValue(theme, borders.light.default, borders.dark.subtle),
  background: (theme: Theme) => getThemedValue(theme, backgrounds.light.container, backgrounds.dark.container),
  boxShadow: (theme: Theme) => getThemedValue(theme, shadows.light.default, shadows.dark.default),
  overflow: 'hidden' as const,
} as const;

const tableEmptyState = {
  p: 4,
  textAlign: 'center' as const,
  borderRadius: 3,
  border: (theme: Theme) => getThemedValue(theme, borders.light.default, borders.dark.default),
  background: (theme: Theme) => getThemedValue(theme, backgrounds.light.card, backgrounds.dark.container),
  boxShadow: (theme: Theme) => getThemedValue(theme, shadows.light.default, shadows.dark.default),
  color: (theme: Theme) => getThemedValue(theme, textColors.light.disabled, textColors.dark.disabled),
} as const;

const tableHeaderRow = {
  background: (theme: Theme) => getThemedValue(theme, gradients.light.header.default, gradients.dark.header.default),
} as const;

const tableHeaderCell = {
  color: (theme: Theme) => getThemedValue(theme, colorPalette.light.slate[800], 'rgb(219,234,254)'),
  fontWeight: 600,
  fontSize: 13,
  textTransform: 'uppercase' as const,
  letterSpacing: 0.13,
  borderBottom: (theme: Theme) => getThemedValue(theme, borders.light.default, `1px solid ${borderColors.dark.default}`),
  paddingY: 1.5,
} as const;

const tableBodyCell = {
  borderBottom: (theme: Theme) => getThemedValue(theme, `1px solid ${borderColors.light.divider}`, `1px solid ${borderColors.dark.divider}`),
  color: (theme: Theme) => getThemedValue(theme, textColors.light.secondary, textColors.dark.primary),
  fontSize: 13,
} as const;

const rowBackgrounds = {
  odd: {
    light: 'rgba(255,255,255,0.95)',
    dark: 'rgba(15,23,42,0.9)',
  },
  even: {
    light: 'rgba(248,250,252,0.95)',
    dark: 'rgba(15,23,42,0.85)',
  },
  hover: {
    light: 'rgba(226,232,240,0.5)',
    dark: 'rgba(30,64,175,0.35)',
  },
} as const;

const tableRowOdd = {
  backgroundColor: (theme: Theme) => getThemedValue(theme, rowBackgrounds.odd.light, rowBackgrounds.odd.dark),
} as const;

const tableRowEven = {
  backgroundColor: (theme: Theme) => getThemedValue(theme, rowBackgrounds.even.light, rowBackgrounds.even.dark),
} as const;

const tableRowHover = {
  backgroundColor: (theme: Theme) => getThemedValue(theme, rowBackgrounds.hover.light, rowBackgrounds.hover.dark),
} as const;

const tablePaginationContainer = {
  borderTop: (theme: Theme) => getThemedValue(theme, borders.light.default, `1px solid ${borderColors.dark.accent}`),
  background: (theme: Theme) => getThemedValue(theme, gradients.light.header.footer, gradients.dark.header.footer),
} as const;

const paginationTextStyles = {
  selectLabel: { fontSize: 12 },
  displayedRows: { fontSize: 12 },
} as const;

const tablePagination = {
  color: (theme: Theme) => getThemedValue(theme, textColors.light.muted, textColors.dark.muted),
  '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': paginationTextStyles,
  '.MuiTablePagination-actions button': {
    color: (theme: Theme) => getThemedValue(theme, textColors.light.secondary, textColors.dark.primary),
  },
  '.MuiInputBase-root': {
    color: (theme: Theme) => getThemedValue(theme, textColors.light.secondary, textColors.dark.primary),
  },
  '.MuiSvgIcon-root': {
    color: (theme: Theme) => getThemedValue(theme, textColors.light.muted, textColors.dark.muted),
  },
} as const;

export const tableStyles = {
  container: tableContainer,
  emptyState: tableEmptyState,
  headerRow: tableHeaderRow,
  headerCell: tableHeaderCell,
  bodyCell: tableBodyCell,
  rowOdd: tableRowOdd,
  rowEven: tableRowEven,
  rowHover: tableRowHover,
  paginationContainer: tablePaginationContainer,
  pagination: tablePagination,
};

const emptyStateTitle = {
  fontWeight: 600,
  letterSpacing: 0.3,
  mb: 0.5,
} as const;

const emptyStateSubtitle = {
  color: (theme: Theme) => getThemedValue(theme, 'rgba(71,85,105,0.9)', 'rgba(148,163,184,0.9)'),
} as const;

export const typographyStyles = {
  emptyTitle: emptyStateTitle,
  emptySubtitle: emptyStateSubtitle,
};
