import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleTheme } from '../theme/theme.slice';

const ThemeToggle = () => {
    const dispatch = useAppDispatch();
    const mode = useAppSelector((state) => state.theme.mode);

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton onClick={handleToggle} color="inherit">
                {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
        </Tooltip>
    );
};

export default ThemeToggle;