import { Dialog } from '@mui/material';

interface AchievementDialogProps {
    open: boolean;
    onClose: () => void;
}

const AchievementDialog = ({ open, onClose }: AchievementDialogProps) => {
    return <Dialog open={open} onClose={onClose}></Dialog>;
};

export default AchievementDialog;
