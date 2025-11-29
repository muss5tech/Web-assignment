import { createAsyncThunk } from '@reduxjs/toolkit';
import { Achievement, achievements as mockAchievements } from '../../data/achievements';
import { API_DELAY_MS, API_DELETE_DELAY_MS } from './constants/achievement.constants';

const mockDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchAchievements = createAsyncThunk<Achievement[], void, { rejectValue: string }>(
    'achievements/fetchAchievements',
    async (_, { rejectWithValue }) => {
        try {
            await mockDelay(API_DELAY_MS);
            return [...mockAchievements];
        } catch (error) {
            return rejectWithValue('Failed to fetch achievements');
        }
    }
);

export const createAchievement = createAsyncThunk<Achievement, Omit<Achievement, 'id'>, { rejectValue: string }>(
    'achievements/createAchievement',
    async (achievementData, { rejectWithValue }) => {
        try {
            await mockDelay(API_DELETE_DELAY_MS);
            const newAchievement: Achievement = {
                ...achievementData,
                id: `achievement-${Date.now()}`,
            };
            return newAchievement;
        } catch (error) {
            return rejectWithValue('Failed to create achievement');
        }
    }
);

export const updateAchievement = createAsyncThunk<Achievement, Achievement, { rejectValue: string }>(
    'achievements/updateAchievement',
    async (achievement, { rejectWithValue }) => {
        try {
            await mockDelay(API_DELETE_DELAY_MS);
            return achievement;
        } catch (error) {
            return rejectWithValue('Failed to update achievement');
        }
    }
);

export const deleteAchievement = createAsyncThunk<string, string, { rejectValue: string }>(
    'achievements/deleteAchievement',
    async (id, { rejectWithValue }) => {
        try {
            await mockDelay(API_DELETE_DELAY_MS);
            return id;
        } catch (error) {
            return rejectWithValue('Failed to delete achievement');
        }
    }
);