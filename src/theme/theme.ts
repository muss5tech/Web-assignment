import { createTheme, ThemeOptions } from '@mui/material/styles';

const colors = {
  accent: {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    tertiary: '#06b6d4',
  },
  status: {
    success: '#22c55e',
    warning: '#f59e0b', 
    error: '#ef4444',
    info: '#3b82f6',       
  },
  light: {
    bg: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
      card: '#ffffff',
      hover: '#f1f5f9', 
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      tertiary: '#64748b',
      muted: '#94a3b8',
    },
    border: {
      primary: '#cbd5e1',
      secondary: '#e2e8f0',
      hover: '#94a3b8',
    },
  },
  dark: {
    bg: {
      primary: '#0a0a0f',
      secondary: '#12121a',
      tertiary: '#1a1a24',
      card: '#1a1a24',
      hover: '#242432',
    },
    text: {
      primary: '#ffffff',
      secondary: '#e2e8f0',
      tertiary: '#cbd5e1',
      muted: '#94a3b8',
    },
    border: {
      primary: '#334155',
      secondary: '#1e293b',
      hover: '#475569',
    },
  },
};

const getDesignTokens = (mode: 'light' | 'dark'): ThemeOptions => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                primary: {
                    main: colors.accent.primary,
                    light: '#818cf8',
                    dark: '#4f46e5',
                },
                secondary: {
                    main: colors.accent.secondary,
                    light: '#a78bfa',
                    dark: '#7c3aed',
                },
                success: {
                    main: colors.status.success,
                },
                warning: {
                    main: colors.status.warning,
                },
                error: {
                    main: colors.status.error,
                },
                info: {
                    main: colors.status.info,
                },
                background: {
                    default: colors.light.bg.secondary,
                    paper: colors.light.bg.card,
                },
                text: {
                    primary: colors.light.text.primary,
                    secondary: colors.light.text.secondary,
                },
                divider: colors.light.border.secondary,
            }
            : {
                primary: {
                    main: colors.accent.primary,
                    light: '#818cf8',
                    dark: '#4f46e5',
                },
                secondary: {
                    main: colors.accent.secondary,
                    light: '#a78bfa',
                    dark: '#7c3aed',
                },
                success: {
                    main: colors.status.success,
                },
                warning: {
                    main: colors.status.warning,
                },
                error: {
                    main: colors.status.error,
                },
                info: {
                    main: colors.status.info,
                },
                background: {
                    default: colors.dark.bg.primary,
                    paper: colors.dark.bg.card,
                },
                text: {
                    primary: colors.dark.text.primary,
                    secondary: colors.dark.text.secondary,
                },
                divider: colors.dark.border.secondary,
            }),
    },
    typography: {
        fontFamily: '"Inter", "Space Grotesk", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontFamily: '"Space Grotesk", "Inter", sans-serif',
            fontWeight: 700,
        },
        h2: {
            fontFamily: '"Space Grotesk", "Inter", sans-serif',
            fontWeight: 700,
        },
        h3: {
            fontFamily: '"Space Grotesk", "Inter", sans-serif',
            fontWeight: 600,
        },
        h4: {
            fontFamily: '"Space Grotesk", "Inter", sans-serif',
            fontWeight: 600,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: '0.5rem',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});

export const createAppTheme = (mode: 'light' | 'dark') => createTheme(getDesignTokens(mode));