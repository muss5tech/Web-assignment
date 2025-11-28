
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';

export const selectAchievementsState = (state: RootState) => state.achievements;

export const selectAllAchievements = createSelector([selectAchievementsState], (state) => state.items);

export const selectAchievementsLoading = createSelector([selectAchievementsState], (state) => state.loading);

export const selectAchievementsError = createSelector([selectAchievementsState], (state) => state.error);

export const selectAchievementById = (id: string) =>
    createSelector([selectAllAchievements], (achievements) => achievements.find((achievement) => achievement.id ===
        id));