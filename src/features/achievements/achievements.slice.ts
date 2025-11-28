import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Achievement } from '../../data/achievements';
import { fetchAchievements, createAchievement, updateAchievement, deleteAchievement } from
    './achievements.thunks';

interface AchievementsState {
    items: Achievement[];
    loading: boolean;
    error: string | null;
}

const initialState: AchievementsState = {
    items: [],
    loading: false,
    error: null,
};

const achievementsSlice = createSlice({
    name: 'achievements',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAchievements.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAchievements.fulfilled, (state, action: PayloadAction<Achievement[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchAchievements.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createAchievement.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAchievement.fulfilled, (state, action: PayloadAction<Achievement>) => {
                state.loading = false;
                state.items.unshift(action.payload);
            })
            .addCase(createAchievement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateAchievement.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAchievement.fulfilled, (state, action: PayloadAction<Achievement>) => {
                state.loading = false;
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateAchievement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteAchievement.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAchievement.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.items = state.items.filter((item) => item.id !== action.payload);
            })
            .addCase(deleteAchievement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError } = achievementsSlice.actions;
export default achievementsSlice.reducer;