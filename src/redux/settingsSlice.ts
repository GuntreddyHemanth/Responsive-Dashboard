import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  name: string;
  email: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  language: string;
  timezone: string;
}

interface SettingsState {
  user: User;
  isSaving: boolean;
  saveError: string | null;
  saveSuccess: boolean;
}

const initialState: SettingsState = {
  user: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    language: 'en',
    timezone: 'UTC',
  },
  isSaving: false,
  saveError: null,
  saveSuccess: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateUserProfile(state, action: PayloadAction<{ name: string; email: string }>) {
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
    },
    updateNotifications(
      state,
      action: PayloadAction<{ email?: boolean; push?: boolean; sms?: boolean }>
    ) {
      state.user.notifications = {
        ...state.user.notifications,
        ...action.payload,
      };
    },
    updateLanguage(state, action: PayloadAction<string>) {
      state.user.language = action.payload;
    },
    updateTimezone(state, action: PayloadAction<string>) {
      state.user.timezone = action.payload;
    },
    saveSettingsStart(state) {
      state.isSaving = true;
      state.saveError = null;
      state.saveSuccess = false;
    },
    saveSettingsSuccess(state) {
      state.isSaving = false;
      state.saveSuccess = true;
    },
    saveSettingsFailure(state, action: PayloadAction<string>) {
      state.isSaving = false;
      state.saveError = action.payload;
    },
    resetSaveStatus(state) {
      state.saveSuccess = false;
      state.saveError = null;
    },
  },
});

export const {
  updateUserProfile,
  updateNotifications,
  updateLanguage,
  updateTimezone,
  saveSettingsStart,
  saveSettingsSuccess,
  saveSettingsFailure,
  resetSaveStatus,
} = settingsSlice.actions;

export default settingsSlice.reducer;