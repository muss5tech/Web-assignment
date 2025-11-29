import { SxProps, Theme } from '@mui/material';

export const borders = {
  light: {
    default: '1px solid rgba(203,213,225,0.8)',
    subtle: '1px solid rgba(226,232,240,0.9)',
  },
  dark: {
    default: '1px solid rgba(148,163,184,0.4)',
    subtle: '1px solid rgba(148,163,184,0.35)',
  },
} as const;

export const backgrounds = {
  light: {
    container: 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,0.95))',
    card: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))',
  },
  dark: {
    container: 'linear-gradient(135deg, rgba(15,23,42,0.92), rgba(30,64,175,0.35))',
    dialog: 'radial-gradient(circle at top left, rgba(56,189,248,0.12), transparent 55%), rgba(15,23,42,0.98)',
    table: 'linear-gradient(135deg, rgba(15,23,42,0.96), rgba(30,64,175,0.45))',
  },
} as const;

export const shadows = {
  light: {
    default: '0 4px 12px rgba(148,163,184,0.15), 0 0 0 1px rgba(203,213,225,0.3)',
    elevated: '0 8px 32px rgba(148,163,184,0.2), 0 0 0 1px rgba(203,213,225,0.3)',
  },
  dark: {
    default: '0 18px 45px rgba(15,23,42,0.95), 0 0 0 1px rgba(15,23,42,0.9)',
    elevated: '0 24px 60px rgba(15,23,42,0.95), 0 0 0 1px rgba(15,23,42,0.9)',
  },
} as const;

export const dialogStyles = {
  paper: {
    borderRadius: 4,
    border: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? borders.light.default
        : borders.dark.default,
    background: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? backgrounds.light.container
        : backgrounds.dark.dialog,
    boxShadow: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? shadows.light.elevated
        : shadows.dark.elevated,
  },

  title: {
    fontWeight: 700,
    letterSpacing: 0.4,
    fontSize: 20,
    color: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? 'rgb(15,23,42)'
        : 'rgb(226,232,240)',
    pb: 1,
  },

  cancelButton: {
    color: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? 'rgb(71,85,105)'
        : 'rgb(148,163,184)',
    '&:hover': {
      backgroundColor: (theme: Theme) =>
        theme.palette.mode === 'light'
          ? 'rgba(241,245,249,0.8)'
          : 'rgba(30,41,59,0.8)',
    },
  },
};

export const paperStyles = {
  container: {
    p: 3,
    mb: 3,
    borderRadius: 3,
    border: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? borders.light.default
        : borders.dark.default,
    background: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? backgrounds.light.container
        : backgrounds.dark.table,
    boxShadow: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? shadows.light.default
        : shadows.dark.default,
  },
};

export const tableStyles = {
  container: {
    borderRadius: 3,
    border: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? borders.light.default
        : borders.dark.subtle,
    background: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? backgrounds.light.container
        : backgrounds.dark.container,
    boxShadow: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? shadows.light.default
        : shadows.dark.default,
    overflow: 'hidden',
  },

  emptyState: {
    p: 4,
    textAlign: 'center',
    borderRadius: 3,
    border: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? borders.light.default
        : borders.dark.default,
    background: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? backgrounds.light.card
        : backgrounds.dark.container,
    boxShadow: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? shadows.light.default
        : shadows.dark.default,
    color: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? 'rgba(15,23,42,0.9)'
        : 'rgba(226,232,240,0.9)',
  },

  headerRow: {
    background: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? 'linear-gradient(90deg, rgba(241,245,249,0.98), rgba(226,232,240,0.85))'
        : 'linear-gradient(90deg, rgba(15,23,42,0.95), rgba(30,64,175,0.55))',
  },

  headerCell: {
    color: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? 'rgb(30,41,59)'
        : 'rgb(219,234,254)',
    fontWeight: 600,
    fontSize: 13,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.13,
    borderBottom: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? borders.light.default
        : '1px solid rgba(148,163,184,0.4)',
    paddingY: 1.5,
  },

  bodyCell: {
    borderBottom: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? '1px solid rgba(203,213,225,0.5)'
        : '1px solid rgba(30,64,175,0.35)',
    color: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? 'rgb(51,65,85)'
        : 'rgb(226,232,240)',
    fontSize: 13,
  },

  rowOdd: {
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? 'rgba(255,255,255,0.95)'
        : 'rgba(15,23,42,0.9)',
  },

  rowEven: {
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? 'rgba(248,250,252,0.95)'
        : 'rgba(15,23,42,0.85)',
  },

  rowHover: {
    backgroundColor: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? 'rgba(226,232,240,0.5)'
        : 'rgba(30,64,175,0.35)',
  },

  paginationContainer: {
    borderTop: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? borders.light.default
        : '1px solid rgba(30,64,175,0.4)',
    background: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? 'linear-gradient(90deg, rgba(248,250,252,0.98), rgba(241,245,249,0.95))'
        : 'linear-gradient(90deg, rgba(15,23,42,0.96), rgba(15,23,42,0.9))',
  },

  pagination: {
    color: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? 'rgb(71,85,105)'
        : 'rgb(148,163,184)',
    '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
      fontSize: 12,
    },
    '.MuiTablePagination-actions button': {
      color: (theme: Theme) =>
        theme.palette.mode === 'light'
          ? 'rgb(51,65,85)'
          : 'rgb(226,232,240)',
    },
    '.MuiInputBase-root': {
      color: (theme: Theme) =>
        theme.palette.mode === 'light'
          ? 'rgb(51,65,85)'
          : 'rgb(226,232,240)',
    },
    '.MuiSvgIcon-root': {
      color: (theme: Theme) =>
        theme.palette.mode === 'light'
          ? 'rgb(71,85,105)'
          : 'rgb(148,163,184)',
    },
  },
};

export const typographyStyles = {
  emptyTitle: {
    fontWeight: 600,
    letterSpacing: 0.3,
    mb: 0.5,
  },

  emptySubtitle: {
    color: (theme: Theme) =>
      theme.palette.mode === 'light'
        ? 'rgba(71,85,105,0.9)'
        : 'rgba(148,163,184,0.9)',
  },
};

export const getThemedValue = <T,>(theme: Theme, lightValue: T, darkValue: T): T => {
  return theme.palette.mode === 'light' ? lightValue : darkValue;
};
