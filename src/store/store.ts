import { configureStore } from '@reduxjs/toolkit';
import achievementsReducer from '../features/achievements/achievements.slice';
import themeReducer from '../theme/theme.slice';

export const store = configureStore({
    reducer: {
        achievements: achievementsReducer,
        theme: themeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;