import { Warning } from '@mui/icons-material';
import { Box, Dialog, DialogContent, Typography } from '@mui/material';
import UIButton from '@/components/ui/UIButton';
import { DIALOG_TITLE_TYPOGRAPHY } from '../constants';
import {
  dialogContainer,
  dialogContentContainer,
  dialogFooterContainer,
  dialogHeaderContainer,
  dialogHeaderIconBox,
} from '../styles/dialogComponentStyles';

interface DeleteConfirmDialogProps {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

const DeleteConfirmDialog = ({
  open,
  title,
  onConfirm,
  onCancel,
  isDeleting = false,
}: DeleteConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <Box sx={dialogContainer}>
        <Box sx={dialogHeaderContainer}>
          <Box display="flex" alignItems="center" gap={2}>
            <Box
              sx={{
                ...dialogHeaderIconBox,
                background:
                  'linear-gradient(135deg, rgba(239,68,68,0.9), rgba(220,38,38,0.9))',
                boxShadow: '0 4px 12px rgba(239,68,68,0.3)',
              }}
            >
              <Warning className="w-5 h-5" style={{ color: 'white' }} />
            </Box>
            <Typography
              sx={{
                ...DIALOG_TITLE_TYPOGRAPHY,
                color: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'rgb(15,23,42)'
                    : 'rgb(226,232,240)',
              }}
            >
              Confirm Deletion
            </Typography>
          </Box>
        </Box>

        <DialogContent sx={dialogContentContainer}>
          <Typography
            variant="body1"
            sx={{
              color: (theme) =>
                theme.palette.mode === 'light'
                  ? 'rgb(51,65,85)'
                  : 'rgb(203,213,225)',
              lineHeight: 1.6,
            }}
          >
            Are you sure you want to delete the achievement{' '}
            <Typography
              component="span"
              sx={{
                fontWeight: 600,
                color: (theme) =>
                  theme.palette.mode === 'light'
                    ? 'rgb(15,23,42)'
                    : 'rgb(226,232,240)',
              }}
            >
              "{title}"
            </Typography>
            ? This action cannot be undone.
          </Typography>
        </DialogContent>

        <Box sx={dialogFooterContainer}>
          <UIButton
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </UIButton>
          <UIButton
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </UIButton>
        </Box>
      </Box>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
