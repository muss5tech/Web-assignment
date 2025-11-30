import { Typography, TypographyProps } from '@mui/material';
import { FIELD_LABEL_TYPOGRAPHY } from '../constants/achievement.constants';

interface FormFieldLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  variant?: TypographyProps['variant'];
}

const FormFieldLabel = ({ children, htmlFor, variant = "caption" }: FormFieldLabelProps) => {
  return (
    <Typography
      component="label"
      htmlFor={htmlFor}
      variant={variant}
      sx={{
        color: (theme) =>
          theme.palette.mode === 'light'
            ? 'rgb(30,41,59)'
            : 'rgb(219,234,254)',
        fontSize: FIELD_LABEL_TYPOGRAPHY.fontSize,
        fontWeight: FIELD_LABEL_TYPOGRAPHY.fontWeight,
        textTransform: FIELD_LABEL_TYPOGRAPHY.textTransform,
        letterSpacing: FIELD_LABEL_TYPOGRAPHY.letterSpacing,
        mb: FIELD_LABEL_TYPOGRAPHY.marginBottom,
        display: FIELD_LABEL_TYPOGRAPHY.display,
      }}
    >
      {children}
    </Typography>
  );
};

export default FormFieldLabel;
